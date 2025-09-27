const crypto = require('crypto');

class SimpleLedger {
    constructor() {
        this.chain = [];
    }

    createCID(data) {
        return crypto.createHash('sha256').update(data).digest('hex');
    }

    addEntry(entryData) {
        const previousCID = this.chain.length > 0 ? this.chain[this.chain.length - 1].cid : null;
        const dataString = JSON.stringify(entryData) + previousCID;
        const cid = this.createCID(dataString);

        const entry = {
            cid: cid,
            previousCID: previousCID,
            data: entryData,
            timestamp: new Date().toISOString()
        };

        this.chain.push(entry);
        return entry;
    }

    getEntry(cid) {
        return this.chain.find(entry => entry.cid === cid);
    }

    verifyChain() {
        for (let i = 1; i < this.chain.length; i++) {
            const currentEntry = this.chain[i];
            const dataString = JSON.stringify(currentEntry.data) + currentEntry.previousCID;
            const calculatedCID = this.createCID(dataString);

            if (calculatedCID !== currentEntry.cid) {
                return false;
            }
        }
        return true;
    }
}

module.exports = SimpleLedger;
