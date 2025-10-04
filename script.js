// Load components function
async function loadComponent(id, file) {
  try {
    const response = await fetch(file);
    if (!response.ok) throw new Error(`Could not load ${file}`);
    const content = await response.text();
    document.getElementById(id).innerHTML = content;

    // Initialize features based on component
    if (id === "accessibility-placeholder") {
      initAccessibilityFeatures();
    } else if (id === "header-placeholder") {
      initNavigation();
    } else if (id === "footer-placeholder") {
      initFooter();
    }
  } catch (error) {
    console.error(error);
  }
}

// Initialize when DOM is loaded
document.addEventListener("DOMContentLoaded", () => {
  loadComponent("header-placeholder", "header.html");
  loadComponent("footer-placeholder", "footer.html");
  loadComponent("accessibility-placeholder", "accessibility.html");
  
  // Initialize business card flip functionality
  initFlipCard();
});

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
  }
}

// Navigation functionality
function initNavigation() {
  const mobileMenuButton = document.querySelector('.mobile-menu-button');
  const navMenu = document.querySelector('nav ul');
  
  if (mobileMenuButton && navMenu) {
    mobileMenuButton.addEventListener('click', function() {
      navMenu.classList.toggle('show');
    });
  }

  // Set active navigation link based on current page
  const currentPage = window.location.pathname.split('/').pop() || 'home.html';
  const navLinks = document.querySelectorAll('nav a');
  
  navLinks.forEach(link => {
    const linkHref = link.getAttribute('href');
    if (linkHref === currentPage) {
      link.classList.add('active');
    }
  });
}

// Footer functionality
function initFooter() {
  // Footer-specific initializations can go here
}

// Accessibility-Funktionen
function initAccessibilityFeatures() {
  const body = document.body;
  const contrastBtn = document.getElementById("toggle-contrast");
  const increaseFontBtn = document.getElementById("increase-font");
  const decreaseFontBtn = document.getElementById("decrease-font");
  const resetBtn = document.getElementById("reset-accessibility");

  let fontSize = 100;

  contrastBtn?.addEventListener("click", () => {
    const isActive = body.classList.toggle("high-contrast");
    contrastBtn.setAttribute("aria-pressed", isActive);
  });

  increaseFontBtn?.addEventListener("click", () => {
    fontSize += 10;
    body.style.fontSize = fontSize + "%";
  });

  decreaseFontBtn?.addEventListener("click", () => {
    fontSize = Math.max(70, fontSize - 10);
    body.style.fontSize = fontSize + "%";
  });

  resetBtn?.addEventListener("click", () => {
    fontSize = 100;
    body.style.fontSize = "100%";
    body.classList.remove("high-contrast");
    contrastBtn?.setAttribute("aria-pressed", "false");
  });
}

// About page specific animations
function initAboutPageAnimations() {
  // Only run on about page
  if (!window.location.pathname.includes('about.html')) return;

  // Simple fade-in animation for elements
  const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
  };

  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.style.opacity = '1';
        entry.target.style.transform = 'translateY(0)';
      }
    });
  }, observerOptions);

  // Observe elements for animation
  const animatedElements = document.querySelectorAll('.principle-card, .approach-step');
  animatedElements.forEach(el => {
    el.style.opacity = '0';
    el.style.transform = 'translateY(20px)';
    el.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
    observer.observe(el);
  });
}

// Update the DOMContentLoaded event listener
document.addEventListener("DOMContentLoaded", () => {
  loadComponent("header-placeholder", "header.html");
  loadComponent("footer-placeholder", "footer.html");
  loadComponent("accessibility-placeholder", "accessibility.html");
  
  // Initialize page-specific functionality
  if (window.location.pathname.includes('home.html') || 
      window.location.pathname === '/' || 
      window.location.pathname.includes('index.html')) {
    initFlipCard();
  } else if (window.location.pathname.includes('about.html')) {
    initAboutPageAnimations();
  }
});

// UX page specific animations
function initUXPageAnimations() {
  // Only run on UX page
  if (!window.location.pathname.includes('user-experience.html')) return;

  // Intersection Observer for scroll animations
  const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
  };

  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.style.opacity = '1';
        entry.target.style.transform = 'translateY(0)';
      }
    });
  }, observerOptions);

  // Observe expertise items
  const expertiseItems = document.querySelectorAll('.expertise-item');
  expertiseItems.forEach((el, index) => {
    el.style.opacity = '0';
    el.style.transform = 'translateY(20px)';
    el.style.transition = `opacity 0.6s ease ${index * 0.1}s, transform 0.6s ease ${index * 0.1}s`;
    observer.observe(el);
  });

  // Observe case study cards
  const caseStudyCards = document.querySelectorAll('.case-study-card');
  caseStudyCards.forEach((el, index) => {
    el.style.opacity = '0';
    el.style.transform = 'translateY(20px)';
    el.style.transition = `opacity 0.6s ease ${index * 0.1}s, transform 0.6s ease ${index * 0.1}s`;
    observer.observe(el);
  });

  // Observe process steps
  const processSteps = document.querySelectorAll('.process-step');
  processSteps.forEach((el, index) => {
    el.style.opacity = '0';
    el.style.transform = 'translateX(-20px)';
    el.style.transition = `opacity 0.6s ease ${index * 0.1}s, transform 0.6s ease ${index * 0.1}s`;
    observer.observe(el);
  });
}

