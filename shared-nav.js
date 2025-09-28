// Global Navigation System for SIF Framework Documentation
// Automatically detects context (technical docs vs acquisition) and shows appropriate navigation

function loadGlobalNavigation() {
    const navContainer = document.getElementById('global-navigation');
    if (!navContainer) return;

    // Detect if we're in acquisition docs or technical docs
    const isAcquisitionPage = window.location.pathname.includes('acquisition-') ||
                             document.title.includes('Acquisition');

    const currentPath = window.location.pathname;
    const isInDocsFolder = currentPath.includes('/docs/');

    // Base path for links - adjust based on current location
    let basePath = '';
    if (isInDocsFolder) {
        basePath = './'; // Relative to current docs folder
    } else {
        basePath = 'docs/'; // Relative to root
    }

    const navigationHTML = `
        <nav class="docs-sidebar">
            <div class="sidebar-header">
                <h1>SIF Framework</h1>
                <p>${isAcquisitionPage ? 'Acquisition Documentation' : 'Enterprise AI Governance Documentation'}</p>
            </div>

            ${!isAcquisitionPage ? `
            <div class="search-container">
                <input type="text" class="search-box" placeholder="Search documentation...">
            </div>
            ` : ''}

            <div class="sidebar-nav">
                ${isAcquisitionPage ? generateAcquisitionNav(basePath) : generateTechnicalDocsNav(basePath)}
            </div>
        </nav>
    `;

    navContainer.innerHTML = navigationHTML;
    attachNavigationEvents();
}

function generateTechnicalDocsNav(basePath) {
    const currentPage = window.location.pathname.split('/').pop() || 'index.html';

    return `
        <div class="nav-section">
            <h3>Getting Started</h3>
            <ul class="nav-links">
                <li><a href="${basePath}index.html" class="${currentPage === 'index.html' ? 'active' : ''}"><span class="icon">📖</span> Overview</a></li>
                <li><a href="${basePath}quick-start.html" class="${currentPage === 'quick-start.html' ? 'active' : ''}"><span class="icon">🚀</span> Quick Start</a></li>
            </ul>
        </div>

        <div class="nav-section">
            <h3>Integration</h3>
            <ul class="nav-links">
                <li><a href="${basePath}integration-guide.html" class="${currentPage === 'integration-guide.html' ? 'active' : ''}"><span class="icon">🔌</span> Integration Guide</a></li>
                <li><a href="${basePath}api-reference.html" class="${currentPage === 'api-reference.html' ? 'active' : ''}"><span class="icon">🔧</span> API Reference</a></li>
            </ul>
        </div>

        <div class="nav-section">
            <h3>Enterprise</h3>
            <ul class="nav-links">
                <li><a href="${basePath}enterprise-deployment.html" class="${currentPage === 'enterprise-deployment.html' ? 'active' : ''}"><span class="icon">🏢</span> Deployment Guide</a></li>
                <li><a href="${basePath}compliance-guide.html" class="${currentPage === 'compliance-guide.html' ? 'active' : ''}"><span class="icon">⚖️</span> Compliance Guide</a></li>
                <li><a href="${basePath}use-cases.html" class="${currentPage === 'use-cases.html' ? 'active' : ''}"><span class="icon">🎯</span> Use Cases</a></li>
            </ul>
        </div>

        <div class="nav-section">
            <h3>Support</h3>
            <ul class="nav-links">
                <li><a href="${basePath}faq.html" class="${currentPage === 'faq.html' ? 'active' : ''}"><span class="icon">❓</span> FAQ</a></li>
            </ul>
        </div>

        <div class="nav-section">
            <h3>Acquisition</h3>
            <ul class="nav-links">
                <li><a href="${basePath}acquisition-overview.html"><span class="icon">💼</span> Acquisition Package</a></li>
            </ul>
        </div>
    `;
}

function generateAcquisitionNav(basePath) {
    const currentPage = window.location.pathname.split('/').pop() || 'acquisition-overview.html';

    return `
        <div class="nav-section">
            <h3>Acquisition Package</h3>
            <ul class="nav-links">
                <li><a href="${basePath}acquisition-overview.html" class="${currentPage === 'acquisition-overview.html' ? 'active' : ''}"><span class="icon">📋</span> Overview</a></li>
                <li><a href="${basePath}architecture-overview.html" class="${currentPage === 'architecture-overview.html' ? 'active' : ''}"><span class="icon">🏗️</span> Architecture</a></li>
                <li><a href="${basePath}deployment-checklist.html" class="${currentPage === 'deployment-checklist.html' ? 'active' : ''}"><span class="icon">✅</span> Deployment</a></li>
                <li><a href="${basePath}ip-assignment.html" class="${currentPage === 'ip-assignment.html' ? 'active' : ''}"><span class="icon">⚖️</span> IP Assignment</a></li>
                <li><a href="${basePath}software-license.html" class="${currentPage === 'software-license.html' ? 'active' : ''}"><span class="icon">📄</span> License</a></li>
                <li><a href="${basePath}support-transition.html" class="${currentPage === 'support-transition.html' ? 'active' : ''}"><span class="icon">🔄</span> Support</a></li>
                <li><a href="${basePath}warranties-disclaimers.html" class="${currentPage === 'warranties-disclaimers.html' ? 'active' : ''}"><span class="icon">🛡️</span> Warranties</a></li>
                <li><a href="${basePath}acquisition-process.html" class="${currentPage === 'acquisition-process.html' ? 'active' : ''}"><span class="icon">⚡</span> Process</a></li>
            </ul>
        </div>

        <div class="nav-section">
            <h3>Technical Documentation</h3>
            <ul class="nav-links">
                <li><a href="${basePath}index.html"><span class="icon">📚</span> Back to Docs</a></li>
            </ul>
        </div>
    `;
}

function attachNavigationEvents() {
    // Search functionality
    const searchBox = document.querySelector('.search-box');
    if (searchBox) {
        searchBox.addEventListener('input', function(e) {
            // Implement search functionality here
            console.log('Search:', e.target.value);
        });
    }

    // Mobile menu toggle
    const navToggle = document.querySelector('.nav-toggle');
    if (navToggle) {
        navToggle.addEventListener('click', function() {
            document.querySelector('.docs-sidebar').classList.toggle('active');
        });
    }
}

// Load navigation when DOM is ready
if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', loadGlobalNavigation);
} else {
    loadGlobalNavigation();
}

// Export for module usage if needed
if (typeof module !== 'undefined' && module.exports) {
    module.exports = { loadGlobalNavigation };
}
