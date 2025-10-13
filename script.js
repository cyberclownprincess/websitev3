// Load components function
async function loadComponent(id, file) {
  try {
    const response = await fetch(file);
    if (!response.ok) throw new Error(`Could not load ${file}: ${response.status}`);
    const content = await response.text();
    document.getElementById(id).innerHTML = content;

    // Initialize features based on component
    const initFunctions = {
      'accessibility-placeholder': initAccessibilityFeatures,
      'header-placeholder': initNavigation,
      'footer-placeholder': initFooter
    };

    if (initFunctions[id]) {
      initFunctions[id]();
    }
  } catch (error) {
    console.error(`Error loading component ${id}:`, error);
  }
}

// Initialize all components
async function initializeComponents() {
  try {
    await Promise.all([
      loadComponent("header-placeholder", "header.html"),
      loadComponent("footer-placeholder", "footer.html"),
      loadComponent("accessibility-placeholder", "accessibility.html")
    ]);
    
    // Initialize page-specific functionality after components are loaded
    initializePageSpecificFunctions();
  } catch (error) {
    console.error('Error initializing components:', error);
  }
}

// Page-specific functionality mapper
function initializePageSpecificFunctions() {
  const pageHandlers = {
    'home': initFlipCard,
    'about': initAboutPageAnimations,
    'user-experience': initUXPageAnimations,
    'casestudy': initCaseStudyAnimations,
    'communication': initCommunicationsAnimations,
    'contact': initContactPage,
    'privacy': initPrivacyPage,
    'imprint': initImprintPage
  };

  const currentPath = window.location.pathname.toLowerCase();
  
  for (const [page, handler] of Object.entries(pageHandlers)) {
    if (currentPath.includes(page)) {
      handler();
      break; // Only run one handler per page
    }
  }
  
  // Initialize CV download on every page
  initCVDownload();

  if (currentPath.includes('casestudy')) {
        initProjectGallery();
        initVideoContainer();
  }
}

// Flip Card Functionality
function initFlipCard() {
  const flipCard = document.getElementById('flipCard');
  
  if (flipCard) {
    flipCard.addEventListener('click', function() {
      this.classList.toggle('flipped');
    });

    // Keyboard accessibility
    flipCard.addEventListener('keydown', function(e) {
      if (e.key === 'Enter' || e.key === ' ') {
        e.preventDefault();
        this.classList.toggle('flipped');
      }
    });
    
    // Ensure focusable for keyboard navigation
    flipCard.setAttribute('tabindex', '0');
  }
}

// Navigation functionality
function initNavigation() {
  const mobileMenuButton = document.querySelector('.mobile-menu-button');
  const navMenu = document.querySelector('nav ul');
  
  if (mobileMenuButton && navMenu) {
    mobileMenuButton.addEventListener('click', function() {
      const isExpanded = navMenu.classList.toggle('show');
      this.setAttribute('aria-expanded', isExpanded);
    });

    // Close menu when clicking outside
    document.addEventListener('click', (e) => {
      if (!mobileMenuButton.contains(e.target) && !navMenu.contains(e.target)) {
        navMenu.classList.remove('show');
        mobileMenuButton.setAttribute('aria-expanded', 'false');
      }
    });
  }

  // Set active navigation link based on current page
  const currentPage = window.location.pathname.split('/').pop() || 'index.html';
  const navLinks = document.querySelectorAll('nav a');
  
  navLinks.forEach(link => {
    const linkHref = link.getAttribute('href');
    if (linkHref === currentPage || 
        (currentPage === '' && linkHref === 'index.html') ||
        (currentPage.includes(linkHref.replace('.html', '')))) {
      link.classList.add('active');
      link.setAttribute('aria-current', 'page');
    }
  });
} 

