
# Node.js Backend Learning Journey

A comprehensive, module-based repository documenting my progression from Node.js fundamentals to advanced API architecture. This project serves as a structured curriculum for building scalable, secure, and modern backend systems.

---

## 📂 Project Structure

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

---

## 🛠️ Tech Stack

- **Runtime:** Node.js
- **Framework:** Express.js
- **API Styles:** REST & GraphQL (Apollo Server)
- **Database:** MongoDB (via Mongoose)
- **Security:** JWT (JSON Web Tokens), Bcrypt.js
- **Storage:** Cloudinary (for cloud media management)
- **Tools:** Multer (File uploads), Dotenv, Nodemon



---

## 🌟 Featured Project: Bookstore API (Module 13)

The most advanced REST implementation in this repo, featuring a full production-ready backend flow:

### Key Features:
* **Authentication:** Secure registration and login with salted password hashing.
* **Role-Based Access Control (RBAC):** Middleware to differentiate between `user` and `admin` permissions.
- **Media Pipeline:** Secure image upload to Cloudinary with local file validation via Multer.
- **Owner-only Deletion:** Logic to ensure users can only manage their own resources.

---

## Local Setup

1. **Clone the repo:**
   ```bash
   git clone [https://github.com/lennne/node-js-backend.git](https://github.com/lennne/node-js-backend.git)
   cd node-js-backend

```

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
*Master of Applied Science Student | Full-Stack Developer*

---

