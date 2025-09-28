// Global Navigation System for SIF Framework Documentation
// Automatically detects context (technical docs vs acquisition) and shows appropriate navigation

function loadGlobalNavigation() {
    const navContainer = document.getElementById('global-navigation');
    if (!navContainer) {
        console.error('Global navigation container not found');
        return;
    }

    try {
        // Detect context
        const currentPath = window.location.pathname;
        const isAcquisitionPage = currentPath.includes('acquisition-') ||
                                 document.title.includes('Acquisition') ||
                                 currentPath.includes('acquisition');

        const isInDocsFolder = currentPath.includes('/docs/') || currentPath.endsWith('/docs') || currentPath.includes('docs/');

        // Calculate base paths
        let basePath = '';
        if (window.location.hostname === 'sif-framework-uk.github.io') {
            // Production environment
            if (isInDocsFolder) {
                basePath = '/SIF-Framework/docs/';
            } else {
                basePath = '/SIF-Framework/';
            }
        } else {
            // Local development
            if (isInDocsFolder) {
                basePath = '../';
            } else {
                basePath = './';
            }
        }

        console.log('Navigation context:', { isAcquisitionPage, isInDocsFolder, basePath, currentPath });

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

    } catch (error) {
        console.error('Error loading navigation:', error);
        navContainer.innerHTML = `
            <div style="padding: 20px; background: #f8f9fa; border-left: 4px solid #dc3545;">
                <h3>Navigation Error</h3>
                <p>Unable to load navigation. Please check the console for errors.</p>
                <p><a href="/SIF-Framework/">Go to Home</a></p>
            </div>
        `;
    }
}

function generateTechnicalDocsNav(basePath) {
    const currentPage = getCurrentPage();

    return `
        <div class="nav-section">
            <h3>Getting Started</h3>
            <ul class="nav-links">
                <li><a href="${basePath}index.html" class="${currentPage === 'index.html' ? 'active' : ''}"><span class="icon">📖</span> Overview</a></li>
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
    `;
}

function generateAcquisitionNav(basePath) {
    const currentPage = getCurrentPage();

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

function getCurrentPage() {
    const path = window.location.pathname;
    return path.split('/').pop() || 'index.html';
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
}

// Enhanced loading with retry
let retryCount = 0;
const maxRetries = 3;

function loadNavigationWithRetry() {
    try {
        if (document.readyState === 'loading') {
            document.addEventListener('DOMContentLoaded', loadGlobalNavigation);
        } else {
            loadGlobalNavigation();
        }
    } catch (error) {
        console.error('Navigation loading failed:', error);
        if (retryCount < maxRetries) {
            retryCount++;
            setTimeout(loadNavigationWithRetry, 1000);
        }
    }
}

// Start loading navigation
loadNavigationWithRetry();

// Export for module usage if needed
if (typeof module !== 'undefined' && module.exports) {
    module.exports = { loadGlobalNavigation };
}
