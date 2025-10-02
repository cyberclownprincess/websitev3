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