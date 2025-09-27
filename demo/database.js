const sqlite3 = require('sqlite3').verbose();

class Database {
    constructor() {
        this.db = new sqlite3.Database(':memory:'); // Start with in-memory, then move to file
        this.init();
    }

    init() {
        this.db.run(`
            CREATE TABLE IF NOT EXISTS ledger_entries (
                cid TEXT PRIMARY KEY,
                previous_cid TEXT,
                data TEXT,
                timestamp TEXT,
                type TEXT
            )
        `);
    }

    async addEntry(entry) {
        return new Promise((resolve, reject) => {
            this.db.run(
                `INSERT INTO ledger_entries (cid, previous_cid, data, timestamp, type)
                 VALUES (?, ?, ?, ?, ?)`,
                [entry.cid, entry.previousCID, JSON.stringify(entry.data), entry.timestamp, entry.data.type],
                function(err) {
                    if (err) reject(err);
                    else resolve(entry);
                }
            );
        });
    }

    async getEntry(cid) {
        return new Promise((resolve, reject) => {
            this.db.get(
                `SELECT * FROM ledger_entries WHERE cid = ?`,
                [cid],
                (err, row) => {
                    if (err) reject(err);
                    else resolve(row ? {
                        cid: row.cid,
                        previousCID: row.previous_cid,
                        data: JSON.parse(row.data),
                        timestamp: row.timestamp
                    } : null);
                }
            );
        });
    }
}

module.exports = Database;
