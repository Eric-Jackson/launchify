export const getDeployStyles = (theme) => `
  @import url('https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700&display=swap');
  
  /* Base styles */
  * {
    margin: 0;
    padding: 0;
    box-sizing: border-box;
  }

  body {
    font-family: 'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen, Ubuntu, Cantarell, 'Open Sans', 'Helvetica Neue', sans-serif;
    line-height: 1.5;
    -webkit-font-smoothing: antialiased;
  }

  /* Theme-specific styles */
  .wrapper {
    min-height: 100vh;
    background-color: ${theme === 'light' ? 'white' : theme === 'dark' ? 'rgb(15, 23, 42)' : 'rgb(254, 252, 232)'};
    color: ${theme === 'light' ? 'rgb(17, 24, 39)' : theme === 'dark' ? 'white' : 'black'};
  }

  /* Hero section */
  .hero {
    position: relative;
    padding: 5rem 1.5rem;
    overflow: hidden;
  }

  .hero::before {
    content: '';
    position: absolute;
    inset: 0;
    background: ${theme === 'light' 
      ? 'linear-gradient(to bottom right, rgb(238, 242, 255), white, rgb(239, 246, 255))'
      : theme === 'dark'
      ? 'linear-gradient(to bottom right, rgb(15, 23, 42), black, rgb(88, 28, 135))'
      : 'linear-gradient(to bottom right, rgb(254, 252, 232), white, rgb(255, 247, 237))'};
    z-index: -1;
  }

  .hero-title {
    font-size: 3.75rem;
    line-height: 1;
    font-weight: 700;
    letter-spacing: -0.025em;
    color: ${theme === 'light' ? 'rgb(17, 24, 39)' : theme === 'dark' ? 'white' : 'black'};
    margin-bottom: 1.5rem;
  }

  .hero-tagline {
    font-size: 1.5rem;
    color: ${theme === 'light' ? 'rgb(75, 85, 99)' : theme === 'dark' ? 'rgb(209, 213, 219)' : 'rgb(55, 65, 81)'};
    margin-bottom: 1rem;
  }

  .hero-description {
    font-size: 1.25rem;
    color: ${theme === 'light' ? 'rgb(75, 85, 99)' : theme === 'dark' ? 'rgb(209, 213, 219)' : 'rgb(55, 65, 81)'};
    margin-bottom: 2rem;
  }

  /* Features section */
  .features {
    background-color: ${theme === 'light' ? 'rgb(249, 250, 251)' : theme === 'dark' ? 'rgb(30, 41, 59)' : 'rgb(254, 249, 195)'};
    padding: 5rem 1.5rem;
  }

  .features-grid {
    display: grid;
    grid-template-columns: repeat(1, minmax(0, 1fr));
    gap: 2rem;
    max-width: 80rem;
    margin: 0 auto;
  }

  @media (min-width: 768px) {
    .features-grid {
      grid-template-columns: repeat(2, minmax(0, 1fr));
    }
  }

  @media (min-width: 1024px) {
    .features-grid {
      grid-template-columns: repeat(3, minmax(0, 1fr));
    }
  }

  .feature-card {
    background-color: ${theme === 'light' ? 'white' : theme === 'dark' ? 'rgb(30, 41, 59)' : 'rgb(254, 249, 195)'};
    border-radius: 1rem;
    padding: 2rem;
    box-shadow: ${theme === 'light'
      ? '0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06)'
      : theme === 'dark'
      ? '0 4px 6px -1px rgba(0, 0, 0, 0.2), 0 2px 4px -1px rgba(0, 0, 0, 0.1)'
      : '0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06)'};
    transition: transform 0.2s ease-in-out;
  }

  .feature-card:hover {
    transform: translateY(-4px);
  }

  .feature-icon {
    width: 3.5rem;
    height: 3.5rem;
    border-radius: 0.5rem;
    display: flex;
    align-items: center;
    justify-content: center;
    margin-bottom: 1.5rem;
    background-color: ${theme === 'light' ? 'rgb(238, 242, 255)' : theme === 'dark' ? 'rgba(76, 29, 149, 0.5)' : 'rgb(234, 179, 8)'};
    color: ${theme === 'light' ? 'rgb(79, 70, 229)' : theme === 'dark' ? 'rgb(192, 132, 252)' : 'white'};
  }

  .feature-title {
    font-size: 1.25rem;
    font-weight: 600;
    color: ${theme === 'light' ? 'rgb(17, 24, 39)' : theme === 'dark' ? 'white' : 'black'};
    margin-bottom: 0.5rem;
  }

  .feature-description {
    color: ${theme === 'light' ? 'rgb(75, 85, 99)' : theme === 'dark' ? 'rgb(209, 213, 219)' : 'rgb(55, 65, 81)'};
  }

  /* Text styles */
  .text-primary {
    color: ${theme === 'light' ? 'rgb(17, 24, 39)' : theme === 'dark' ? 'white' : 'black'};
  }

  .text-secondary {
    color: ${theme === 'light' ? 'rgb(75, 85, 99)' : theme === 'dark' ? 'rgb(209, 213, 219)' : 'rgb(55, 65, 81)'};
  }

  /* Footer */
  footer {
    background-color: ${theme === 'light' ? 'rgb(17, 24, 39)' : 'black'};
    color: white;
    padding: 2rem 1.5rem;
    text-align: center;
  }

  .social-links {
    display: flex;
    justify-content: center;
    gap: 1rem;
    margin-bottom: 1rem;
  }

  .social-icon {
    width: 1.25rem;
    height: 1.25rem;
    color: ${theme === 'light' ? 'rgb(75, 85, 99)' : theme === 'dark' ? 'rgb(209, 213, 219)' : 'rgb(55, 65, 81)'};
    transition: color 0.2s;
  }

  .social-icon:hover {
    color: ${theme === 'light' ? 'rgb(17, 24, 39)' : theme === 'dark' ? 'white' : 'black'};
  }

  /* CTA Button */
  .cta-button {
    display: inline-flex;
    align-items: center;
    padding: 0.75rem 1.5rem;
    border-radius: 0.5rem;
    font-weight: 600;
    transition: all 0.2s;
    background: ${theme === 'light' 
      ? 'linear-gradient(to bottom right, rgb(79, 70, 229), rgb(37, 99, 235))'
      : theme === 'dark'
      ? 'linear-gradient(to bottom right, rgb(124, 58, 237), rgb(147, 51, 234))'
      : 'linear-gradient(to bottom right, rgb(249, 115, 22), rgb(245, 158, 11))'};
    color: white;
    text-decoration: none;
    box-shadow: ${theme === 'light'
      ? '0 8px 30px rgba(79, 70, 229, 0.2)'
      : theme === 'dark'
      ? '0 8px 30px rgba(147, 51, 234, 0.2)'
      : '0 8px 30px rgba(245, 158, 11, 0.2)'};
  }

  .cta-button:hover {
    transform: translateY(-2px);
    box-shadow: ${theme === 'light'
      ? '0 12px 40px rgba(79, 70, 229, 0.3)'
      : theme === 'dark'
      ? '0 12px 40px rgba(147, 51, 234, 0.3)'
      : '0 12px 40px rgba(245, 158, 11, 0.3)'};
  }

  /* Layout utilities */
  .container {
    width: 100%;
    max-width: 80rem;
    margin: 0 auto;
    padding: 0 1.5rem;
  }

  .flex { display: flex; }
  .flex-col { flex-direction: column; }
  .items-center { align-items: center; }
  .justify-center { justify-content: center; }
  .justify-between { justify-between: space-between; }
  .text-center { text-align: center; }
  .gap-4 { gap: 1rem; }
  .gap-8 { gap: 2rem; }
  .space-x-6 > * + * { margin-left: 1.5rem; }
  .mb-6 { margin-bottom: 1.5rem; }
  .mb-8 { margin-bottom: 2rem; }
  .max-w-3xl { max-width: 48rem; }
  .mx-auto { margin-left: auto; margin-right: auto; }

  /* Typography */
  .text-4xl { font-size: 2.25rem; line-height: 2.5rem; }
  .text-xl { font-size: 1.25rem; line-height: 1.75rem; }
  .font-bold { font-weight: 700; }
  .tracking-tight { letter-spacing: -0.025em; }

  /* Grid */
  .grid { display: grid; }
  .grid-cols-1 { grid-template-columns: repeat(1, minmax(0, 1fr)); }
  @media (min-width: 768px) {
    .md\\:grid-cols-2 { grid-template-columns: repeat(2, minmax(0, 1fr)); }
    .text-4xl { font-size: 3rem; line-height: 1; }
  }
  @media (min-width: 1024px) {
    .lg\\:grid-cols-3 { grid-template-columns: repeat(3, minmax(0, 1fr)); }
    .text-4xl { font-size: 3.75rem; line-height: 1; }
  }

  /* Animations */
  .fade-in {
    opacity: 0;
    transform: translateY(20px);
    transition: opacity 0.6s ease-out, transform 0.6s ease-out;
  }

  /* Particle animation */
  .particle {
    position: absolute;
    border-radius: 50%;
    pointer-events: none;
    opacity: 0.3;
    will-change: transform, opacity;
  }

  /* Interactive elements */
  .hover-scale {
    transition: transform 0.2s ease-in-out;
  }

  .hover-scale:hover {
    transform: scale(1.05);
  }

  /* Header */
  .sticky-header {
    position: sticky;
    top: 0;
    z-index: 50;
    background-color: ${theme === 'light' 
      ? 'rgba(255, 255, 255, 0.8)'
      : theme === 'dark'
      ? 'rgba(15, 23, 42, 0.8)'
      : 'rgba(254, 252, 232, 0.8)'};
    backdrop-filter: blur(12px);
    -webkit-backdrop-filter: blur(12px);
    border-bottom: 1px solid ${theme === 'light'
      ? 'rgba(229, 231, 235, 0.8)'
      : theme === 'dark'
      ? 'rgba(51, 65, 85, 0.8)'
      : 'rgba(234, 179, 8, 0.2)'};
  }

  /* Logo */
  .logo {
    max-height: 50px;
    width: auto;
  }

  .logo.dark {
    filter: invert(1) brightness(0);
  }

  /* Background elements */
  .gradient-blob {
    position: absolute;
    width: 400px;
    height: 400px;
    border-radius: 50%;
    opacity: 0.2;
    animation: float 15s ease-in-out infinite;
  }

  .gradient-blob-1 {
    top: 25%;
    left: 25%;
    background: radial-gradient(circle, 
      ${theme === 'light' 
        ? 'rgb(79, 70, 229) 0%, transparent 70%'
        : theme === 'dark'
        ? 'rgb(124, 58, 237) 0%, transparent 70%'
        : 'rgb(249, 115, 22) 0%, transparent 70%'});
  }

  .gradient-blob-2 {
    bottom: 25%;
    right: 25%;
    background: radial-gradient(circle, 
      ${theme === 'light'
        ? 'rgb(37, 99, 235) 0%, transparent 70%'
        : theme === 'dark'
        ? 'rgb(147, 51, 234) 0%, transparent 70%'
        : 'rgb(245, 158, 11) 0%, transparent 70%'});
    animation-delay: -7.5s;
  }

  .floating-particles {
    position: absolute;
    inset: 0;
    pointer-events: none;
    z-index: -1;
  }

  .floating-particle {
    position: absolute;
    width: 4px;
    height: 4px;
    border-radius: 50%;
    background: ${theme === 'light'
      ? 'rgb(79, 70, 229)'
      : theme === 'dark'
      ? 'rgb(124, 58, 237)'
      : 'rgb(249, 115, 22)'};
    animation: float 5s ease-in-out infinite;
  }
`; 