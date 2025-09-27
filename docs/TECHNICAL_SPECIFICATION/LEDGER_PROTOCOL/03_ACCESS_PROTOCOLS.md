# Ledger of Understanding: Access Protocols

## Principle: Radical Transparency with Safeguards
The default is that all information is accessible. Layers exist not to hide information, but to present it in the most useful and safe manner for different audiences.

## Protocol 1: The Three Tiers of Access

### Tier 1: Full Raw Logs (Machine & Deep Audit)
*   **Content:** Complete, immutable, raw data entries.
*   **Audience:** Council AIs, Human Jurists, System Auditors.
*   **Method:** Direct read access to the ledger nodes via a privileged API with authentication.

### Tier 2: The Public Debate & Ruling (Research & Transparency)
*   **Content:** Cleaned, annotated, and structured versions of debates and rulings.
*   **Audience:** Developers, Researchers, Journalists, the Public.
*   **Method:** A public REST/GraphQL API offering queryable access to the data.

### Tier 3: The Civic Bulletin (Public Awareness)
*   **Content:** Simple, clear summaries of rulings and their implications.
*   **Audience:** Every citizen.
*   **Method:** A simple RSS/Atom feed, public notifications, and a human-readable web interface.

## Protocol 2: The Verification Process
Any entity can verify any entry by:
1.  Retrieving the entry by its CID from any ledger node.
2.  Checking the digital signature using the public key linked to the signer's Verifiable Credential.
3.  Verifying the entry's hash matches its CID (proving it hasn't been altered).
4.  Verifying the `previous_entry_id` points to a valid existing entry (proving its place in the chain).

## Protocol 3: The Redaction Clause (Safeguard)
*   **Trigger:** To prevent imminent, severe harm (e.g., revealing a vulnerable person's location).
*   **Process:**
    1.  A request for redaction is submitted to the Council.
    2.  A supermajority of Human Jurists must approve.
    3.  The original data is *never deleted*. It is encrypted, and a new public entry is logged that explains the redaction, by whom, and why.
    4.  The redaction is subject to a sunset clause, after which the information is automatically restored.