// Update the DOMContentLoaded event listener
document.addEventListener("DOMContentLoaded", () => {
  loadComponent("header-placeholder", "header.html");
  loadComponent("footer-placeholder", "footer.html");
  loadComponent("accessibility-placeholder", "accessibility.html");
  
  // Initialize page-specific functionality
  if (window.location.pathname.includes('home.html') || 
      window.location.pathname === '/' || 
      window.location.pathname.includes('index.html')) {
    initFlipCard();
  } else if (window.location.pathname.includes('about.html')) {
    initAboutPageAnimations();
  } else if (window.location.pathname.includes('user-experience.html')) {
    initUXPageAnimations();
  }
});

// Case Study page specific animations
function initCaseStudyAnimations() {
  // Only run on case study pages
  if (!window.location.pathname.includes('casestudy')) return;

  // Intersection Observer for scroll animations
  const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
  };

  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.style.opacity = '1';
        entry.target.style.transform = 'translateY(0)';
      }
    });
  }, observerOptions);

  // Observe various elements for animation
  const animatedElements = document.querySelectorAll(
    '.challenge-card, .solution-card, .feature-card, .process-step, .outcome-item, .learning-item'
  );
  
  animatedElements.forEach((el, index) => {
    el.style.opacity = '0';
    el.style.transform = 'translateY(20px)';
    el.style.transition = `opacity 0.6s ease ${index * 0.1}s, transform 0.6s ease ${index * 0.1}s`;
    observer.observe(el);
  });
}

// Update the DOMContentLoaded event listener
document.addEventListener("DOMContentLoaded", () => {
  loadComponent("header-placeholder", "header.html");
  loadComponent("footer-placeholder", "footer.html");
  loadComponent("accessibility-placeholder", "accessibility.html");
  
  // Initialize page-specific functionality
  if (window.location.pathname.includes('home.html') || 
      window.location.pathname === '/' || 
      window.location.pathname.includes('index.html')) {
    initFlipCard();
  } else if (window.location.pathname.includes('about.html')) {
    initAboutPageAnimations();
  } else if (window.location.pathname.includes('user-experience.html')) {
    initUXPageAnimations();
  } else if (window.location.pathname.includes('casestudy')) {
    initCaseStudyAnimations();
  }
});

// Communications page specific animations
function initCommunicationsAnimations() {
  // Only run on communications page
  if (!window.location.pathname.includes('communication.html')) return;

  // Intersection Observer for scroll animations
  const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
  };

  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.style.opacity = '1';
        entry.target.style.transform = 'translateY(0)';
      }
    });
  }, observerOptions);

  // Observe expertise items
  const expertiseItems = document.querySelectorAll('.comms-expertise-item');
  expertiseItems.forEach((el, index) => {
    el.style.opacity = '0';
    el.style.transform = 'translateY(20px)';
    el.style.transition = `opacity 0.6s ease ${index * 0.1}s, transform 0.6s ease ${index * 0.1}s`;
    observer.observe(el);
  });

  // Observe example cards
  const exampleCards = document.querySelectorAll('.comms-example-card');
  exampleCards.forEach((el, index) => {
    el.style.opacity = '0';
    el.style.transform = 'translateY(20px)';
    el.style.transition = `opacity 0.6s ease ${index * 0.1}s, transform 0.6s ease ${index * 0.1}s`;
    observer.observe(el);
  });

  // Observe skill items
  const skillItems = document.querySelectorAll('.comms-skill-item');
  skillItems.forEach((el, index) => {
    el.style.opacity = '0';
    el.style.transform = 'translateX(-20px)';
    el.style.transition = `opacity 0.6s ease ${index * 0.1}s, transform 0.6s ease ${index * 0.1}s`;
    observer.observe(el);
  });
}

// Update the DOMContentLoaded event listener
document.addEventListener("DOMContentLoaded", () => {
  loadComponent("header-placeholder", "header.html");
  loadComponent("footer-placeholder", "footer.html");
  loadComponent("accessibility-placeholder", "accessibility.html");
  
  // Initialize page-specific functionality
  if (window.location.pathname.includes('home.html') || 
      window.location.pathname === '/' || 
      window.location.pathname.includes('index.html')) {
    initFlipCard();
  } else if (window.location.pathname.includes('about.html')) {
    initAboutPageAnimations();
  } else if (window.location.pathname.includes('user-experience.html')) {
    initUXPageAnimations();
  } else if (window.location.pathname.includes('casestudy')) {
    initCaseStudyAnimations();
  } else if (window.location.pathname.includes('communication.html')) {
    initCommunicationsAnimations();
  }
});

