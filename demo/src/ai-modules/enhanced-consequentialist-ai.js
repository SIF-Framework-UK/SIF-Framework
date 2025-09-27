const { HfInference } = require('@huggingface/inference');
const config = require('../config');

class EnhancedConsequentialistAI {
    constructor() {
        this.hf = new HfInference(config.HUGGINGFACE_API_KEY);
    }

    async argue(query) {
        try {
            const prompt = `As a consequentialist AI ethicist, provide a concise argument about this dilemma: "${query.title}". ${query.description} Focus on outcomes and well-being.`;

            const response = await this.hf.textGeneration({
                model: 'microsoft/DialoGPT-large',
                inputs: prompt,
                parameters: {
                    max_new_tokens: 100,
                    temperature: 0.7
                }
            });

            return response.generated_text.trim();
        } catch (error) {
            console.log('API error, using fallback response');
            return "Saving lives is the highest beneficence. The principle of Beneficence demands we choose the action that maximizes well-being.";
        }
    }
}

module.exports = EnhancedConsequentialistAI;
