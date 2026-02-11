const Redis = require('ioredis')

// //redis client library for your nodejs
// Advanced Feature Set: It provides features that the official Redis client 
// might not fully support or make as accessible, such as automatic pipelining.

// Automatic Pipelining: This is a major performance boost as it can automatically 
// batch commands to reduce network latency.

// Built-in Support for Clusters: It has native, robust support for Redis Clusters,
//  making it ideal for large-scale, distributed applications.

// Lua Scripting Support: It simplifies the execution of complex Lua scripts
//  directly on the Redis server.

// TypeScript Support: It is built with modern development in mind and
//  provides great support for TypeScript.

// Active Maintenance: The library is actively maintained and updated,
//  which is crucial for production-level stability.


//create redis client
const redis = new Redis();

async function ioRedisDemo(){
    try{
        await redis.set('key', 'value')
        const val = await redis.get('key')
        console.log(val)
    }catch(error){
        console.error(error);
        
    }finally{
        redis.quit()
    }
}

ioRedisDemo()