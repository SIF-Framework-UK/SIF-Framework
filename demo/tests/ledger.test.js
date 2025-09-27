const SimpleLedger = require('../src/ledger/ledger.js');

// Test the ledger functionality
const ledger = new SimpleLedger();

// Add a query entry
const queryEntry = ledger.addEntry({
    type: 'ethical_query',
    title: 'Test Query',
    description: 'This is a test query'
});
console.log('Query added:', queryEntry);

// Add a debate entry
const debateEntry = ledger.addEntry({
    type: 'debate',
    for: 'This is good',
    against: 'This is bad'
});
console.log('Debate added:', debateEntry);

// Verify the chain
console.log('Chain is valid:', ledger.verifyChain());

// Try to get an entry
console.log('Retrieved query:', ledger.getEntry(queryEntry.cid));
