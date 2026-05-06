## Auth Service

This is our identity service, it is going to handle identification and authentication

 ### Packages we need
 * Cors
 * JsonWebToken
 * Express
 * Helmet
 * IoRedis
 * Mongoose
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
5. Set up Models
    - Mongoose Schema
    - Indexing
6. Set up errorHandler Logger for middleware
    - Set up errorHandler middleware
    - Set up authentication Middleware
7. Set up Controllers 
    - Set up user authentication
    - Set up data validation
    - Set up Create Post
8. Set up Routers
9. Set up server application
10. Set up Redis Client
11. Set up Rate limiting no Redis Client
12. Set up Rate limiting on Endpoints