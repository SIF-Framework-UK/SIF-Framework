// Global Navigation Configuration for entire SIF Framework site
const GLOBAL_NAVIGATION = {
    mainSite: {
        title: 'SIF Framework',
        subtitle: 'Ethical AI Adjudication System',
        sections: [
            {
                title: 'Main',
                links: [
                    { name: '🏠 Home', url: '/', icon: '🏠' },
                    { name: '🚀 Acquisition', url: '/acquisition.html', icon: '🚀' },
                    { name: '⚡ Features', url: '#features', icon: '⚡' },
                    { name: '🎮 Live Demo', url: '#demo', icon: '🎮' }
                ]
            },
            {
                title: 'Framework Docs',
                links: [
                    { name: '📚 Documentation', url: '/docs/', icon: '📚' },
                    { name: '🏗️ Architecture', url: '/docs/architecture-overview.html', icon: '🏗️' },
                    { name: '🔧 API Reference', url: '/docs/api-reference.html', icon: '🔧' },
                    { name: '🚀 Quick Start', url: '/docs/quick-start.html', icon: '🚀' },
                    { name: '🎯 Use Cases', url: '/docs/use-cases.html', icon: '🎯' }
                ]
            },
            {
                title: 'Acquisition & Implementation',
                links: [
                    { name: '📊 Executive Summary', url: '/acquisition.html', icon: '📊' },
                    { name: '📋 Acquisition Guide', url: '/docs/acquisition-overview.html', icon: '📋' },
                    { name: '✅ Compliance Guide', url: '/docs/compliance-guide.html', icon: '✅' },
                    { name: '🏢 Enterprise Deployment', url: '/docs/enterprise-deployment.html', icon: '🏢' },
                    { name: '📝 Deployment Checklist', url: '/docs/deployment-checklist.html', icon: '📝' },
                    { name: '🔄 Support & Transition', url: '/docs/support-transition.html', icon: '🔄' },
                    { name: '📄 Software License', url: '/docs/software-license.html', icon: '📄' },
                    { name: '🛡️ Warranties', url: '/docs/warranties-disclaimers.html', icon: '🛡️' }
                ]
            },
            {
                title: 'Demo',
                links: [
                    { name: '🎮 Try Demo', url: '/demo/demo-frontend/index.html', icon: '🎮' },
                    { name: '📖 Demo Guide', url: '/demo/README.md', icon: '📖' }
                ]
            }
        ]
    },
    docsSite: {
        title: 'SIF Framework',
        subtitle: 'Enterprise AI Governance Documentation',
        sections: [
            {
                title: 'Getting Started',
                links: [
                    { name: '📖 Overview', url: 'index.html', icon: '📖' },
                    { name: '🚀 Quick Start', url: 'quick-start.html', icon: '🚀' }
                ]
            },
            {
                title: 'Integration',
                links: [
                    { name: '🔌 Integration Guide', url: 'integration-guide.html', icon: '🔌' },
                    { name: '🔧 API Reference', url: 'api-reference.html', icon: '🔧' }
                ]
            },
            {
                title: 'Enterprise',
                links: [
                    { name: '🏢 Deployment Guide', url: 'enterprise-deployment.html', icon: '🏢' },
                    { name: '⚖️ Compliance Guide', url: 'compliance-guide.html', icon: '⚖️' },
                    { name: '🎯 Use Cases', url: 'use-cases.html', icon: '🎯' }
                ]
            },
            {
                title: 'Support',
                links: [
                    { name: '❓ FAQ', url: 'faq.html', icon: '❓' }
                ]
            }
        ]
    },
    acquisitionSite: {
        title: 'SIF Framework',
        subtitle: 'Acquisition Documentation',
        sections: [
            {
                title: 'Acquisition Package',
                links: [
                    { name: '📋 Overview', url: 'acquisition-overview.html', icon: '📋' },
                    { name: '🏗️ Architecture', url: 'architecture-overview.html', icon: '🏗️' },
                    { name: '✅ Deployment', url: 'deployment-checklist.html', icon: '✅' },
                    { name: '⚖️ IP Assignment', url: 'ip-assignment.html', icon: '⚖️' },
                    { name: '📄 License', url: 'software-license.html', icon: '📄' },
                    { name: '🔄 Support', url: 'support-transition.html', icon: '🔄' },
                    { name: '🛡️ Warranties', url: 'warranties-disclaimers.html', icon: '🛡️' },
                    { name: '⚡ Process', url: 'acquisition-process.html', icon: '⚡' }
                ]
            }
        ]
    }
};

// Determine current site context
function getCurrentSiteContext() {
    const currentPath = window.location.pathname;

    if (currentPath.includes('/docs/')) {
        const currentPage = currentPath.split('/').pop();
        const isAcquisitionPage = currentPage.includes('acquisition') ||
                                 currentPage.includes('ip-assignment') ||
                                 currentPage.includes('software-license') ||
                                 currentPage.includes('support-transition') ||
                                 currentPage.includes('warranties');

        return isAcquisitionPage ? 'acquisitionSite' : 'docsSite';
    }

    return 'mainSite';
}

