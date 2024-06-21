Task List
Phase 1: Initial Setup
1. Project Initialization
– Set up the project repository.
– Initialize the project using Go or Node.js.
– Set up environment configurations.
2. Dependency Management
– Install necessary packages/libraries for JWT, database connectivity, and
WebSocket/SSE.
– Set up dependency management (Go modules or npm/yarn).

Phase 2: Authentication
4. JWT Authentication
– Implement JWT authentication middleware.
– Ensure incoming requests contain a valid JWT token in the header.
– Create signup and login endpoints (if they don’t exist).

Phase 3: Data Models and Database
5. Database Schema
– Design and implement database schema for storing user-defined rules.
– Create models for user and classification rules.
6. Database Integration
– Implement database connection and setup.
– Create CRUD operations for user-defined rules.

Phase 4: User-Defined Classification Rules
6. Classification DSL
– Design a Domain Specific Language (DSL) for user-defined classification
rules.
– Implement a parser to interpret the DSL.
7. API for Rule Management
– Implement endpoints to create, read, update, and delete classification rules.
– Ensure rules are validated and constrained by a user-defined maximum.

Phase 5: Real-time Data Processing
8. Data Streaming Integration
– Set up WebSocket or SSE for live data streaming.
– Implement a mechanism to receive and process incoming data streams.
9. Classification Engine
– Develop a classification engine to apply user-defined rules to the incoming
data.
– Ensure the engine operates in real-time with minimal latency.

Phase 6: Testing and Validation
10. Unit and Integration Tests
– Write unit tests for all modules.
– Implement integration tests for end-to-end validation.
11. Load Testing
– Perform load testing to ensure the system can handle high volumes of live
data.
