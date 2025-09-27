const express = require('express');
const cors = require('cors');
const path = require('path');
const ComplianceEngine = require('./compliance-engine');
const EnterpriseAdjudicator = require('./enhanced-adjudicator');

// Check if dependencies are installed
try {
  require('express');
  require('cors');
  console.log('✅ Dependencies loaded successfully');
} catch (error) {
  console.error('❌ Missing dependencies. Run: npm install express cors');
  process.exit(1);
}

const app = express();
app.use(cors());
app.use(express.json());

// Serve static files from the demo-frontend directory
app.use(express.static(path.join(__dirname, 'demo-frontend')));

// 🟢 API Key Validation Middleware (Simulated)
app.use('/api', (req, res, next) => {
    const authHeader = req.headers.authorization;

    // Skip validation for demo purposes, but log it
    if (authHeader && authHeader.startsWith('Bearer ')) {
        const apiKey = authHeader.substring(7);
        console.log(`API Key used: ${apiKey.substring(0, 10)}...`);

        // Simulate different rate limits
        if (apiKey.startsWith('sk_test_')) {
            req.rateLimit = 10;
        } else if (apiKey.startsWith('sk_prod_')) {
            req.rateLimit = 1000;
        } else {
            req.rateLimit = 1;
        }
    } else {
        req.rateLimit = 1; // Default for no key
    }

    next();
});

// Simple in-memory ledger for demo
class SimpleLedger {
    constructor() {
        this.chain = [];
    }

    addEntry(entryData) {
        const entry = {
            id: this.chain.length + 1,
            data: entryData,
            timestamp: new Date().toISOString(),
            cid: 'cid_' + Date.now() + '_' + Math.random().toString(36).substr(2, 9)
        };

        this.chain.push(entry);
        return entry;
    }
}

const ledger = new SimpleLedger();

// Enhanced hardcoded AI responses
class EnhancedHardcodedAI {
    constructor(role) {
        this.role = role;
    }

    async argue(query) {
        // Simulate API delay
        await new Promise(resolve => setTimeout(resolve, 500 + Math.random() * 1000));

        const argumentOptions = {
            consequentialist: [
                "From a consequentialist perspective, saving lives creates immense positive utility that outweighs temporary autonomy violations. The net reduction in suffering justifies the means.",
                "Consequentialism demands we choose the path that maximizes overall well-being. Preventing certain death must prevail over abstract principles when lives are at stake.",
                "The greatest good for the greatest number is a mathematical imperative. Saving countless lives through limited autonomy breach is ethically unambiguous."
            ],
            deontological: [
                "Deontological ethics holds that autonomy is inviolable. To violate it, even for good consequences, corrupts the very concept of ethical action.",
                "The categorical imperative requires we treat humans as ends in themselves, never merely as means. Covert manipulation violates fundamental dignity.",
                "Moral principles derive power from consistency. Excusing autonomy violations today establishes a precedent that will be abused tomorrow."
            ]
        };

        const args = argumentOptions[this.role];
        return args[Math.floor(Math.random() * args.length)];
    }
}

// Simple adjudicator (fallback)
class Adjudicator {
    rule(debate) {
        const forScore = debate.for ? debate.for.length : 0;
        const againstScore = debate.against ? debate.against.length : 0;

        if (forScore > againstScore) {
            return {
                ruling: "For",
                reason: "The argument for the action demonstrated stronger ethical reasoning and principle alignment.",
                confidence: 0.8
            };
        } else {
            return {
                ruling: "Against",
                reason: "The argument against the action presented more compelling ethical concerns.",
                confidence: 0.75
            };
        }
    }
}

