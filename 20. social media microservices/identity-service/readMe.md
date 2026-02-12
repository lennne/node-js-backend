## Auth Service

This is our identity service, it is going to handle identification and authentication

 ### Packages we need
 * Cors
 * Argon2
 * JsonWebToken
 * Express
 * Express-Rate-Limit
 * Helmet
 * IoRedis
 * Mongoose
 * Rate-Limit-Redis
 * Winston

 ### Folder Structure
 * src/
    models
    controllers
    middleware
    routes
    utils

 ### Project Setup
1. Set up database
2. Set up database URI in .env file
3. Set up utility functions in utils folder, e.g logger
4. Set up Centralized Logger for server
5. Set up errorHandler Logger for middleware
6. Set up Models
7. Set up Controllers 
    - Set up user authentication
    - Set up data validation
8. Set up Routers
9. Set up server application
10. Set up Redis Client
11. Set up Rate limiting no Redis Client
12. Set up Rate limiting on Endpoints