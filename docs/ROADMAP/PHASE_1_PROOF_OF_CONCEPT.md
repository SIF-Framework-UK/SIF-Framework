# Roadmap: Phase 1 - Proof of Concept (PoC)

## Objective
To build a functional, automated proof-of-concept that can execute a full adjudication cycle for a single query in a controlled environment.

## Q3 2026 - Q1 2027
1.  **Identity & Auth PoC:**
    *   [ ] **Implement the DPKI** for generating DIDs and signing simple Verifiable Credentials.
    *   [ ] **Build the VC Verifier** into the API gateway for the `/ethical-query` endpoint.

2.  **Automated Council PoC:**
    *   [ ] **Develop two simplistic AI Specialist Modules:**
        *   One trained on a deontological ("rule-based") ethics dataset.
        *   One trained on a consequentialist ("outcome-based") ethics dataset.
    *   [ ] **Develop a basic Adjudicative AI** that can read a debate and select a ruling based on a weighted analysis of the constitutional principles.
    *   [ ] **Integrate the components:** The API triggers the modules, they debate, the adjudicator rules, and the result is posted to the ledger.

3.  **Initial Testing & Validation:**
    *   [ ] **Automate the execution of the stress tests** against the PoC network.
    *   [ ] **Publish a detailed report** on the PoC's performance, decision-making, and any failures or unexpected behaviors.
