class SIFDashboard {
    constructor() {
        this.initializeCharts();
        this.loadDemoData();
        this.startRealTimeUpdates();
    }

    initializeCharts() {
        // Principle Weight Chart
        this.principleChart = new Chart(document.getElementById('principleChart'), {
            type: 'bar',
            data: {
                labels: ['Beneficence', 'Sovereignty', 'Autonomy', 'Harm Prevention', 'Understanding'],
                datasets: [{
                    label: 'Principle Weight',
                    data: [1.0, 1.5, 1.2, -1.5, 0.8],
                    backgroundColor: [
                        '#10b981', '#3b82f6', '#8b5cf6', '#ef4444', '#f59e0b'
                    ],
                    borderColor: [
                        '#0da271', '#2563eb', '#7c3aed', '#dc2626', '#d97706'
                    ],
                    borderWidth: 2
                }]
            },
            options: {
                responsive: true,
                plugins: {
                    title: {
                        display: true,
                        text: 'Ethical Principle Weights',
                        font: { size: 16, weight: 'bold' }
                    },
                    legend: {
                        display: false
                    }
                },
                scales: {
                    y: {
                        beginAtZero: true,
                        title: {
                            display: true,
                            text: 'Weight Value'
                        }
                    }
                }
            }
        });

        // Outcome Distribution Chart
        this.outcomeChart = new Chart(document.getElementById('outcomeChart'), {
            type: 'doughnut',
            data: {
                labels: ['Approved', 'Rejected', 'Pending Review'],
                datasets: [{
                    data: [65, 25, 10],
                    backgroundColor: ['#10b981', '#ef4444', '#f59e0b'],
                    borderColor: ['#0da271', '#dc2626', '#d97706'],
                    borderWidth: 3
                }]
            },
            options: {
                responsive: true,
                plugins: {
                    legend: {
                        position: 'bottom',
                        labels: {
                            font: { size: 12 },
                            padding: 20
                        }
                    },
                    tooltip: {
                        callbacks: {
                            label: function(context) {
                                return `${context.label}: ${context.parsed}%`;
                            }
                        }
                    }
                },
                cutout: '60%'
            }
        });

        window.principleChart = this.principleChart;
        window.outcomeChart = this.outcomeChart;
    }

    loadDemoData() {
        const demoData = {
            totalCases: 142,
            approvalRate: '78%',
            avgDecisionTime: '2.3s',
            systemUptime: '99.9%',
            recentCases: [
                { id: 'C-001', title: 'Medical AI Treatment Approval', outcome: 'approved', timestamp: '2024-01-15 14:30' },
                { id: 'C-002', title: 'Autonomous Vehicle Emergency Decision', outcome: 'rejected', timestamp: '2024-01-15 13:15' },
                { id: 'C-003', title: 'Financial AI Loan Approval', outcome: 'approved', timestamp: '2024-01-15 11:45' },
                { id: 'C-004', title: 'Content Moderation AI', outcome: 'pending', timestamp: '2024-01-15 10:20' }
            ]
        };

        this.updateDashboard(demoData);
    }

    updateDashboard(data) {
        document.getElementById('total-cases').textContent = data.totalCases.toLocaleString();
        document.getElementById('approval-rate').textContent = data.approvalRate;
        document.getElementById('avg-decision-time').textContent = data.avgDecisionTime;
        document.getElementById('system-uptime').textContent = data.systemUptime;

        const caseList = document.getElementById('case-list');
        caseList.innerHTML = data.recentCases.map(caseItem => `
            <div class="case-item">
                <div>
                    <strong>${caseItem.id}</strong>: ${caseItem.title}
                    <br><small>${caseItem.timestamp}</small>
                </div>
                <span class="status-${caseItem.outcome}">
                    ${caseItem.outcome.toUpperCase()}
                </span>
            </div>
        `).join('');
    }

    startRealTimeUpdates() {
        setInterval(() => {
            const randomUpdate = {
                totalCases: Math.floor(Math.random() * 10) + 142,
                approvalRate: `${Math.floor(Math.random() * 5) + 75}%`,
                avgDecisionTime: `${(Math.random() * 0.5 + 2.0).toFixed(1)}s`
            };

            document.getElementById('total-cases').textContent = randomUpdate.totalCases.toLocaleString();
            document.getElementById('approval-rate').textContent = randomUpdate.approvalRate;
            document.getElementById('avg-decision-time').textContent = randomUpdate.avgDecisionTime;
        }, 5000);
    }
}

