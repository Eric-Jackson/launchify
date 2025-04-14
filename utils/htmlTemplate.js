const htmlTemplateThemeVariants = require('./theme');

function escapeHtml(unsafe) {
  if (!unsafe) return '';
  return unsafe
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#039;");
}

function generateHTML({ title = '', tagline = '', description = '', features = [], ctaText = '', ctaLink = '#', theme = 'light', logo = '', social = {} }) {
  const styles = htmlTemplateThemeVariants[theme] || htmlTemplateThemeVariants.light;
  
  return `<!DOCTYPE html>
<html lang="en" data-theme="${theme}">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>${escapeHtml(title)}</title>
    <link rel="stylesheet" href="/styles.css">
</head>
<body>
    <div class="wrapper">
        <header>
            ${logo ? `<img src="${escapeHtml(logo)}" alt="Logo" class="logo">` : ''}
            <div class="social-links">
                ${social?.twitter ? `<a href="${escapeHtml(social.twitter)}" target="_blank" rel="noopener noreferrer" class="social-icon">
                    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                        <path d="M22 4s-.7 2.1-2 3.4c1.6 10-9.4 17.3-18 11.6 2.2.1 4.4-.6 6-2C3 15.5.5 9.6 3 5c2.2 2.6 5.6 4.1 9 4-.9-4.2 4-6.6 7-3.8 1.1 0 3-1.2 3-1.2z"></path>
                    </svg>
                </a>` : ''}
                ${social?.github ? `<a href="${escapeHtml(social.github)}" target="_blank" rel="noopener noreferrer" class="social-icon">
                    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                        <path d="M9 19c-5 1.5-5-2.5-7-3m14 6v-3.87a3.37 3.37 0 0 0-.94-2.61c3.14-.35 6.44-1.54 6.44-7A5.44 5.44 0 0 0 20 4.77 5.07 5.07 0 0 0 19.91 1S18.73.65 16 2.48a13.38 13.38 0 0 0-7 0C6.27.65 5.09 1 5.09 1A5.07 5.07 0 0 0 5 4.77a5.44 5.44 0 0 0-1.5 3.78c0 5.42 3.3 6.61 6.44 7A3.37 3.37 0 0 0 9 18.13V22"></path>
                    </svg>
                </a>` : ''}
                ${social?.linkedin ? `<a href="${escapeHtml(social.linkedin)}" target="_blank" rel="noopener noreferrer" class="social-icon">
                    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                        <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z"></path>
                        <rect x="2" y="9" width="4" height="12"></rect>
                        <circle cx="4" cy="4" r="2"></circle>
                    </svg>
                </a>` : ''}
            </div>
        </header>

        <section class="hero">
            <div class="hero-background"></div>
            <h1 class="hero-title fade-in">${escapeHtml(title)}</h1>
            <p class="hero-tagline fade-in">${escapeHtml(tagline)}</p>
            <p class="hero-description fade-in">${escapeHtml(description)}</p>
            <a href="${escapeHtml(ctaLink)}" class="cta-button fade-in">${escapeHtml(ctaText)}</a>
        </section>

        <section class="features">
            <div class="features-grid">
                ${features.map((feature, index) => `
                    <div class="feature-card fade-in" style="animation-delay: ${index * 0.1}s">
                        <div class="feature-icon">
                            ${feature.icon || ''}
                        </div>
                        <h3 class="feature-title">${escapeHtml(feature.title || '')}</h3>
                        <p class="feature-description">${escapeHtml(feature.description || '')}</p>
                    </div>
                `).join('')}
            </div>
        </section>

        <footer>
            <div class="social-links">
                ${social?.twitter ? `<a href="${escapeHtml(social.twitter)}" target="_blank" rel="noopener noreferrer" class="social-icon">
                    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                        <path d="M22 4s-.7 2.1-2 3.4c1.6 10-9.4 17.3-18 11.6 2.2.1 4.4-.6 6-2C3 15.5.5 9.6 3 5c2.2 2.6 5.6 4.1 9 4-.9-4.2 4-6.6 7-3.8 1.1 0 3-1.2 3-1.2z"></path>
                    </svg>
                </a>` : ''}
                ${social?.github ? `<a href="${escapeHtml(social.github)}" target="_blank" rel="noopener noreferrer" class="social-icon">
                    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                        <path d="M9 19c-5 1.5-5-2.5-7-3m14 6v-3.87a3.37 3.37 0 0 0-.94-2.61c3.14-.35 6.44-1.54 6.44-7A5.44 5.44 0 0 0 20 4.77 5.07 5.07 0 0 0 19.91 1S18.73.65 16 2.48a13.38 13.38 0 0 0-7 0C6.27.65 5.09 1 5.09 1A5.07 5.07 0 0 0 5 4.77a5.44 5.44 0 0 0-1.5 3.78c0 5.42 3.3 6.61 6.44 7A3.37 3.37 0 0 0 9 18.13V22"></path>
                    </svg>
                </a>` : ''}
                ${social?.linkedin ? `<a href="${escapeHtml(social.linkedin)}" target="_blank" rel="noopener noreferrer" class="social-icon">
                    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                        <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z"></path>
                        <rect x="2" y="9" width="4" height="12"></rect>
                        <circle cx="4" cy="4" r="2"></circle>
                    </svg>
                </a>` : ''}
            </div>
            <p>&copy; ${new Date().getFullYear()} ${escapeHtml(title)}. All rights reserved.</p>
        </footer>
    </div>

    <script>
        // Particle animation
        function createParticle() {
            const particle = document.createElement('div');
            particle.className = 'particle';
            
            const size = Math.random() * 10 + 5;
            particle.style.width = size + 'px';
            particle.style.height = size + 'px';
            
            const startX = Math.random() * window.innerWidth;
            const startY = Math.random() * window.innerHeight;
            particle.style.left = startX + 'px';
            particle.style.top = startY + 'px';
            
            const hue = Math.random() * 360;
            particle.style.backgroundColor = \`hsl(\${hue}, 70%, 50%)\`;
            
            document.body.appendChild(particle);
            
            const animation = particle.animate([
                {
                    transform: 'translate(0, 0) rotate(0deg)',
                    opacity: 0.3
                },
                {
                    transform: \`translate(\${Math.random() * 200 - 100}px, \${Math.random() * 200 - 100}px) rotate(\${Math.random() * 360}deg)\`,
                    opacity: 0
                }
            ], {
                duration: Math.random() * 3000 + 2000,
                easing: 'cubic-bezier(0.4, 0, 0.2, 1)'
            });
            
            animation.onfinish = () => {
                particle.remove();
                createParticle();
            };
        }
        
        // Create initial particles
        for (let i = 0; i < 20; i++) {
            createParticle();
        }
        
        // Intersection Observer for fade-in animations
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
        
        document.querySelectorAll('.fade-in').forEach(el => {
            el.style.opacity = '0';
            el.style.transform = 'translateY(20px)';
            observer.observe(el);
        });
    </script>
</body>
</html>`;
}

module.exports = {
  generateHTML
};