// Contact page specific functionality
function initContactPage() {
  // Only run on contact page
  if (!window.location.pathname.includes('contact.html')) return;

  // Simple animations for contact page
  const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
  };

  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.style.opacity = '1';
        entry.target.style.transform = 'translateY(0)';
      }
    });
  }, observerOptions);

  // Observe form and info sections
  const contactSections = document.querySelectorAll('.contact-form-container, .contact-info');
  contactSections.forEach((el, index) => {
    el.style.opacity = '0';
    el.style.transform = 'translateY(20px)';
    el.style.transition = `opacity 0.6s ease ${index * 0.2}s, transform 0.6s ease ${index * 0.2}s`;
    observer.observe(el);
  });
}

// Update the DOMContentLoaded event listener
document.addEventListener("DOMContentLoaded", () => {
  loadComponent("header-placeholder", "header.html");
  loadComponent("footer-placeholder", "footer.html");
  loadComponent("accessibility-placeholder", "accessibility.html");
  
  // Initialize page-specific functionality
  if (window.location.pathname.includes('home.html') || 
      window.location.pathname === '/' || 
      window.location.pathname.includes('index.html')) {
    initFlipCard();
  } else if (window.location.pathname.includes('about.html')) {
    initAboutPageAnimations();
  } else if (window.location.pathname.includes('user-experience.html')) {
    initUXPageAnimations();
  } else if (window.location.pathname.includes('casestudy')) {
    initCaseStudyAnimations();
  } else if (window.location.pathname.includes('communication.html')) {
    initCommunicationsAnimations();
  } else if (window.location.pathname.includes('contact.html')) {
    initContactPage();
  }
});

// Privacy page specific functionality
function initPrivacyPage() {
  // Only run on privacy page
  if (!window.location.pathname.includes('privacy.html')) return;

  // Simple fade-in animation for privacy content
  const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
  };

  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.style.opacity = '1';
        entry.target.style.transform = 'translateY(0)';
      }
    });
  }, observerOptions);

  // Observe privacy sections
  const privacySections = document.querySelectorAll('.privacy-section-item');
  privacySections.forEach((el, index) => {
    el.style.opacity = '0';
    el.style.transform = 'translateY(20px)';
    el.style.transition = `opacity 0.6s ease ${index * 0.1}s, transform 0.6s ease ${index * 0.1}s`;
    observer.observe(el);
  });
}

// Update the DOMContentLoaded event listener
document.addEventListener("DOMContentLoaded", () => {
  loadComponent("header-placeholder", "header.html");
  loadComponent("footer-placeholder", "footer.html");
  loadComponent("accessibility-placeholder", "accessibility.html");
  
  // Initialize page-specific functionality
  if (window.location.pathname.includes('home.html') || 
      window.location.pathname === '/' || 
      window.location.pathname.includes('index.html')) {
    initFlipCard();
  } else if (window.location.pathname.includes('about.html')) {
    initAboutPageAnimations();
  } else if (window.location.pathname.includes('user-experience.html')) {
    initUXPageAnimations();
  } else if (window.location.pathname.includes('casestudy')) {
    initCaseStudyAnimations();
  } else if (window.location.pathname.includes('communication.html')) {
    initCommunicationsAnimations();
  } else if (window.location.pathname.includes('contact.html')) {
    initContactPage();
  } else if (window.location.pathname.includes('privacy.html')) {
    initPrivacyPage();
  }
});

// Imprint page specific functionality
function initImprintPage() {
  // Only run on imprint page
  if (!window.location.pathname.includes('imprint.html')) return;

  // Simple fade-in animation for imprint content
  const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
  };

  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.style.opacity = '1';
        entry.target.style.transform = 'translateY(0)';
      }
    });
  }, observerOptions);

  // Observe imprint sections
  const imprintSections = document.querySelectorAll('.imprint-section-item');
  imprintSections.forEach((el, index) => {
    el.style.opacity = '0';
    el.style.transform = 'translateY(20px)';
    el.style.transition = `opacity 0.6s ease ${index * 0.1}s, transform 0.6s ease ${index * 0.1}s`;
    observer.observe(el);
  });
}

// Update the DOMContentLoaded event listener
document.addEventListener("DOMContentLoaded", () => {
  loadComponent("header-placeholder", "header.html");
  loadComponent("footer-placeholder", "footer.html");
  loadComponent("accessibility-placeholder", "accessibility.html");
  
  // Initialize page-specific functionality
  if (window.location.pathname.includes('home.html') || 
      window.location.pathname === '/' || 
      window.location.pathname.includes('index.html')) {
    initFlipCard();
  } else if (window.location.pathname.includes('about.html')) {
    initAboutPageAnimations();
  } else if (window.location.pathname.includes('user-experience.html')) {
    initUXPageAnimations();
  } else if (window.location.pathname.includes('casestudy')) {
    initCaseStudyAnimations();
  } else if (window.location.pathname.includes('communication.html')) {
    initCommunicationsAnimations();
  } else if (window.location.pathname.includes('contact.html')) {
    initContactPage();
  } else if (window.location.pathname.includes('privacy.html')) {
    initPrivacyPage();
  } else if (window.location.pathname.includes('imprint.html')) {
    initImprintPage();
  }
});