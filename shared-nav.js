// Global Navigation System for SIF Framework Documentation
function loadGlobalNavigation() {
    const navContainer = document.getElementById('global-navigation');
    if (!navContainer) {
        console.error('Global navigation container not found');
        return;
    }

    try {
        const currentPath = window.location.pathname;

        // Detect context based on folder
        const isHomePage = currentPath.endsWith('/SIF-Framework/') ||
                          currentPath.endsWith('/index.html') ||
                          currentPath === '/';

        const isAcquisitionPage = currentPath.includes('/acquisition/');
        const isDocsPage = currentPath.includes('/docs/') ||
                          (isHomePage && !isAcquisitionPage);

        // Base path calculation is now much simpler
        let basePath = '/SIF-Framework/';
        if (window.location.hostname !== 'sif-framework-uk.github.io') {
            basePath = './'; // Local development
        }

        console.log('Navigation context:', {
            isHomePage,
            isAcquisitionPage,
            isDocsPage,
            currentPath,
            basePath
        });

        const navigationHTML = isHomePage ? generateHomeNav(basePath) :
                              isAcquisitionPage ? generateAcquisitionNav(basePath) :
                              generateTechnicalDocsNav(basePath);

        navContainer.innerHTML = navigationHTML;
        attachNavigationEvents();

    } catch (error) {
        console.error('Error loading navigation:', error);
        navContainer.innerHTML = generateFallbackNav();
    }
}

function generateHomeNav(basePath) {
    return `
        <nav class="docs-sidebar">
            <div class="sidebar-header">
                <h1>SIF Framework</h1>
                <p>Enterprise AI Governance</p>
            </div>

            <div class="sidebar-nav">
                <div class="nav-section">
                    <h3>Main Navigation</h3>
                    <ul class="nav-links">
                        <li><a href="${basePath}index.html" class="active"><span class="icon">🏠</span> Home</a></li>
                        <li><a href="${basePath}docs/index.html"><span class="icon">📖</span> Documentation</a></li>
                        <li><a href="${basePath}acquisition/index.html"><span class="icon">💼</span> Acquisition</a></li>
                    </ul>
                </div>

                <div class="nav-section">
                    <h3>Quick Links</h3>
                    <ul class="nav-links">
                        <li><a href="${basePath}docs/quick-start.html"><span class="icon">🚀</span> Quick Start</a></li>
                        <li><a href="${basePath}docs/api-reference.html"><span class="icon">🔧</span> API Reference</a></li>
                        <li><a href="${basePath}docs/faq.html"><span class="icon">❓</span> FAQ</a></li>
                    </ul>
                </div>
            </div>
        </nav>
    `;
}

function generateTechnicalDocsNav(basePath) {
    const currentPage = getCurrentPage();

    return `
        <nav class="docs-sidebar">
            <div class="sidebar-header">
                <h1>SIF Framework</h1>
                <p>Technical Documentation</p>
            </div>

            <div class="search-container">
                <input type="text" class="search-box" placeholder="Search documentation...">
            </div>

            <div class="sidebar-nav">
                <div class="nav-section">
                    <h3>Main</h3>
                    <ul class="nav-links">
                        <li><a href="${basePath}index.html"><span class="icon">🏠</span> Home</a></li>
                        <li><a href="${basePath}docs/index.html" class="${currentPage === 'index.html' ? 'active' : ''}"><span class="icon">📖</span> Overview</a></li>
                    </ul>
                </div>

                <div class="nav-section">
                    <h3>Getting Started</h3>
                    <ul class="nav-links">
                        <li><a href="${basePath}docs/quick-start.html" class="${currentPage === 'quick-start.html' ? 'active' : ''}"><span class="icon">🚀</span> Quick Start</a></li>
                    </ul>
                </div>

                <div class="nav-section">
                    <h3>Integration</h3>
                    <ul class="nav-links">
                        <li><a href="${basePath}docs/integration-guide.html" class="${currentPage === 'integration-guide.html' ? 'active' : ''}"><span class="icon">🔌</span> Integration Guide</a></li>
                        <li><a href="${basePath}docs/api-reference.html" class="${currentPage === 'api-reference.html' ? 'active' : ''}"><span class="icon">🔧</span> API Reference</a></li>
                    </ul>
                </div>

                <div class="nav-section">
                    <h3>Enterprise</h3>
                    <ul class="nav-links">
                        <li><a href="${basePath}docs/enterprise-deployment.html" class="${currentPage === 'enterprise-deployment.html' ? 'active' : ''}"><span class="icon">🏢</span> Deployment Guide</a></li>
                        <li><a href="${basePath}docs/compliance-guide.html" class="${currentPage === 'compliance-guide.html' ? 'active' : ''}"><span class="icon">⚖️</span> Compliance Guide</a></li>
                        <li><a href="${basePath}docs/use-cases.html" class="${currentPage === 'use-cases.html' ? 'active' : ''}"><span class="icon">🎯</span> Use Cases</a></li>
                    </ul>
                </div>

                <div class="nav-section">
                    <h3>Support</h3>
                    <ul class="nav-links">
                        <li><a href="${basePath}docs/faq.html" class="${currentPage === 'faq.html' ? 'active' : ''}"><span class="icon">❓</span> FAQ</a></li>
                    </ul>
                </div>

                <div class="nav-section">
                    <h3>Acquisition</h3>
                    <ul class="nav-links">
                        <li><a href="${basePath}acquisition/index.html"><span class="icon">💼</span> Acquisition Package</a></li>
                    </ul>
                </div>
            </div>
        </nav>
    `;
}

