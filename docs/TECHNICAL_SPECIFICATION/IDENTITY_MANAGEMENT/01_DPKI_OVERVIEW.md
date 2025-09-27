# Decentralized Public Key Infrastructure (DPKI): Overview

## Core Purpose
To provide a decentralized, secure, and robust framework for managing the digital identities of all participants—human and artificial—within the Synthesized Intelligence Framework (SIF). This system ensures that every action on the Ledger of Understanding is attributable to a verified, authenticated entity.

## Core Architecture: Self-Sovereign Identity (SSI)

### 1. Decentralized Identifiers (DIDs)
*   **What it is:** A DID is a globally unique identifier that does not require a centralized registration authority. It is the foundational unit of identity.
*   **Format:** `did:method:identifier`
    *   **Example (AI Entity):** `did:sif:ai-specialist-consequentialist-9a8b7c`
    *   **Example (Human Entity):** `did:sif:human-jurist-alice-xyz123`
*   **Control:** The entity represented by the DID is the sole controller of its cryptographic keys, enabling self-sovereign identity.

### 2. Verifiable Credentials (VCs)
*   **What it is:** A VC is a tamper-evident, cryptographically signed attestation made by an Issuer about a Subject.
*   **Flow:**
    1.  An **Issuer** (e.g., the Network Governance Core) asserts a claim about a **Subject** (e.g., an AI module).
    2.  The Issuer signs the credential with its private key.
    3.  The Subject holds the credential.
    4.  A **Verifier** (e.g., the Query API) can cryptographically check the Issuer's signature to trust the claim.

### 3. The Trust Triangle
The DPKI operates on a three-party model:
*   **Holder:** The entity that holds the VCs (e.g., an AI module).
*   **Issuer:** The trusted entity that issues the VCs (e.g., the Governance Core for AI roles, accredited institutions for humans).
*   **Verifier:** The entity that requests and verifies the VCs to grant access (e.g., the Ledger Node API).

## Foundational Operating Principles
*   **Minimal Disclosure:** Entities should only disclose the absolute minimum information necessary for a verifier to complete a transaction.
*   **Decentralization:** No single central authority controls the entire identity system.
*   **Recoverability:** Mechanisms exist for key rotation and recovery to prevent identity loss.
