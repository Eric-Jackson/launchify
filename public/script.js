// Theme handling
function setTheme(theme) {
  document.documentElement.setAttribute('data-theme', theme);
  localStorage.setItem('theme', theme);
}

// Initialize theme from localStorage or default to 'light'
const savedTheme = localStorage.getItem('theme') || 'light';
setTheme(savedTheme);

// Hero background animation
function createParticle() {
  const particle = document.createElement('div');
  particle.className = 'particle floating';
  particle.style.cssText = `
    position: absolute;
    width: 10px;
    height: 10px;
    background: var(--accent);
    border-radius: 50%;
    opacity: 0.3;
    pointer-events: none;
  `;
  
  // Random position
  particle.style.left = Math.random() * 100 + '%';
  particle.style.top = Math.random() * 100 + '%';
  
  return particle;
}

function initParticles() {
  const heroBackground = document.querySelector('.hero-background');
  if (!heroBackground) return;
  
  // Add particles
  for (let i = 0; i < 20; i++) {
    heroBackground.appendChild(createParticle());
  }
}

// Smooth scroll for navigation links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
  anchor.addEventListener('click', function (e) {
    e.preventDefault();
    const target = document.querySelector(this.getAttribute('href'));
    if (target) {
      target.scrollIntoView({
        behavior: 'smooth'
      });
    }
  });
});

// Feature card hover effects
document.querySelectorAll('.feature-card').forEach(card => {
  card.addEventListener('mouseenter', () => {
    card.style.transform = 'translateY(-5px)';
  });
  
  card.addEventListener('mouseleave', () => {
    card.style.transform = 'translateY(0)';
  });
});

// Initialize animations
document.addEventListener('DOMContentLoaded', () => {
  initParticles();
  
  // Fade in elements on scroll
  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.style.opacity = '1';
        entry.target.style.transform = 'translateY(0)';
      }
    });
  }, {
    threshold: 0.1
  });
  
  // Observe elements with fade-in class
  document.querySelectorAll('.fade-in').forEach(el => {
    el.style.opacity = '0';
    el.style.transform = 'translateY(20px)';
    el.style.transition = 'opacity 0.6s ease-out, transform 0.6s ease-out';
    observer.observe(el);
  });
});

// Handle mobile menu
const menuButton = document.querySelector('.menu-button');
const mobileMenu = document.querySelector('.mobile-menu');

if (menuButton && mobileMenu) {
  menuButton.addEventListener('click', () => {
    mobileMenu.classList.toggle('active');
  });
}

// Handle social icon hover effects
document.querySelectorAll('.social-icon').forEach(icon => {
  icon.addEventListener('mouseenter', () => {
    icon.style.color = 'var(--accent)';
  });
  
  icon.addEventListener('mouseleave', () => {
    icon.style.color = 'var(--secondary)';
  });
}); 