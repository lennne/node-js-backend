## Auth Service

This is our main entry point, it is going to handle all our services

 ### Packages we need
 * Cors
 * Express
 * Express-http-proxy
 * Helmet
 * Ioredis
 * Json Web Token
 * Winston 
 * nodemon

 ### Folders


 ### Project Setup
 1. Set up scripts in package.json
 2. Set up Env variables
 3. Install packages
 4. Set up Centralized logging
 5. Set up Error handling for server
 6. Set up Middleware
 7. 

 ### Important Concept

 ### 1. Routing

 * **The way the routing works**  
    The api-gateway will have an endpoint named /v1/auth/register on a port 3000 like so:  

    ```:3000/v1/auth/register```  

    and then it needs to route to the registration endpoint /api/auth/register for the identity service on the port 3001 like so:
      
    ```:3001/api/auth/register```
      
    Essentially these two services will have different api endpoints, the client will only know about(or first hit) the    
    api-gateway's /v1/auth/register endpoint on port 3000 while the api-gateway will know the rest of the services  
    The whole thing will look like this 

    ```:3000/v1/auth/register -> :3001/api/auth/register```

* **Why do we create api versioning only on the api-gateway?**  
    There's no reason to create versioning for the different services, it's fine to specify the endpoints for the services
    just the way they are and upgrade only the api-gateway to maintain uniformity else you'll find things like different services having different version numbers like this:  

    ``` :3001/v1/auth/register```

    ``` :3002/v3/search/products```

    ``` :3003/v2/payment/card ```

    ``` :3004/v1/auth/login```

    And everytime one service upgrades you'd need to update it inside all the different services communicating with that service. I believe you can even go and step further and think about how it'll be implemented in the cloud infrastructure, the cloud will have it's own internal communication subnet of ports and endpoints and will be talking with each other on a private network while the public gateway will forward public requests to your api-gateway