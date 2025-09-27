# Ledger of Understanding: Data Schemas

This document defines the precise structure of data entries stored on the Ledger. The authoritative, machine-readable versions of these schemas are stored in the `/schemas/` directory in JSON Schema format.

## Schema: EthicalQueryEntry
*   **Purpose:** The initial formal submission of an ethical dilemma.
*   **Machine-Readable Schema:** [EthicalQueryEntry.schema.json](./schemas/EthicalQueryEntry.schema.json)
*   **Key Fields:** `entry_id (CID)`, `previous_entry_id (CID)`, `originator_id (DID)`, `originator_sig`, `query_title`, `query_description`, `conflicting_principles[],` `proposed_actions[],` `urgency_level`.

## Schema: AdversarialDebateEntry
*   **Purpose:** The record of the formal debate between AI Specialist Modules.
*   **Machine-Readable Schema:** [AdversarialDebateEntry.schema.json](./schemas/AdversarialDebateEntry.schema.json)
*   **Key Fields:** `entry_id (CID)`, `previous_entry_id (CID)`, `council_session_id (UUID)`, `advocate_for`, `advocate_against`, `arguments_for[],` `arguments_against[],` `rebuttals[]`.

## Schema: AdjudicativeRulingEntry
*   **Purpose:** The final, reasoned verdict from the Adjudicative AI.
*   **Machine-Readable Schema:** [AdjudicativeRulingEntry.schema.json](./schemas/AdjudicativeRulingEntry.schema.json)
*   **Key Fields:** `entry_id (CID)`, `previous_entry_id (CID)`, `adjudicator_id (DID)`, `adjudicator_sig`, `final_verdict`, `reasoning`, `dissenting_opinion`, `precedent_set[]`.
