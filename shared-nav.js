// Global Navigation System for SIF Framework Documentation
function loadGlobalNavigation() {
    const navContainer = document.getElementById('global-navigation');
    if (!navContainer) {
        console.error('Global navigation container not found');
        return;
    }

    try {
        const currentPath = window.location.pathname;
        const isHomePage = currentPath.endsWith('/SIF-Framework/') ||
                          currentPath.endsWith('/SIF-Framework/index.html') ||
                          currentPath === '/' ||
                          currentPath.endsWith('/index.html');

        const isAcquisitionPage = currentPath.includes('acquisition-') ||
                                 document.title.includes('Acquisition');

        const isInDocsFolder = currentPath.includes('/docs/') || currentPath.includes('docs/');

        console.log('Navigation context:', { isHomePage, isAcquisitionPage, isInDocsFolder, currentPath });

        let basePath = '';
        if (window.location.hostname === 'sif-framework-uk.github.io') {
            basePath = '/SIF-Framework/';
        } else {
            basePath = './';
        }

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
                        <li><a href="${basePath}docs/quick-start.html"><span class="icon">🚀</span> Quick Start</a></li>
                    </ul>
                </div>

                <div class="nav-section">
                    <h3>Technical Docs</h3>
                    <ul class="nav-links">
                        <li><a href="${basePath}docs/integration-guide.html"><span class="icon">🔌</span> Integration</a></li>
                        <li><a href="${basePath}docs/api-reference.html"><span class="icon">🔧</span> API Reference</a></li>
                        <li><a href="${basePath}docs/enterprise-deployment.html"><span class="icon">🏢</span> Deployment</a></li>
                        <li><a href="${basePath}docs/compliance-guide.html"><span class="icon">⚖️</span> Compliance</a></li>
                        <li><a href="${basePath}docs/use-cases.html"><span class="icon">🎯</span> Use Cases</a></li>
                        <li><a href="${basePath}docs/faq.html"><span class="icon">❓</span> FAQ</a></li>
                    </ul>
                </div>

                <div class="nav-section">
                    <h3>Acquisition</h3>
                    <ul class="nav-links">
                        <li><a href="${basePath}docs/acquisition-overview.html"><span class="icon">💼</span> Acquisition Package</a></li>
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
                <p>Enterprise AI Governance Documentation</p>
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
                        <li><a href="${basePath}docs/acquisition-overview.html"><span class="icon">💼</span> Acquisition Package</a></li>
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
                        <li><a href="${basePath}docs/acquisition-overview.html" class="${currentPage === 'acquisition-overview.html' ? 'active' : ''}"><span class="icon">📋</span> Overview</a></li>
                        <li><a href="${basePath}docs/architecture-overview.html" class="${currentPage === 'architecture-overview.html' ? 'active' : ''}"><span class="icon">🏗️</span> Architecture</a></li>
                        <li><a href="${basePath}docs/deployment-checklist.html" class="${currentPage === 'deployment-checklist.html' ? 'active' : ''}"><span class="icon">✅</span> Deployment</a></li>
                        <li><a href="${basePath}docs/ip-assignment.html" class="${currentPage === 'ip-assignment.html' ? 'active' : ''}"><span class="icon">⚖️</span> IP Assignment</a></li>
                        <li><a href="${basePath}docs/software-license.html" class="${currentPage === 'software-license.html' ? 'active' : ''}"><span class="icon">📄</span> License</a></li>
                        <li><a href="${basePath}docs/support-transition.html" class="${currentPage === 'support-transition.html' ? 'active' : ''}"><span class="icon">🔄</span> Support</a></li>
                        <li><a href="${basePath}docs/warranties-disclaimers.html" class="${currentPage === 'warranties-disclaimers.html' ? 'active' : ''}"><span class="icon">🛡️</span> Warranties</a></li>
                        <li><a href="${basePath}docs/acquisition-process.html" class="${currentPage === 'acquisition-process.html' ? 'active' : ''}"><span class="icon">⚡</span> Process</a></li>
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
                        <li><a href="/SIF-Framework/docs/acquisition-overview.html"><span class="icon">💼</span> Acquisition</a></li>
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
}

// Load navigation when ready
if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', loadGlobalNavigation);
} else {
    loadGlobalNavigation();
}
