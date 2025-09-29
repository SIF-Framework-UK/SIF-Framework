// Documentation Navigation Script
document.addEventListener('DOMContentLoaded', function() {
    // Set active navigation link
    const currentPage = window.location.pathname.split('/').pop();
    const navLinks = document.querySelectorAll('.nav-links a');

    navLinks.forEach(link => {
        if (link.getAttribute('href') === currentPage) {
            link.classList.add('active');
        }
    });

    // Mobile menu toggle
    const mobileMenuToggle = document.createElement('button');
    mobileMenuToggle.innerHTML = '☰';
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
        padding: 0.5rem;
        border-radius: 4px;
        font-size: 1.2rem;
    `;

    document.body.appendChild(mobileMenuToggle);

    // Toggle mobile menu
    mobileMenuToggle.addEventListener('click', function() {
        const sidebar = document.querySelector('.docs-sidebar');
        sidebar.style.display = sidebar.style.display === 'none' ? 'block' : 'none';
    });

    // Hide sidebar on mobile by default
    if (window.innerWidth < 968) {
        document.querySelector('.docs-sidebar').style.display = 'none';
        mobileMenuToggle.style.display = 'block';
    }

    // Update on resize
    window.addEventListener('resize', function() {
        if (window.innerWidth < 968) {
            mobileMenuToggle.style.display = 'block';
        } else {
            mobileMenuToggle.style.display = 'none';
            document.querySelector('.docs-sidebar').style.display = 'block';
        }
    });

    // Add copy functionality to code blocks
    document.querySelectorAll('pre').forEach(pre => {
        const button = document.createElement('button');
        button.innerHTML = 'Copy';
        button.className = 'copy-button';
        button.style.cssText = `
            position: absolute;
            top: 0.5rem;
            right: 0.5rem;
            background: rgba(255,255,255,0.2);
            color: white;
            border: none;
            padding: 0.25rem 0.5rem;
            border-radius: 4px;
            font-size: 0.8rem;
            cursor: pointer;
        `;

        pre.style.position = 'relative';
        pre.appendChild(button);

        button.addEventListener('click', function() {
            const code = pre.querySelector('code').innerText;
            navigator.clipboard.writeText(code).then(() => {
                button.innerHTML = 'Copied!';
                setTimeout(() => button.innerHTML = 'Copy', 2000);
            });
        });
    });

    // Smooth scrolling for anchor links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                target.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
            }
        });
    });

    // Search functionality
    const searchBox = document.querySelector('.search-box');
    if (searchBox) {
        searchBox.addEventListener('input', function(e) {
            const searchTerm = e.target.value.toLowerCase();
            if (searchTerm.length > 2) {
                // Simple search highlight - in a real implementation, you'd want more sophisticated search
                highlightSearchTerms(searchTerm);
            } else {
                removeHighlights();
            }
        });
    }
});

function highlightSearchTerms(term) {
    removeHighlights();

    const walker = document.createTreeWalker(
        document.body,
        NodeFilter.SHOW_TEXT,
        null,
        false
    );

    let node;
    while (node = walker.nextNode()) {
        if (node.parentNode.nodeName === 'SCRIPT' || node.parentNode.nodeName === 'STYLE') {
            continue;
        }

        const index = node.textContent.toLowerCase().indexOf(term);
        if (index !== -1) {
            const span = document.createElement('span');
            span.className = 'search-highlight';
            span.style.backgroundColor = '#fef3cd';
            span.style.padding = '0.1rem 0.2rem';
            span.style.borderRadius = '2px';

            const middle = node.splitText(index);
            const after = middle.splitText(term.length);
            const highlighted = middle.cloneNode(true);

            span.appendChild(highlighted);
            middle.parentNode.replaceChild(span, middle);
        }
    }
}

function removeHighlights() {
    document.querySelectorAll('.search-highlight').forEach(highlight => {
        const parent = highlight.parentNode;
        parent.replaceChild(highlight.firstChild, highlight);
        parent.normalize();
    });
}
