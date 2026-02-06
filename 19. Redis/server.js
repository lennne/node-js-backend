const redis = require('redis');

//this client will be used to interact with the redis server
const client = redis.createClient({
    host: 'localhost', // this means that the redis server is now hosted here
    port: 6379
})

//event listener -> any errors that will be emitted by the redis client
client.on('error', (error) => console.log('Redis client error occured', error));

//test our redis connection
async function testRedisConnection(){
    try{
        await client.connect()
        console.log('connected to redis')
        

        await client.set("name", "sangam")

        const extractValue = await client.get("name")

        console.log(extractValue);
        
        const deleteCount = await client.del("name")
        console.log(deleteCount);
        
        const extractUpdatedValue = await client.get('name')
        console.log(extractUpdatedValue );
        
        await client.set('count', 100)
        const implementCount = await client.incr('count')
        console.log(implementCount)

        const decrementCount = await client.decr('count')
        await client.decr('count')
        await client.decr('count')
        await client.decr('count')
        await client.decr('count')
        await client.decr('count')
        await client.decr('count')
        await client.decr('count')
        await client.decr('count')
        await client.decr('count')
        await client.decr('count')
        await client.decr('count')
        await client.decr('count')

        console.log(await client.get("count"))
    }catch(error){
        console.error("error : ", error)
    } finally {
        await client.quit()
    }
}

testRedisConnection()