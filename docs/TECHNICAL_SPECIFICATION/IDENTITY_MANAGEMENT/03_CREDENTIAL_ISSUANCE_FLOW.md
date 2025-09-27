# Credential Issuance & Verification Flow

This document outlines the step-by-step process for issuing a Verifiable Credential to an entity and how a verifier checks it.

## Part 1: Issuance Flow

1.  **Request:** An entity (e.g., a newly instantiated AI module) generates its own DID and cryptographic key pair. It sends a signing request to the Governance Core Issuer, containing its new public key.
2.  **Validation:** The Issuer validates the entity meets the criteria for the requested role (e.g., has passed training benchmarks).
3.  **Credential Generation:** The Issuer creates a Verifiable Credential (like the one defined in `02_VERIFIABLE_CREDENTIAL_SCHEMA.yaml`) with the entity's DID as the `credentialSubject.id`.
4.  **Signing:** The Issuer cryptographically signs the entire credential, adding the `proof` section.
5.  **Delivery:** The signed VC is transmitted to the entity and recorded in the Issuer's own audit log.

## Part 2: Verification Flow (e.g., at the Query API)

1.  **Presentation:** An entity (the Holder) submits a request to the API, including its VC and a digital signature of the request made with the private key corresponding to the DID in the VC.
2.  **Signature Check:** The API (Verifier) first checks the signature on the request itself using the public key in the VC's `credentialSubject.id`.
3.  **Credential Check:** The Verifier then:
    *   Checks the **issuer's signature** on the VC using the issuer's public key.
    *   Checks the **revocation status** by fetching the revocation list from the URL in `credentialStatus` and checking the index.
    *   Validates that the VC's schema conforms to the expected structure (e.g., it has the correct `type` and `grantedPermissions`).
4.  **Authorization Grant:** If all checks pass, the Verifier grants access based on the `grantedPermissions` listed in the VC.
