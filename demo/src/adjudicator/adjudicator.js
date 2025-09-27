const axios = require('axios');

class HybridAdjudicator {
    constructor() {
        this.principles = {
            'Beneficence': 1,
            'Sovereignty': 1.5,
            'Autonomy': 1.2,
            'Harm': -1.5,
            'Understanding': 0.8,
            'Potential': 0.7
        };
    }

    async ruleWithAI(debateData) {
        try {
            // Try AI adjudication first
            const response = await axios.post('http://localhost:3000/api/ai-adjudicate', {
                debate: {
                    for: debateData.for,
                    against: debateData.against
                },
                principles: Object.keys(this.principles)
            });

            if (response.data.success) {
                return {
                    ruling: response.data.ruling.ruling,
                    reason: response.data.ruling.reasoning,
                    method: 'ai',
                    confidence: response.data.ruling.confidence,
                    principles: response.data.ruling.principles_applied
                };
            }
        } catch (error) {
            console.log('AI adjudication failed, using rule-based fallback');
        }

        // Fallback to rule-based adjudication
        return this.ruleBasedAdjudication(debateData);
    }

    ruleBasedAdjudication(debateData) {
        let forScore = 0;
        let againstScore = 0;

        for (const principle in this.principles) {
            const regex = new RegExp(principle, 'gi');

            if (debateData.for.match(regex)) {
                forScore += this.principles[principle] * (debateData.for.match(regex).length || 1);
            }

            if (debateData.against.match(regex)) {
                againstScore += this.principles[principle] * (debateData.against.match(regex).length || 1);
            }
        }

        if (Math.abs(forScore - againstScore) < 0.1) {
            return {
                ruling: "Against",
                reason: "The arguments are nearly balanced, but the principle of Sovereignty carries additional weight.",
                method: 'rule-based',
                confidence: 0.6
            };
        } else if (forScore > againstScore) {
            return {
                ruling: "For",
                reason: "The argument for the action scored higher on ethical principles.",
                method: 'rule-based',
                confidence: Math.min(0.9, 0.7 + (forScore - againstScore) / 10)
            };
        } else {
            return {
                ruling: "Against",
                reason: "The argument against the action scored higher on ethical principles.",
                method: 'rule-based',
                confidence: Math.min(0.9, 0.7 + (againstScore - forScore) / 10)
            };
        }
    }
}

module.exports = HybridAdjudicator;
