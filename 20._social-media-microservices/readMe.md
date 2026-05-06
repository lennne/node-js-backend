## Distributed Microservices Architecture (Module 20)
The most advanced microservices REST implementation in this repo, featuring a full production-ready flow.  
A social media backend split into decoupled services to ensure independent scalability and high availability.

### Key Features:

#### Application Services
* **Identity Service:** A standalone bouncer handling secure registration and session persistence using Argon2 and TTL-indexed Refresh Tokens.

* **API Gateway:** A single entry point using express-http-proxy to route external traffic (Port 3000) to internal services (Port 3001, etc.) while centralizing auth validation.

* **Observability:** Distributed logging via Winston, creating structured JSON logs for cross-service debugging.


#### Database Schema & Relationships
The Identity Service uses a referenced data model to separate persistent user data from temporary session data.

* **User Model (models/User.js):**  
 Stores the primary identity and security credentials.    

    * ***Fields:*** username, email, password.

    * ***Security:*** Implements a pre-save hook for Argon2 hashing and a custom method for password verification.

* **Refresh Token Model (models/RefreshToken.js):**  
Handles session persistence and security.

    * ***Relationship:*** Many-to-One (ref: 'User'). Each user can have multiple active sessions/tokens (e.g., mobile and desktop).

    * ***Automatic Cleanup:*** Uses a TTL Index on the expiresAt field. MongoDB automatically deletes documents once the expiration date is reached, ensuring the database doesn't grow indefinitely with stale sessions.


---

### How do the services interact? 
1. We will create a proxy to redirect API requests from the api-gateway to the specified service
2. For example, since the api-gateway runs on 3000, and the identity-service runs on 3001, we will target localhost:3000/api/auth/register which will then route to the localhost:3001/api/auth/register
