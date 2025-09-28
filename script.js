// Global functionality for SIF Framework
document.addEventListener('DOMContentLoaded', function() {
    // Mobile menu toggle for global navigation
    const mobileMenuToggle = document.createElement('button');
    mobileMenuToggle.innerHTML = '☰ Menu';
    mobileMenuToggle.className = 'mobile-menu-toggle';
    mobileMenuToggle.style.cssText = `
        display: none;
        position: fixed;
        top: 1rem;
        left: 1rem;
        z-index: 1000;
        background: var(--primary);
        color: white;
        border: none;
        padding: 0.75rem 1rem;
        border-radius: 6px;
        font-size: 0.9rem;
        cursor: pointer;
    `;

    document.body.appendChild(mobileMenuToggle);

    // Toggle mobile menu
    mobileMenuToggle.addEventListener('click', function() {
        const sidebar = document.querySelector('.docs-sidebar');
        if (window.innerWidth < 968) {
            const isVisible = sidebar.style.display !== 'none';
            sidebar.style.display = isVisible ? 'none' : 'block';
        }
    });

    // Responsive behavior
    function handleResize() {
        const sidebar = document.querySelector('.docs-sidebar');
        if (window.innerWidth < 968) {
            mobileMenuToggle.style.display = 'block';
            sidebar.style.display = 'none';
        } else {
            mobileMenuToggle.style.display = 'none';
            sidebar.style.display = 'block';
        }
    }

    // Initial setup
    handleResize();
    window.addEventListener('resize', handleResize);

    // External link handling
    document.querySelectorAll('a[href^="http"]').forEach(link => {
        if (!link.href.includes(window.location.hostname)) {
            link.setAttribute('target', '_blank');
            link.setAttribute('rel', 'noopener noreferrer');
        }
    });

    // Your existing functionality for main site
    if (window.location.pathname === '/' || window.location.pathname === '/index.html') {
        // Main site specific functionality
        initializeMainSiteFeatures();
    }
});

function initializeMainSiteFeatures() {
    // Fade-in animations
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };

    const observer = new IntersectionObserver(function(entries) {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
            }
        });
    }, observerOptions);

    document.querySelectorAll('.content-section').forEach(section => {
        section.style.opacity = '0';
        section.style.transform = 'translateY(20px)';
        section.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
        observer.observe(section);
    });

    // Demo loading states
    document.querySelectorAll('a[href*="demo"]').forEach(link => {
        link.addEventListener('click', function(e) {
            if (this.getAttribute('href').includes('demo-frontend')) {
                const originalText = this.innerHTML;
                this.innerHTML = 'Loading Demo...';
                setTimeout(() => {
                    this.innerHTML = originalText;
                }, 2000);
            }
        });
    });
}