// Generate navigation HTML
function generateGlobalNavigation() {
    const context = getCurrentSiteContext();
    const navigation = GLOBAL_NAVIGATION[context];
    const currentPath = window.location.pathname;
    const currentPage = currentPath.split('/').pop();

    let navHTML = `
        <nav class="docs-sidebar">
            <div class="sidebar-header">
                <h1>${navigation.title}</h1>
                <p>${navigation.subtitle}</p>
            </div>
    `;

    // Add search bar only for main documentation site
    if (context === 'docsSite') {
        navHTML += `
            <div class="search-container">
                <input type="text" class="search-box" placeholder="Search documentation...">
            </div>
        `;
    }

    navHTML += `<div class="sidebar-nav">`;

    // Navigation sections
    navigation.sections.forEach(section => {
        navHTML += `
            <div class="nav-section">
                <h3>${section.title}</h3>
                <ul class="nav-links">
        `;

        section.links.forEach(link => {
            let isActive = false;

            if (link.url.startsWith('#')) {
                // Anchor links for main site
                isActive = currentPath === '/' && window.location.hash === link.url;
            } else if (link.url === '/') {
                // Home page
                isActive = currentPath === '/' || currentPath === '/index.html';
            } else {
                // Regular pages
                isActive = currentPath.endsWith(link.url) || currentPage === link.url;
            }

            navHTML += `
                <li>
                    <a href="${link.url}" class="${isActive ? 'active' : ''}">
                        <span class="icon">${link.icon}</span> ${link.name}
                    </a>
                </li>
            `;
        });

        navHTML += `
                </ul>
            </div>
        `;
    });

    // Cross-site navigation
    navHTML += `
        <div class="nav-section">
            <h3>Site Navigation</h3>
            <ul class="nav-links">
    `;

    if (context === 'mainSite') {
        navHTML += `
            <li>
                <a href="/docs/">
                    <span class="icon">📚</span> View Documentation
                </a>
            </li>
            <li>
                <a href="/docs/acquisition-overview.html">
                    <span class="icon">🚀</span> Acquisition Details
                </a>
            </li>
        `;
    } else if (context === 'docsSite') {
        navHTML += `
            <li>
                <a href="/">
                    <span class="icon">🏠</span> Back to Main Site
                </a>
            </li>
            <li>
                <a href="/docs/acquisition-overview.html">
                    <span class="icon">🚀</span> Acquisition Documentation
                </a>
            </li>
        `;
    } else if (context === 'acquisitionSite') {
        navHTML += `
            <li>
                <a href="/">
                    <span class="icon">🏠</span> Back to Main Site
                </a>
            </li>
            <li>
                <a href="/docs/">
                    <span class="icon">📚</span> Main Documentation
                </a>
            </li>
        `;
    }

    navHTML += `
            </ul>
        </div>
    `;

    navHTML += `
            </div>
        </nav>
    `;

    return navHTML;
}

// Auto-initialize global navigation
document.addEventListener('DOMContentLoaded', function() {
    const navContainer = document.getElementById('global-navigation');
    if (navContainer) {
        navContainer.innerHTML = generateGlobalNavigation();
        initializeGlobalNavigationInteractivity();
    }
});

// Initialize interactivity for global navigation
function initializeGlobalNavigationInteractivity() {
    // Smooth scrolling for main site anchor links
    if (window.location.pathname === '/' || window.location.pathname === '/index.html') {
        document.querySelectorAll('.nav-links a[href^="#"]').forEach(anchor => {
            anchor.addEventListener('click', function (e) {
                e.preventDefault();
                const targetId = this.getAttribute('href');
                const target = document.querySelector(targetId);
                if (target) {
                    target.scrollIntoView({
                        behavior: 'smooth',
                        block: 'start'
                    });

                    // Update active navigation link
                    document.querySelectorAll('.nav-links a').forEach(link => {
                        link.classList.remove('active');
                    });
                    this.classList.add('active');
                }
            });
        });

        // Update active nav link on scroll for main site
        window.addEventListener('scroll', function() {
            const sections = document.querySelectorAll('.content-section');
            const navLinks = document.querySelectorAll('.nav-links a[href^="#"]');

            let currentSection = '';
            sections.forEach(section => {
                const sectionTop = section.offsetTop - 100;
                if (window.scrollY >= sectionTop) {
                    currentSection = '#' + section.getAttribute('id');
                }
            });

            navLinks.forEach(link => {
                link.classList.remove('active');
                if (link.getAttribute('href') === currentSection) {
                    link.classList.add('active');
                }
            });
        });
    }
}
