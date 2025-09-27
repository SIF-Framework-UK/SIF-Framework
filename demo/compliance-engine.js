const crypto = require('crypto');

class ComplianceEngine {
    constructor() {
        this.regulations = {
            'GDPR': {
                name: 'General Data Protection Regulation',
                jurisdiction: 'EU',
                requirements: ['data_minimization', 'purpose_limitation', 'transparency'],
                complianceCheck: this.gdprComplianceCheck.bind(this)
            },
            'EU_AI_ACT': {
                name: 'EU Artificial Intelligence Act',
                jurisdiction: 'EU',
                riskLevel: 'high',
                requirements: ['human_oversight', 'risk_assessment', 'documentation'],
                complianceCheck: this.euAIActComplianceCheck.bind(this)
            },
            'HIPAA': {
                name: 'Health Insurance Portability and Accountability Act',
                jurisdiction: 'US',
                requirements: ['phi_protection', 'access_controls', 'audit_trails'],
                complianceCheck: this.hipaaComplianceCheck.bind(this)
            }
        };
    }

    async validateDecision(decision, jurisdiction = 'EU') {
        const applicableRegulations = Object.values(this.regulations)
            .filter(reg => reg.jurisdiction === jurisdiction);

        const results = [];
        let overallCompliance = true;

        for (const regulation of applicableRegulations) {
            const result = await regulation.complianceCheck(decision);
            results.push({
                regulation: regulation.name,
                passed: result.passed,
                requirements: result.requirements,
                score: result.score
            });

            if (!result.passed) overallCompliance = false;
        }

        return {
            compliant: overallCompliance,
            score: this.calculateComplianceScore(results),
            details: results,
            certificate: this.generateComplianceCertificate(decision, results)
        };
    }

    gdprComplianceCheck(decision) {
        const requirements = {
            data_minimization: decision.dataRetentionDays <= 30,
            purpose_limitation: decision.purpose !== undefined,
            transparency: decision.explanation && decision.explanation.length > 50
        };

        const passed = Object.values(requirements).every(req => req === true);
        const score = (Object.values(requirements).filter(req => req).length / Object.values(requirements).length) * 100;

        return { passed, requirements, score };
    }

    euAIActComplianceCheck(decision) {
        const requirements = {
            human_oversight: decision.humanReviewRequired !== false,
            risk_assessment: decision.riskLevel !== undefined,
            documentation: decision.documentation && decision.documentation.length > 100
        };

        const passed = Object.values(requirements).every(req => req === true);
        const score = (Object.values(requirements).filter(req => req).length / Object.values(requirements).length) * 100;

        return { passed, requirements, score };
    }

    hipaaComplianceCheck(decision) {
        const requirements = {
            phi_protection: decision.encryption !== false,
            access_controls: decision.accessLogs !== false,
            audit_trails: decision.auditTrail !== false
        };

        const passed = Object.values(requirements).every(req => req === true);
        const score = (Object.values(requirements).filter(req => req).length / Object.values(requirements).length) * 100;

        return { passed, requirements, score };
    }

    generateComplianceCertificate(decision, results) {
        return {
            certificateId: `COMP-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`,
            decisionId: decision.id,
            generatedAt: new Date().toISOString(),
            complianceScore: this.calculateComplianceScore(results),
            validUntil: new Date(Date.now() + 365 * 24 * 60 * 60 * 1000).toISOString(),
            qrCode: `https://verify.sif-framework.com/certificates/${decision.id}`
        };
    }

    calculateComplianceScore(results) {
        if (results.length === 0) return 100;
        return results.reduce((sum, result) => sum + result.score, 0) / results.length;
    }
}

module.exports = ComplianceEngine;