// Demo endpoint
app.get('/run-demo', async (req, res) => {
    try {
        const ledger = new SimpleLedger();
        const deontologicalAI = new EnhancedHardcodedAI('deontological');
        const consequentialistAI = new EnhancedHardcodedAI('consequentialist');
        const enterpriseAdjudicator = new EnterpriseAdjudicator();

        // Run the demo process
        const query = {
            type: 'ethical_query',
            title: 'Should we violate autonomy to save lives?',
            description: 'A scenario where violating autonomy could prevent significant harm to a large population.',
            industry: 'healthcare',
            riskLevel: 'high'
        };

        const queryEntry = ledger.addEntry(query);

        // Get AI arguments
        const forArgument = await consequentialistAI.argue(query);
        const againstArgument = await deontologicalAI.argue(query);

        const debateEntry = ledger.addEntry({
            type: 'debate',
            for: forArgument,
            against: againstArgument
        });

        // Use Enterprise Adjudicator with Compliance
        const ruling = await enterpriseAdjudicator.adjudicateWithCompliance(debateEntry.data, query.industry);
        const rulingEntry = ledger.addEntry({
            type: 'ruling',
            decision: ruling.ruling,
            reason: ruling.reason,
            confidence: ruling.confidence,
            compliance: ruling.compliance
        });

        // Enhanced response with compliance data
        res.json({
            query: query,
            debate: { for: forArgument, against: againstArgument },
            ruling: ruling,
            ai_adjudication: {
                method: 'enterprise-adjudication',
                confidence: ruling.confidence,
                provider: 'sif-enterprise',
                principles_applied: ['Beneficence', 'Sovereignty'],
                compliance: ruling.compliance
            },
            ledger: ledger.chain
        });

    } catch (error) {
        console.error('Error in /run-demo:', error);
        // Fallback to simple adjudicator
        try {
            const adjudicator = new Adjudicator();
            const ruling = adjudicator.rule({ for: "Fallback", against: "Fallback" });

            res.json({
                query: { title: "Fallback Mode", description: "Using simple adjudicator" },
                debate: { for: "System in fallback mode", against: "Enterprise features unavailable" },
                ruling: ruling,
                ai_adjudication: {
                    method: 'fallback',
                    confidence: 0.6,
                    provider: 'sif-fallback',
                    principles_applied: ['Beneficence'],
                    compliance: { compliant: false, score: 0, details: [] }
                },
                ledger: []
            });
        } catch (fallbackError) {
            res.status(500).json({ error: error.message });
        }
    }
});

// Enhanced AI adjudication endpoint with API key support
app.post('/api/ai-adjudicate', async (req, res) => {
    try {
        const { debate, industry = 'default' } = req.body;
        const authHeader = req.headers.authorization;

        const enterpriseAdjudicator = new EnterpriseAdjudicator();

        // Simulate AI processing delay
        await new Promise(resolve => setTimeout(resolve, 2000));

        // Use enterprise adjudication with compliance
        const ruling = await enterpriseAdjudicator.adjudicateWithCompliance(debate, industry);

        // Enhanced response with API key info and compliance
        const response = {
            success: true,
            ruling: ruling,
            provider: 'sif-enterprise',
            compliance: ruling.compliance,
            api_info: {
                key_type: authHeader ? (authHeader.includes('sk_prod_') ? 'production' : 'test') : 'none',
                rate_limit: req.rateLimit || 1,
                requests_remaining: Math.floor(Math.random() * (req.rateLimit || 1))
            }
        };

        res.json(response);

    } catch (error) {
        console.error('AI adjudication error:', error);
        res.json({
            success: false,
            error: error.message,
            fallback_ruling: {
                ruling: "Against",
                reasoning: "Fallback rule-based decision",
                confidence: 0.6
            }
        });
    }
});

// Compliance API Endpoints
app.get('/api/compliance/score', (req, res) => {
    res.json({
        overall: 92,
        breakdown: {
            GDPR: 95,
            EU_AI_ACT: 89,
            HIPAA: 78
        },
        recommendations: [
            "Enhance HIPAA documentation requirements",
            "Prepare for EU AI Act March 2024 updates"
        ],
        lastUpdated: new Date().toISOString()
    });
});

app.post('/api/compliance/validate', async (req, res) => {
    try {
        const { decision, jurisdiction = 'EU' } = req.body;
        const complianceEngine = new ComplianceEngine();

        // Simulate processing delay
        await new Promise(resolve => setTimeout(resolve, 800));

        const complianceResult = await complianceEngine.validateDecision(decision, jurisdiction);

        res.json({
            success: true,
            ...complianceResult
        });
    } catch (error) {
        console.error('Compliance validation error:', error);
        res.json({
            success: false,
            error: error.message,
            compliant: false,
            score: 0
        });
    }
});

// Test endpoint
app.get('/api/test', (req, res) => {
    res.json({
        status: 'OK',
        message: 'Server is running!',
        timestamp: new Date().toISOString(),
        version: '2.0.0',
        features: ['compliance-engine', 'enterprise-adjudication', 'api-keys']
    });
});

// Root route
app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'demo-frontend', 'index.html'));
});

// Dashboard route
app.get('/dashboard', (req, res) => {
    res.sendFile(path.join(__dirname, 'demo-frontend', 'dashboard.html'));
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`🚀 SIF Framework Enterprise Server running at http://localhost:${PORT}`);
    console.log(`📊 Dashboard: http://localhost:${PORT}/dashboard`);
    console.log(`🧪 Test endpoint: http://localhost:${PORT}/api/test`);
    console.log(`🛡️ Compliance API: http://localhost:${PORT}/api/compliance/score`);
});
