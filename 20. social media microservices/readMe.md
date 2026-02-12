### How do the services interact? 
1. We will create a proxy to redirect API requests from the api-gateway to the specified service
2. For example, since the api-gateway runs on 3000, and the identity-service runs on 3001, we will target localhost:3000/api/auth/register which will then route to the localhost:3001/api/auth/register