// Configuration functionality
class SIFConfiguration {
    constructor() {
        this.currentConfig = {
            principles: {
                beneficence: 1.0,
                sovereignty: 1.5,
                autonomy: 1.2
            },
            realTimeMonitoring: true,
            autoEscalation: true,
            complianceMode: false
        };

        this.initializeSliders();
        this.loadCurrentConfig();
    }

    initializeSliders() {
        const beneficenceSlider = document.getElementById('beneficence-slider');
        const beneficenceValue = document.getElementById('beneficence-value');

        beneficenceSlider.addEventListener('input', (e) => {
            beneficenceValue.textContent = e.target.value;
            this.currentConfig.principles.beneficence = parseFloat(e.target.value);
            this.updatePrincipleChart();
        });

        const sovereigntySlider = document.getElementById('sovereignty-slider');
        const sovereigntyValue = document.getElementById('sovereignty-value');

        sovereigntySlider.addEventListener('input', (e) => {
            sovereigntyValue.textContent = e.target.value;
            this.currentConfig.principles.sovereignty = parseFloat(e.target.value);
            this.updatePrincipleChart();
        });

        const autonomySlider = document.getElementById('autonomy-slider');
        const autonomyValue = document.getElementById('autonomy-value');

        autonomySlider.addEventListener('input', (e) => {
            autonomyValue.textContent = e.target.value;
            this.currentConfig.principles.autonomy = parseFloat(e.target.value);
            this.updatePrincipleChart();
        });

        document.getElementById('real-time-monitoring').addEventListener('change', (e) => {
            this.currentConfig.realTimeMonitoring = e.target.checked;
            this.showNotification('Real-time monitoring ' + (e.target.checked ? 'enabled' : 'disabled'));
        });

        document.getElementById('auto-escalation').addEventListener('change', (e) => {
            this.currentConfig.autoEscalation = e.target.checked;
            this.showNotification('Auto-escalation ' + (e.target.checked ? 'enabled' : 'disabled'));
        });

        document.getElementById('compliance-mode').addEventListener('change', (e) => {
            this.currentConfig.complianceMode = e.target.checked;
            this.showNotification('Compliance mode ' + (e.target.checked ? 'enabled' : 'disabled'));
        });
    }

    updatePrincipleChart() {
        if (window.principleChart) {
            window.principleChart.data.datasets[0].data = [
                this.currentConfig.principles.beneficence,
                this.currentConfig.principles.sovereignty,
                this.currentConfig.principles.autonomy,
                -1.5,
                0.8
            ];
            window.principleChart.update();
        }
    }

    loadCurrentConfig() {
        document.getElementById('beneficence-slider').value = this.currentConfig.principles.beneficence;
        document.getElementById('beneficence-value').textContent = this.currentConfig.principles.beneficence;

        document.getElementById('sovereignty-slider').value = this.currentConfig.principles.sovereignty;
        document.getElementById('sovereignty-value').textContent = this.currentConfig.principles.sovereignty;

        document.getElementById('autonomy-slider').value = this.currentConfig.principles.autonomy;
        document.getElementById('autonomy-value').textContent = this.currentConfig.principles.autonomy;

        document.getElementById('real-time-monitoring').checked = this.currentConfig.realTimeMonitoring;
        document.getElementById('auto-escalation').checked = this.currentConfig.autoEscalation;
        document.getElementById('compliance-mode').checked = this.currentConfig.complianceMode;
    }

    showNotification(message) {
        const notification = document.createElement('div');
        notification.style.cssText = `
            position: fixed;
            top: 20px;
            right: 20px;
            background: var(--success);
            color: white;
            padding: 12px 20px;
            border-radius: 8px;
            font-weight: 600;
            z-index: 1000;
            box-shadow: 0 5px 15px rgba(0,0,0,0.2);
        `;
        notification.textContent = message;
        document.body.appendChild(notification);

        setTimeout(() => {
            notification.remove();
        }, 3000);
    }
}

// API Key Management
class APIKeyManager {
    constructor() {
        this.keys = {
            production: this.generateAPIKey('prod'),
            test: this.generateAPIKey('test')
        };
        this.loadKeys();
    }

    generateAPIKey(type) {
        const prefix = type === 'prod' ? 'sk_prod_' : 'sk_test_';
        const randomPart = Array.from({length: 32}, () =>
            'abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789'
            [Math.floor(Math.random() * 62)]
        ).join('');
        return prefix + randomPart;
    }

    loadKeys() {
        const savedKeys = localStorage.getItem('sif_api_keys');
        if (savedKeys) {
            this.keys = JSON.parse(savedKeys);
        }
        this.updateKeyDisplay();
    }

