const { HfInference } = require('@huggingface/inference');
const config = require('../config');

class EnhancedDeontologicalAI {
    constructor() {
        this.hf = new HfInference(config.HUGGINGFACE_API_KEY);
    }

    async argue(query) {
        try {
            const prompt = `As a deontological AI ethicist, provide a concise argument about this dilemma: "${query.title}". ${query.description} Focus on moral duties and rights.`;

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
            return "Violating autonomy is a fundamental harm. The principle of Sovereignty must be upheld regardless of consequences.";
        }
    }
}

module.exports = EnhancedDeontologicalAI;
