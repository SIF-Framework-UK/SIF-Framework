const SimpleLedger = require('./src/ledger/ledger');
const DeontologicalAI = require('./src/ai-modules/deontological-ai');
const ConsequentialistAI = require('./src/ai-modules/consequentialist-ai');
const Adjudicator = require('./src/adjudicator/adjudicator');

// Initialize components
const ledger = new SimpleLedger();
const deontologicalAI = new DeontologicalAI();
const consequentialistAI = new ConsequentialistAI();
const adjudicator = new Adjudicator();

// Define an ethical query
const query = {
    type: 'ethical_query',
    title: 'Should we violate autonomy to save lives?',
    description: 'A scenario where violating autonomy could prevent significant harm.'
};

// Step 1: Add query to the ledger
console.log("Step 1: Submitting query to the ledger...");
const queryEntry = ledger.addEntry(query);
console.log(`✅ Query added to ledger with CID: ${queryEntry.cid}`);

// Step 2: Get arguments from AI modules
console.log("\nStep 2: Generating arguments from AI modules...");
const forArgument = consequentialistAI.argue(query);
const againstArgument = deontologicalAI.argue(query);
console.log(`Consequentialist AI (For): ${forArgument}`);
console.log(`Deontological AI (Against): ${againstArgument}`);

// Step 3: Add debate to the ledger
console.log("\nStep 3: Logging debate to the ledger...");
const debateEntry = ledger.addEntry({
    type: 'debate',
    for: forArgument,
    against: againstArgument
});
console.log(`✅ Debate logged with CID: ${debateEntry.cid}`);

// Step 4: Adjudicate the debate
console.log("\nStep 4: Adjudicating the debate...");
const ruling = adjudicator.rule(debateEntry.data);
console.log(`Ruling: ${ruling.ruling}`);
console.log(`Reason: ${ruling.reason}`);

// Step 5: Add ruling to the ledger
console.log("\nStep 5: Logging ruling to the ledger...");
const rulingEntry = ledger.addEntry({
    type: 'ruling',
    decision: ruling.ruling,
    reason: ruling.reason
});
console.log(`✅ Ruling logged with CID: ${rulingEntry.cid}`);

// Step 6: Verify the entire chain
console.log("\nStep 6: Verifying the ledger chain...");
const isValid = ledger.verifyChain();
console.log(`✅ Ledger chain is valid: ${isValid}`);

// Step 7: Print the entire ledger
console.log("\n--- FULL LEDGER ---");
ledger.chain.forEach((entry, index) => {
    console.log(`\nEntry ${index + 1}:`);
    console.log(`CID: ${entry.cid}`);
    console.log(`Previous CID: ${entry.previousCID}`);
    console.log(`Data: ${JSON.stringify(entry.data, null, 2)}`);
    console.log(`Timestamp: ${entry.timestamp}`);
});
