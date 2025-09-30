// Unified Navigation System for SIF Framework
function loadGlobalNavigation() {
    const navContainer = document.getElementById('global-navigation');
    if (!navContainer) {
        console.error('Global navigation container not found');
        return;
    }

    try {
        const currentPath = window.location.pathname;
        const currentPage = getCurrentPage();

        // Unified base path detection
        let basePath = '/SIF-Framework/';
        if (window.location.hostname !== 'sif-framework-uk.github.io') {
            basePath = './';
        }

        // Generate unified navigation
        const navigationHTML = generateUnifiedNav(basePath, currentPath, currentPage);
        navContainer.innerHTML = navigationHTML;
        attachNavigationEvents();

    } catch (error) {
        console.error('Error loading navigation:', error);
        navContainer.innerHTML = generateFallbackNav();
    }
}

function generateUnifiedNav(basePath, currentPath, currentPage) {
    const isHome = currentPath.endsWith('/SIF-Framework/') || currentPath.endsWith('/index.html') || currentPath === '/';
    const isAcquisition = currentPath.includes('/acquisition/');
    const isDocs = currentPath.includes('/docs/');
    const isDemo = currentPath.includes('/demo/');

    // Determine active section for sidebar
    let activeSection = 'home';
    if (isAcquisition) activeSection = 'acquisition';
    if (isDocs) activeSection = 'docs';
    if (isDemo) activeSection = 'demo';

    return `
        <nav class="docs-sidebar">
            <div class="sidebar-header">
                <h1>SIF Framework</h1>
                <p>Enterprise AI Governance</p>
            </div>

            <div class="sidebar-nav">
                <!-- Main Navigation - Always Visible -->
                <div class="nav-section">
                    <h3>Main Navigation</h3>
                    <ul class="nav-links">
                        <li><a href="${basePath}index.html" class="${activeSection === 'home' ? 'active' : ''}"><span class="icon">🏠</span> Home</a></li>
                        <li><a href="${basePath}docs/index.html" class="${activeSection === 'docs' ? 'active' : ''}"><span class="icon">📚</span> Documentation</a></li>
                        <li><a href="${basePath}demos/index.html" class="${activeSection === 'demo' ? 'active' : ''}"><span class="icon">🎮</span> Live Demo</a></li>
                        <li><a href="${basePath}acquisition/index.html" class="${activeSection === 'acquisition' ? 'active' : ''}"><span class="icon">💼</span> Acquisition</a></li>
                    </ul>
                </div>

                <!-- Contextual Navigation -->
                ${isDocs ? generateDocsNav(basePath, currentPage) : ''}
                ${isAcquisition ? generateAcquisitionNav(basePath, currentPage) : ''}
                ${isDemo ? generateDemoNav(basePath, currentPage) : ''}
                ${isHome ? generateHomeQuickLinks(basePath) : ''}

                <!-- Cross-Section Links -->
                <div class="nav-section">
                    <h3>Quick Access</h3>
                    <ul class="nav-links">
                        ${!isDocs ? `<li><a href="${basePath}docs/quick-start.html"><span class="icon">🚀</span> Quick Start Guide</a></li>` : ''}
                        ${!isDemo ? `<li><a href="${basePath}demos/index.html"><span class="icon">🎮</span> Live Demo</a></li>` : ''}
                        ${!isAcquisition ? `<li><a href="${basePath}acquisition/index.html"><span class="icon">📋</span> Acquisition Overview</a></li>` : ''}
                        <li><a href="${basePath}docs/api-reference.html"><span class="icon">🔧</span> API Reference</a></li>
                        <li><a href="${basePath}docs/faq.html"><span class="icon">❓</span> FAQ</a></li>
                    </ul>
                </div>
            </div>
        </nav>
    `;
}

function generateDocsNav(basePath, currentPage) {
    return `
        <div class="nav-section">
            <h3>Documentation</h3>
            <ul class="nav-links">
                <li><a href="${basePath}docs/quick-start.html" class="${currentPage === 'quick-start.html' ? 'active' : ''}"><span class="icon">🚀</span> Quick Start</a></li>
                <li><a href="${basePath}docs/integration-guide.html" class="${currentPage === 'integration-guide.html' ? 'active' : ''}"><span class="icon">🔌</span> Integration</a></li>
                <li><a href="${basePath}docs/api-reference.html" class="${currentPage === 'api-reference.html' ? 'active' : ''}"><span class="icon">🔧</span> API Reference</a></li>
                <li><a href="${basePath}docs/enterprise-deployment.html" class="${currentPage === 'enterprise-deployment.html' ? 'active' : ''}"><span class="icon">🏢</span> Deployment</a></li>
                <li><a href="${basePath}docs/compliance-guide.html" class="${currentPage === 'compliance-guide.html' ? 'active' : ''}"><span class="icon">⚖️</span> Compliance</a></li>
            </ul>
        </div>
    `;
}

