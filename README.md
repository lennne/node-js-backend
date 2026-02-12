# Node.js Backend Learning Journey

A comprehensive, module-based repository documenting my progression from Node.js fundamentals to advanced API architecture. This project serves as a structured curriculum for building scalable, secure, and modern backend systems.

---

## Project Structure

The repository is organized chronologically. Each folder represents a specific milestone in backend development:

| Module | Name | Key Concepts |
| :--- | :--- | :--- |
| **01-05** | Core Fundamentals | Node Module System, `fs` (Sync/Async), `http`, `path`, `url` |
| **08-10** | Asynchronous Node | Promises, Async/Await, Event Emitter logic |
| **11-12** | Express.js Basics | Middleware, Routing, EJS Templating, Error Handling |
| **13** | **Bookstore API** | **Capstone Project:** JWT Auth, RBAC, Cloudinary Integration |
| **14** | MongoDB Basics | Mongoose Schemas, CRUD operations, Connection logic |
| **15** | MongoDB Intermediate | Aggregation Pipelines, Data Referencing (`.populate()`) |
| **16** | Node.js GraphQL | Apollo Server, TypeDefs, Resolvers, Mutations |
| **17** | **Advanced Node Concepts** | Event Loop Phases, Buffers, Streams, Crypto Pipeline |
| **18** | **Express Concepts** | Middleware, Error Handling, API Versioning, Rate Limiting (Security), MVC Structure, Async Route Handling, Versioned Routing |
| **19** | **Redis Mastery** | Pub/Sub, Pipelining (Performance), Atomic Transactions, ioredis|
| **20** | **Microservices Architecture** | API Gateway Pattern, Service Isolation, Argon2 Hashing, Winston Logging, Redis Rate Limiting, Distributed Logging |

---

## Tech Stack

- **Runtime:** Node.js
- **Validation:** Joy
- **Framework:** Express.js
- **Distributed Systems:** express-http-proxy, Redis (ioredis), Winston (Structured Logging)
- **API Styles:** REST & GraphQL (Apollo Server)
- **Security Suite:** Express.js, JWT, Bcrypt.js, AES-256 Encryption, Argon2, Rate-Limiter-Flexible, Helmet.js
- **Storage & Database:** Cloudinary & Local File System Streams, MongoDB (Mongoose)
- **Tools:** Multer, Zlib (Gzip), Crypto, Dotenv


---

## Featured Projects:   

## Bookstore API (Module 13)

An advanced REST implementation in this repo, featuring a full production-ready backend flow:

### Key Features:
* **Authentication:** Secure registration and login with salted password hashing.
* **Role-Based Access Control (RBAC):** Middleware to differentiate between `user` and `admin` permissions.
* **Media Pipeline:** Secure image upload to Cloudinary with local file validation via Multer.
* **Owner-only Deletion:** Logic to ensure users can only manage their own resources.

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

## Advanced Learning: Runtime & Data Handling

This repo includes specialized modules for high-performance and low-level Node.js operations:

### Node.js Internals (Module 17)

* **Event Loop Mastery:** Visualizing the execution order of `nextTick`, `Promises`, `setImmediate`, and `setTimeout`.
* **Binary Data:** Deep dive into `Buffer` allocation and manipulation for raw data handling.
* **Stream Pipelines:** Implementing high-performance data processing using `.pipe()`. 
    * *Example:* A pipeline that Reads -> Compresses (Gzip) -> Encrypts (AES) -> Writes to disk.
    

### Aggregation & GraphQL (Modules 15-16)
* **Aggregation Pipeline:** Complex data analysis (Average prices, stock stats) directly within MongoDB.

* **GraphQL Implementation:** Moving away from REST to a typed, single-endpoint system using Apollo Server.

### Low-Level Runtime Mastery (Module 17-18)
Deep dives into the Node.js runtime for building high-performance utilities.
* **Crypto Stream Pipeline:** A production-grade tool that reads files, compresses them via zlib, and encrypts them using AES-256-CBC on the fly with zero memory overhead.

* **The Event Loop Visualizer:** A script that maps out the exact execution order of Microtasks and Macrotasks to solve concurrency bugs.

### Performance & Caching Lab (Module 19)
High-speed data handling projects demonstrating the power of in-memory storage.

* **Redis Pipelining:** A performance comparison project proving how batching commands reduces network latency by over 90%.

* **Transaction Logic:** A banking-style simulation using .multi() and .exec() to ensure "All-or-Nothing" data integrity.

* **Real-time Pub/Sub:** A messaging demo showing how services communicate asynchronously without direct dependencies.

---

## Local Setup

1. **Clone the repo:**
   ```bash
   git clone [https://github.com/lennne/node-js-backend.git](https://github.com/lennne/node-js-backend.git)
   cd node-js-backend
2. **Install Dependencies:**
*(Navigate to the specific module folder, e.g., Module 13)*
```bash
npm install

```


3. **Environment Variables:**
Create a `.env` file in the project root of the specific module:
```env
PORT=3000
MONGO_URI=your_mongodb_connection_string
JWT_SECRET_KEY=your_secret_key
CLOUDINARY_CLOUD_NAME=your_cloud_name
CLOUDINARY_API_KEY=your_api_key
CLOUDINARY_API_SECRET=your_api_secret

```


4. **Run Dev Server:**
```bash
npm start

```
---

## Advanced Learning: Aggregation & GraphQL

This repo includes specialized modules for high-performance data handling:

* **Aggregation Pipeline:** Found in Module 15, showing how to perform complex data analysis (Average prices, stock stats, etc.) directly in MongoDB.
* **GraphQL Implementation:** Found in Module 16, moving away from REST to a typed, single-endpoint system using Apollo Server.

---

##  Author

**Lennne**
Full-Stack Developer*

---