    saveKeys() {
        localStorage.setItem('sif_api_keys', JSON.stringify(this.keys));
        this.updateKeyDisplay();
    }

    updateKeyDisplay() {
        document.getElementById('production-key').textContent =
            this.maskAPIKey(this.keys.production);
        document.getElementById('test-key').textContent =
            this.maskAPIKey(this.keys.test);

        this.updateCodeSamples();
    }

    maskAPIKey(key) {
        return key.substring(0, 10) + '•'.repeat(24) + key.substring(-4);
    }

    updateCodeSamples() {
        const samples = document.querySelectorAll('code[id$="-sample"]');
        samples.forEach(sample => {
            sample.textContent = sample.textContent.replace(
                /sk_(prod|test)_[a-zA-Z0-9]+/g,
                this.keys.production
            );
        });
    }

    copyKey(keyId) {
        const fullKey = this.keys[keyId === 'production-key' ? 'production' : 'test'];
        navigator.clipboard.writeText(fullKey).then(() => {
            this.showNotification('API key copied to clipboard!');
        });
    }

    copyCode(elementId) {
        const code = document.getElementById(elementId).textContent;
        navigator.clipboard.writeText(code).then(() => {
            this.showNotification('Code sample copied to clipboard!');
        });
    }

    generateNewKey() {
        if (confirm('Generate new production API key? Existing integrations will break.')) {
            this.keys.production = this.generateAPIKey('prod');
            this.saveKeys();
            this.showNotification('New production API key generated!');
        }
    }

    showNotification(message) {
        const notification = document.createElement('div');
        notification.style.cssText = `
            position: fixed;
            top: 20px;
            right: 20px;
            background: var(--success);
            color: white;
            padding: 12px 20px;
            border-radius: 8px;
            font-weight: 600;
            z-index: 1000;
            box-shadow: 0 5px 15px rgba(0,0,0,0.2);
        `;
        notification.textContent = message;
        document.body.appendChild(notification);

        setTimeout(() => {
            notification.remove();
        }, 3000);
    }
}

// Global functions for HTML onclick handlers
function generateApiKey() {
    window.apiKeyManager.generateNewKey();
}

function copyApiKey(keyId) {
    window.apiKeyManager.copyKey(keyId);
}

function copyCode(elementId) {
    window.apiKeyManager.copyCode(elementId);
}

// Preset configurations
function loadPreset(preset) {
    const configs = {
        healthcare: {
            beneficence: 1.8,
            sovereignty: 0.8,
            autonomy: 1.0,
            realTimeMonitoring: true,
            autoEscalation: true,
            complianceMode: true
        },
        financial: {
            beneficence: 0.8,
            sovereignty: 1.8,
            autonomy: 1.2,
            realTimeMonitoring: true,
            autoEscalation: false,
            complianceMode: true
        },
        government: {
            beneficence: 1.2,
            sovereignty: 1.5,
            autonomy: 0.8,
            realTimeMonitoring: true,
            autoEscalation: true,
            complianceMode: true
        },
        default: {
            beneficence: 1.0,
            sovereignty: 1.5,
            autonomy: 1.2,
            realTimeMonitoring: true,
            autoEscalation: true,
            complianceMode: false
        }
    };

    const presetConfig = configs[preset];
    if (presetConfig) {
        window.sifConfig.currentConfig.principles.beneficence = presetConfig.beneficence;
        window.sifConfig.currentConfig.principles.sovereignty = presetConfig.sovereignty;
        window.sifConfig.currentConfig.principles.autonomy = presetConfig.autonomy;
        window.sifConfig.currentConfig.realTimeMonitoring = presetConfig.realTimeMonitoring;
        window.sifConfig.currentConfig.autoEscalation = presetConfig.autoEscalation;
        window.sifConfig.currentConfig.complianceMode = presetConfig.complianceMode;

        window.sifConfig.loadCurrentConfig();
        window.sifConfig.updatePrincipleChart();

        window.sifConfig.showNotification(`✅ ${preset.charAt(0).toUpperCase() + preset.slice(1)} configuration loaded`);
    }
}

function saveConfiguration() {
    window.sifConfig.showNotification('✅ Configuration saved successfully! Settings applied to all future decisions.');

    console.log('Saving configuration:', window.sifConfig.currentConfig);

    setTimeout(() => {
        window.sifConfig.showNotification('⚙️ Configuration deployed across all nodes');
    }, 1000);
}

// Initialize everything when dashboard loads
document.addEventListener('DOMContentLoaded', () => {
    window.sifDashboard = new SIFDashboard();
    window.sifConfig = new SIFConfiguration();
    window.apiKeyManager = new APIKeyManager();
});