// Accessibility Toolbar Functionality 
function initAccessibilityFeatures() {
    console.log('🔧 Initializing Accessibility Features...');
    
    const toolbar = document.getElementById('accessibility-toolbar');
    if (!toolbar) {
        console.error('❌ Accessibility toolbar not found!');
        return;
    }
    
    const toggleBtn = toolbar.querySelector('.accessibility-toggle');
    const panel = toolbar.querySelector('.accessibility-panel');
    const closeBtn = toolbar.querySelector('.close-panel');
    
    if (!toggleBtn || !panel) {
        console.error('❌ Accessibility toggle or panel not found!');
        return;
    }
    
    console.log('✅ Accessibility elements found');
    
    // State
    let fontSize = 100;
    let contrastMode = 'normal';
    let dyslexiaFont = false;

    // Load saved preferences
    function loadPreferences() {
        const savedFontSize = localStorage.getItem('accessibilityFontSize');
        const savedContrast = localStorage.getItem('accessibilityContrast');
        const savedDyslexia = localStorage.getItem('accessibilityDyslexia');
        
        if (savedFontSize) {
            fontSize = parseInt(savedFontSize);
            updateFontSize();
        }
        
        if (savedContrast) {
            contrastMode = savedContrast;
            updateContrastMode();
        }
        
        if (savedDyslexia === 'true') {
            dyslexiaFont = true;
            updateDyslexiaFont();
        }
    }

    // Toggle panel visibility
    function togglePanel() {
        console.log('🎯 Toggling panel...');
        const isExpanded = panel.classList.toggle('show');
        toggleBtn.setAttribute('aria-expanded', isExpanded);
        
        if (isExpanded) {
            // Close panel when clicking outside
            document.addEventListener('click', handleClickOutside);
        } else {
            document.removeEventListener('click', handleClickOutside);
        }
    }

    function handleClickOutside(event) {
        if (!toolbar.contains(event.target)) {
            panel.classList.remove('show');
            toggleBtn.setAttribute('aria-expanded', 'false');
            document.removeEventListener('click', handleClickOutside);
        }
    }

    // Font size functionality
    function increaseFontSize() {
        if (fontSize < 150) {
            fontSize += 10;
            updateFontSize();
        }
    }

    function decreaseFontSize() {
        if (fontSize > 80) {
            fontSize -= 10;
            updateFontSize();
        }
    }

    function updateFontSize() {
        document.documentElement.style.fontSize = `${fontSize}%`;
        const display = document.getElementById('current-font-size');
        if (display) display.textContent = fontSize;
        
        // Update button states
        const increaseBtn = toolbar.querySelector('.increase-font');
        const decreaseBtn = toolbar.querySelector('.decrease-font');
        
        if (increaseBtn) increaseBtn.disabled = fontSize >= 150;
        if (decreaseBtn) decreaseBtn.disabled = fontSize <= 80;
        
        localStorage.setItem('accessibilityFontSize', fontSize);
        console.log('📝 Font size updated to:', fontSize + '%');
    }

    // Contrast mode functionality
    function setContrastMode(mode) {
        contrastMode = mode;
        updateContrastMode();
    }

    function updateContrastMode() {
        // Remove all contrast classes
        document.body.classList.remove('high-contrast', 'dark-mode');
        
        // Add current mode class
        if (contrastMode === 'high') {
            document.body.classList.add('high-contrast');
        } else if (contrastMode === 'dark') {
            document.body.classList.add('dark-mode');
        }
        
        // Update button states
        const contrastBtns = toolbar.querySelectorAll('.contrast-btn');
        contrastBtns.forEach(btn => {
            const isActive = btn.getAttribute('data-mode') === contrastMode;
            btn.setAttribute('aria-pressed', isActive);
        });
        
        localStorage.setItem('accessibilityContrast', contrastMode);
        console.log('🎨 Contrast mode updated to:', contrastMode);
    }

    // Dyslexia font functionality
    function toggleDyslexiaFont() {
        dyslexiaFont = !dyslexiaFont;
        updateDyslexiaFont();
    }

    function updateDyslexiaFont() {
        const toggle = document.getElementById('dyslexia-toggle');
        if (toggle) toggle.checked = dyslexiaFont;
        
        if (dyslexiaFont) {
            document.body.classList.add('dyslexia-font');
        } else {
            document.body.classList.remove('dyslexia-font');
        }
        
        localStorage.setItem('accessibilityDyslexia', dyslexiaFont);
        console.log('🔤 Dyslexia font:', dyslexiaFont ? 'enabled' : 'disabled');
    }

    // Reset functionality
    function resetSettings() {
        fontSize = 100;
        contrastMode = 'normal';
        dyslexiaFont = false;
        
        updateFontSize();
        updateContrastMode();
        updateDyslexiaFont();
        
        // Clear localStorage
        localStorage.removeItem('accessibilityFontSize');
        localStorage.removeItem('accessibilityContrast');
        localStorage.removeItem('accessibilityDyslexia');
        
        console.log('🔄 All settings reset');
    }

    // Event listeners
    toggleBtn.addEventListener('click', togglePanel);
    closeBtn.addEventListener('click', () => {
        panel.classList.remove('show');
        toggleBtn.setAttribute('aria-expanded', 'false');
        document.removeEventListener('click', handleClickOutside);
    });

    // Font controls
    const increaseFontBtn = toolbar.querySelector('.increase-font');
    const decreaseFontBtn = toolbar.querySelector('.decrease-font');
    
    if (increaseFontBtn) increaseFontBtn.addEventListener('click', increaseFontSize);
    if (decreaseFontBtn) decreaseFontBtn.addEventListener('click', decreaseFontSize);

    // Contrast controls
    const contrastBtns = toolbar.querySelectorAll('.contrast-btn');
    contrastBtns.forEach(btn => {
        btn.addEventListener('click', () => {
            setContrastMode(btn.getAttribute('data-mode'));
        });
    });

    // Dyslexia toggle
    const dyslexiaToggle = document.getElementById('dyslexia-toggle');
    if (dyslexiaToggle) {
        dyslexiaToggle.addEventListener('change', toggleDyslexiaFont);
    }

    // Reset button
    const resetBtn = document.getElementById('reset-accessibility');
    if (resetBtn) {
        resetBtn.addEventListener('click', resetSettings);
    }

    // Keyboard navigation
    toolbar.addEventListener('keydown', (e) => {
        if (e.key === 'Escape' && panel.classList.contains('show')) {
            panel.classList.remove('show');
            toggleBtn.setAttribute('aria-expanded', 'false');
            toggleBtn.focus();
        }
    });

    // Initialize
    loadPreferences();
    console.log('✅ Accessibility Features initialized successfully');
}