function generateAcquisitionNav(basePath) {
    const currentPage = getCurrentPage();

    return `
        <nav class="docs-sidebar">
            <div class="sidebar-header">
                <h1>SIF Framework</h1>
                <p>Acquisition Documentation</p>
            </div>

            <div class="sidebar-nav">
                <div class="nav-section">
                    <h3>Main</h3>
                    <ul class="nav-links">
                        <li><a href="${basePath}index.html"><span class="icon">🏠</span> Home</a></li>
                        <li><a href="${basePath}docs/index.html"><span class="icon">📚</span> Technical Docs</a></li>
                    </ul>
                </div>

                <div class="nav-section">
                    <h3>Acquisition Package</h3>
                    <ul class="nav-links">
                        <li><a href="${basePath}acquisition/index.html" class="${currentPage === 'index.html' ? 'active' : ''}"><span class="icon">📋</span> Overview</a></li>
                        <li><a href="${basePath}acquisition/acquisition-overview.html" class="${currentPage === 'acquisition-overview.html' ? 'active' : ''}"><span class="icon">🔍</span> Detailed Overview</a></li>
                        <li><a href="${basePath}acquisition/architecture-overview.html" class="${currentPage === 'architecture-overview.html' ? 'active' : ''}"><span class="icon">🏗️</span> Architecture</a></li>
                        <li><a href="${basePath}acquisition/deployment-checklist.html" class="${currentPage === 'deployment-checklist.html' ? 'active' : ''}"><span class="icon">✅</span> Deployment</a></li>
                        <li><a href="${basePath}acquisition/ip-assignment.html" class="${currentPage === 'ip-assignment.html' ? 'active' : ''}"><span class="icon">⚖️</span> IP Assignment</a></li>
                        <li><a href="${basePath}acquisition/software-license.html" class="${currentPage === 'software-license.html' ? 'active' : ''}"><span class="icon">📄</span> License</a></li>
                        <li><a href="${basePath}acquisition/support-transition.html" class="${currentPage === 'support-transition.html' ? 'active' : ''}"><span class="icon">🔄</span> Support</a></li>
                        <li><a href="${basePath}acquisition/warranties-disclaimers.html" class="${currentPage === 'warranties-disclaimers.html' ? 'active' : ''}"><span class="icon">🛡️</span> Warranties</a></li>
                        <li><a href="${basePath}acquisition/acquisition-process.html" class="${currentPage === 'acquisition-process.html' ? 'active' : ''}"><span class="icon">⚡</span> Process</a></li>
                    </ul>
                </div>
            </div>
        </nav>
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
                        <li><a href="/SIF-Framework/acquisition/index.html"><span class="icon">💼</span> Acquisition</a></li>
                    </ul>
                </div>
            </div>
        </nav>
    `;
}

function getCurrentPage() {
    const path = window.location.pathname;
    return path.split('/').pop() || 'index.html';
}

function attachNavigationEvents() {
    const searchBox = document.querySelector('.search-box');
    if (searchBox) {
        searchBox.addEventListener('input', function(e) {
            console.log('Search:', e.target.value);
        });
    }

    // Mobile menu toggle (if you add mobile support later)
    const mobileToggle = document.querySelector('.mobile-toggle');
    if (mobileToggle) {
        mobileToggle.addEventListener('click', function() {
            document.querySelector('.docs-sidebar').classList.toggle('mobile-open');
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

// Start loading navigation
attemptLoadNavigation();

// Export for module usage if needed
if (typeof module !== 'undefined' && module.exports) {
    module.exports = { loadGlobalNavigation };
}
