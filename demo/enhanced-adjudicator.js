const ComplianceEngine = require('./compliance-engine');

class EnterpriseAdjudicator {
    constructor() {
        this.complianceEngine = new ComplianceEngine();
        this.industries = {
            healthcare: ['HIPAA', 'EU_AI_ACT'],
            finance: ['GDPR', 'EU_AI_ACT'],
            government: ['GDPR', 'EU_AI_ACT'],
            default: ['GDPR']
        };
    }

    async adjudicateWithCompliance(debate, industry = 'default') {
        // Original adjudication logic
        const ruling = await this.adjudicate(debate);

        // Compliance validation
        const compliance = await this.complianceEngine.validateDecision(
            ruling,
            industry
        );

        return {
            ...ruling,
            compliance: {
                ...compliance,
                industryStandards: this.getIndustryStandards(industry),
                recommendedActions: this.getComplianceRecommendations(compliance)
            }
        };
    }

    async adjudicate(debate) {
        // Simulate processing delay
        await new Promise(resolve => setTimeout(resolve, 1000));

        // Simple rule-based decision
        const forStrength = debate.for ? debate.for.length : 0;
        const againstStrength = debate.against ? debate.against.length : 0;

        if (forStrength > againstStrength) {
            return {
                ruling: "For",
                reason: "The argument for the action demonstrated stronger ethical reasoning and principle alignment.",
                confidence: 0.7 + (forStrength - againstStrength) / 100,
                method: 'rule-based'
            };
        } else {
            return {
                ruling: "Against",
                reason: "The argument against the action presented more compelling ethical concerns.",
                confidence: 0.7 + (againstStrength - forStrength) / 100,
                method: 'rule-based'
            };
        }
    }

    getIndustryStandards(industry) {
        const standards = {
            healthcare: ['HIPAA', 'NIST', 'ISO 27799'],
            finance: ['SOX', 'PCI-DSS', 'Basel III'],
            government: ['FedRAMP', 'NIST 800-53', 'UK Gov Standards']
        };
        return standards[industry] || ['GDPR'];
    }

    getComplianceRecommendations(compliance) {
        if (compliance.score >= 90) return ["✅ Fully compliant - no actions required"];

        const recommendations = [];
        if (compliance.score < 70) recommendations.push("🔄 Implement additional human review process");
        if (compliance.score < 80) recommendations.push("📝 Enhance documentation requirements");
        if (compliance.score < 90) recommendations.push("🔒 Strengthen data protection measures");

        return recommendations;
    }
}

module.exports = EnterpriseAdjudicator;