// Project Gallery functionality
function initProjectGallery() {
    const galleryContainer = document.getElementById('gallery-container');
    const prevButton = document.getElementById('gallery-prev');
    const nextButton = document.getElementById('gallery-next');
    
    if (!galleryContainer || !prevButton || !nextButton) return;
    
    const scrollAmount = 400;
    
    prevButton.addEventListener('click', () => {
        galleryContainer.scrollBy({
            left: -scrollAmount,
            behavior: 'smooth'
        });
    });
    
    nextButton.addEventListener('click', () => {
        galleryContainer.scrollBy({
            left: scrollAmount,
            behavior: 'smooth'
        });
    });
    
    // Keyboard navigation
    galleryContainer.addEventListener('keydown', (e) => {
        if (e.key === 'ArrowLeft') {
            e.preventDefault();
            galleryContainer.scrollBy({ left: -scrollAmount, behavior: 'smooth' });
        } else if (e.key === 'ArrowRight') {
            e.preventDefault();
            galleryContainer.scrollBy({ left: scrollAmount, behavior: 'smooth' });
        }
    });
}

// Video Container functionality
function initVideoContainer() {
    const videoPlaceholder = document.getElementById('video-placeholder');
    const videoEmbed = document.getElementById('video-embed');
    const playButton = document.getElementById('play-button');
    
    if (!videoPlaceholder || !videoEmbed || !playButton) return;
    
    playButton.addEventListener('click', function(e) {
        e.stopPropagation();
        videoPlaceholder.style.display = 'none';
        videoEmbed.style.display = 'block';
    });
    
    videoPlaceholder.addEventListener('click', function() {
        videoPlaceholder.style.display = 'none';
        videoEmbed.style.display = 'block';
    });
    
    // Keyboard support
    videoPlaceholder.addEventListener('keydown', (e) => {
        if (e.key === 'Enter' || e.key === ' ') {
            e.preventDefault();
            videoPlaceholder.style.display = 'none';
            videoEmbed.style.display = 'block';
        }
    });
}

// CV Download functionality
function initCVDownload() {
    const cvDownloadLinks = document.querySelectorAll('.cv-download-link');
    const cvDownloadUrl = "https://example.com/rika-federov-cv.pdf"; // Replace with your actual CV URL
    
    cvDownloadLinks.forEach(link => {
        // Set the href attribute if not already set
        if (!link.getAttribute('href')) {
            link.setAttribute('href', cvDownloadUrl);
            link.setAttribute('target', '_blank');
            link.setAttribute('rel', 'noopener noreferrer');
            link.setAttribute('download', 'Rika-Federov-CV.pdf');
        }
        
        // Add tracking or analytics if needed
        link.addEventListener('click', function(e) {
            console.log('CV download initiated');
        });
    });
}

// Footer functionality 
function initFooter() {
    initCVDownload();
    console.log('Footer with CV download initialized');
}

// Generic animation function
function initScrollAnimations(selectors, options = {}) {
  const {
    threshold = 0.1,
    rootMargin = '0px 0px -50px 0px',
    translateX = 0,
    translateY = 20
  } = options;

  const observerOptions = { threshold, rootMargin };
  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.style.opacity = '1';
        entry.target.style.transform = 'translate(0, 0)';
        observer.unobserve(entry.target);
      }
    });
  }, observerOptions);

  const elements = document.querySelectorAll(selectors);
  elements.forEach((el, index) => {
    el.style.opacity = '0';
    el.style.transform = `translate(${translateX}px, ${translateY}px)`;
    el.style.transition = `opacity 0.6s ease ${index * 0.1}s, transform 0.6s ease ${index * 0.1}s`;
    observer.observe(el);
  });
}

// Page-specific animation functions
function initAboutPageAnimations() {
  initScrollAnimations('.principle-card, .approach-step');
}

function initUXPageAnimations() {
  initScrollAnimations('.expertise-item, .case-study-card');
  initScrollAnimations('.process-step', { translateX: -20, translateY: 0 });
}

function initCaseStudyAnimations() {
  initScrollAnimations('.challenge-card, .solution-card, .feature-card, .process-step, .outcome-item, .learning-item');
}

function initCommunicationsAnimations() {
  initScrollAnimations('.comms-expertise-item, .comms-example-card');
  initScrollAnimations('.comms-skill-item', { translateX: -20, translateY: 0 });
}

function initContactPage() {
  initScrollAnimations('.contact-form-container, .contact-info');
}

function initPrivacyPage() {
  initScrollAnimations('.privacy-section-item');
}

function initImprintPage() {
  initScrollAnimations('.imprint-section-item');
}

// Single DOMContentLoaded event listener
document.addEventListener("DOMContentLoaded", () => {
  console.log('🚀 DOM loaded, initializing components...');
  initializeComponents();
});