function generateAcquisitionNav(basePath, currentPage) {
    return `
        <div class="nav-section">
            <h3>Acquisition Package</h3>
            <ul class="nav-links">
                <li><a href="${basePath}acquisition/index.html" class="${currentPage === 'acquisition-index' ? 'active' : ''}"><span class="icon">📋</span> Overview</a></li>
                <li><a href="${basePath}acquisition/architecture-overview.html" class="${currentPage === 'architecture-overview.html' ? 'active' : ''}"><span class="icon">🏗️</span> Architecture</a></li>
                <li><a href="${basePath}acquisition/deployment-checklist.html" class="${currentPage === 'deployment-checklist.html' ? 'active' : ''}"><span class="icon">✅</span> Deployment</a></li>
                <li><a href="${basePath}acquisition/ip-assignment.html" class="${currentPage === 'ip-assignment.html' ? 'active' : ''}"><span class="icon">⚖️</span> IP Assignment</a></li>
                <li><a href="${basePath}acquisition/software-license.html" class="${currentPage === 'software-license.html' ? 'active' : ''}"><span class="icon">📄</span> License</a></li>
            </ul>
        </div>
    `;
}

function generateDemoNav(basePath, currentPage) {
    return `
        <div class="nav-section">
            <h3>Demo</h3>
            <ul class="nav-links">
                <li><a href="${basePath}demos/index.html" class="${currentPage === 'index.html' ? 'active' : ''}"><span class="icon">🎯</span> Demo Home</a></li>
                <li><a href="${basePath}demos/demo-frontend/index.html"><span class="icon">🚀</span> Launch Demo</a></li>
            </ul>
        </div>
    `;
}

function generateHomeQuickLinks(basePath) {
    return `
        <div class="nav-section">
            <h3>Get Started</h3>
            <ul class="nav-links">
                <li><a href="${basePath}docs/quick-start.html"><span class="icon">🚀</span> Quick Start</a></li>
                <li><a href="${basePath}demos/index.html"><span class="icon">🎮</span> Live Demo</a></li>
                <li><a href="${basePath}docs/index.html"><span class="icon">📖</span> Full Documentation</a></li>
                <li><a href="${basePath}acquisition/index.html"><span class="icon">💼</span> Acquisition Info</a></li>
            </ul>
        </div>
    `;
}

function generateFallbackNav() {
    return `
        <nav class="docs-sidebar">
            <div class="sidebar-header">
                <h1>SIF Framework</h1>
                <p>Navigation Error</p>
            </div>
            <div class="sidebar-nav">
                <div class="nav-section">
                    <ul class="nav-links">
                        <li><a href="/SIF-Framework/index.html"><span class="icon">🏠</span> Home</a></li>
                        <li><a href="/SIF-Framework/docs/index.html"><span class="icon">📚</span> Documentation</a></li>
                        <li><a href="/SIF-Framework/demos/index.html"><span class="icon">🎮</span> Live Demo</a></li>
                        <li><a href="/SIF-Framework/acquisition/index.html"><span class="icon">💼</span> Acquisition</a></li>
                    </ul>
                </div>
            </div>
        </nav>
    `;
}

function getCurrentPage() {
    const path = window.location.pathname;
    let page = path.split('/').pop() || 'index.html';

    if (path.includes('/acquisition/') && page === 'index.html') {
        return 'acquisition-index';
    }

    return page;
}

function attachNavigationEvents() {
    // Search functionality
    const searchBox = document.querySelector('.search-box');
    if (searchBox) {
        searchBox.addEventListener('input', function(e) {
            const query = e.target.value.toLowerCase();
            const navSections = document.querySelectorAll('.nav-section');

            navSections.forEach(section => {
                const links = section.querySelectorAll('.nav-links a');
                let hasVisibleLinks = false;

                links.forEach(link => {
                    const text = link.textContent.toLowerCase();
                    if (text.includes(query)) {
                        link.parentElement.style.display = '';
                        hasVisibleLinks = true;
                    } else {
                        link.parentElement.style.display = 'none';
                    }
                });

                section.style.display = hasVisibleLinks ? '' : 'none';
            });
        });
    }

    // Mobile menu
    const mobileToggle = document.querySelector('.mobile-toggle');
    const sidebarOverlay = document.querySelector('.sidebar-overlay');

    if (mobileToggle) {
        mobileToggle.addEventListener('click', function() {
            const sidebar = document.querySelector('.docs-sidebar');
            sidebar.classList.toggle('mobile-open');

            if (sidebarOverlay) {
                sidebarOverlay.classList.toggle('active');
            }
        });
    }

    if (sidebarOverlay) {
        sidebarOverlay.addEventListener('click', function() {
            const sidebar = document.querySelector('.docs-sidebar');
            sidebar.classList.remove('mobile-open');
            sidebarOverlay.classList.remove('active');
        });
    }
}

// Enhanced loading with error handling and retry
let navigationLoadAttempts = 0;
const maxNavigationLoadAttempts = 3;

function attemptLoadNavigation() {
    try {
        if (document.readyState === 'loading') {
            document.addEventListener('DOMContentLoaded', loadGlobalNavigation);
        } else {
            loadGlobalNavigation();
        }
    } catch (error) {
        console.error('Failed to load navigation:', error);
        if (navigationLoadAttempts < maxNavigationLoadAttempts) {
            navigationLoadAttempts++;
            setTimeout(attemptLoadNavigation, 500);
        }
    }
}

attemptLoadNavigation();

if (typeof module !== 'undefined' && module.exports) {
    module.exports = { loadGlobalNavigation };
}
