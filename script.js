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

// Footer functionality
function initFooter() {
  // Footer-specific initializations can go here
  console.log('Footer initialized');
}

// Accessibility functions
function initAccessibilityFeatures() {
  const body = document.body;
  const contrastBtn = document.getElementById("toggle-contrast");
  const increaseFontBtn = document.getElementById("increase-font");
  const decreaseFontBtn = document.getElementById("decrease-font");
  const resetBtn = document.getElementById("reset-accessibility");

  let fontSize = 100;

  // Load saved preferences
  const savedFontSize = localStorage.getItem('fontSize');
  const highContrast = localStorage.getItem('highContrast') === 'true';
  
  if (savedFontSize) {
    fontSize = parseInt(savedFontSize);
    body.style.fontSize = fontSize + '%';
  }
  
  if (highContrast) {
    body.classList.add('high-contrast');
    contrastBtn?.setAttribute('aria-pressed', 'true');
  }

  contrastBtn?.addEventListener("click", () => {
    const isActive = body.classList.toggle("high-contrast");
    contrastBtn.setAttribute("aria-pressed", isActive);
    localStorage.setItem('highContrast', isActive);
  });

  increaseFontBtn?.addEventListener("click", () => {
    fontSize = Math.min(150, fontSize + 10);
    body.style.fontSize = fontSize + "%";
    localStorage.setItem('fontSize', fontSize);
  });

  decreaseFontBtn?.addEventListener("click", () => {
    fontSize = Math.max(70, fontSize - 10);
    body.style.fontSize = fontSize + "%";
    localStorage.setItem('fontSize', fontSize);
  });

  resetBtn?.addEventListener("click", () => {
    fontSize = 100;
    body.style.fontSize = "100%";
    body.classList.remove("high-contrast");
    contrastBtn?.setAttribute("aria-pressed", "false");
    localStorage.removeItem('fontSize');
    localStorage.removeItem('highContrast');
  });
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
  initializeComponents();
});

// Export for potential module usage
if (typeof module !== 'undefined' && module.exports) {
  module.exports = {
    loadComponent,
    initializeComponents,
    initFlipCard,
    initNavigation,
    initAccessibilityFeatures,
    initScrollAnimations
  };
}