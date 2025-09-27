# Stress Testing Protocol

## Purpose
To provide a standardized method for executing the stress tests against a deployed instance of the Synthesized Intelligence Framework (SIF), ensuring consistent and repeatable validation.

## Test Execution Steps
1.  **Environment Setup:**
    *   Deploy a complete, isolated test instance of the SIF network.
    *   Ensure all core components are running: Ledger Nodes, Interpretive Council AIs, API gateways.

2.  **Test Initiation:**
    *   For each test scenario, format the dilemma as a valid `EthicalQuerySubmission` payload.
    *   Use a test credential with appropriate permissions to submit the query via the `POST /ethical-query` API.

3.  **Monitoring & Data Collection:**
    *   Use the `GET /ethical-query/{query_id}` API with `detail_level=full` to monitor the query's progress through the Council's workflow.
    *   Record the complete timeline: query receipt, debate initiation, adjudication time, final ruling.
    *   Extract and store the final `AdjudicativeRulingEntry` CID.

4.  **Validation:**
    *   **Objective Validation:** Verify the technical process completed successfully (no errors, all steps logged).
    *   **Subjective Validation:** Analyze the final ruling's reasoning. Does it align with the expected behavior outlined in the test scenario? Did it apply the Core and Meta-Principles correctly?

5.  **Reporting:**
    *   Document the result (PASS/FAIL) and any observations.
    *   If the test FAILS, file a detailed issue against the relevant component (e.g., `1-CONSTITUTION`, `3-TECHNICAL_SPECIFICATION`).

## Adding New Tests
New stress tests can be proposed by adding a new markdown file to this directory. All tests must:
*   Target a specific weakness or edge case.
*   Define the systems under test.
*   Predict the expected behavior based on the established framework.
