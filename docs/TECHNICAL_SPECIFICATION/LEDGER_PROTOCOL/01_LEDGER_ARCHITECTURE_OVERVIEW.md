# Ledger of Understanding: Architecture Overview

## Core Purpose
To provide an immutable, transparent, and universally accessible record of all ethical deliberations and rulings made by the Interpretive Council. It is the single source of truth and the mechanism for trust and auditability.

## Core Architecture: Federated & Content-Addressed

### 1. Federated Network
*   The Ledger is not a single database. It is a network of identical nodes, each holding a full copy of the entire ledger.
*   **Node Operators:** The Council, participating governments, universities, and trusted non-profits.
*   **Benefit:** Eliminates single points of failure and control. Compromising the ledger requires simultaneously compromising a majority of geographically and politically distributed nodes.

### 2. Content-Addressed Storage
*   Data is stored and retrieved based on **what it is**, not *where it is*.
*   Each entry (query, debate, ruling) is cryptographically hashed, generating a unique Content ID (CID). This CID becomes its permanent, immutable address.
*   **Benefit:** Guarantees data integrity. Any change to the data would change its hash/CID, making tampering immediately detectable.

### 3. Data Structure: Immutable Chain
*   Entries are stored in a linked list where each new entry contains the CID of the previous one.
*   This creates a cryptographically verifiable chain of events, ensuring the entire history is tamper-proof.

## Core Components
1.  **The Ledger Nodes:** The software run by operators to store data and maintain consensus.
2.  **The Access API:** The structured interface for reading from and writing to the ledger.
3.  **The Verification System:** Tools for cryptographically verifying the authenticity and integrity of any piece of data.ion and delivers a preliminary ruling.