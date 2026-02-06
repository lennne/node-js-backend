const redis = require('redis')

//this client will be used to interact with the redis server
const client = redis.createClient({
    host: 'localhost', // this means that the redis server is now hosted here
    port: 6379
})

//event listener -> any errors that will be emitted by the redis client
client.on('error', (error) => console.log('Redis client error occured', error));

async function redisDataStructures(){
    await client.connect()
    try {
        // SET -> sets the defined key to a new value or 
        // MSET -> pushes the array of objects to the defined key if it's an array
        // GET -> retrieves the value for a defined
        // MGET -> retrives multiple values for a defined key
        // await client.set("user:name", "John Doe");
        const name = await client.get("user:name")
        console.log("name is ", name)

        // await client.mSet(['user:email', 'sangam@email.com', 'user:age', "60", "user:country", "India" ])
        const [email, age, country] = await client.mGet(["user:email", "user:age", "user:country"])
        console.log(email, ":", age, ":", country)

        // await client.lPop("notes")

        // await client.lPush( "sketch", ["sketch 1", "sketch 2"])
        const results = await client.lRange('sketch',0, -1)
        console.log("the results are ", results)

        // sets -> SADD, SMEMBERS, SISMEMBER, SREM
        //SADD -> adds one member to the set
        // await client.sAdd('user:nickName', ['john', 'varun', 'xyz'])
        const extractUserNickNames = await client.sMembers('user:nickName')
        console.log(extractUserNickNames)

        //check if varun is one of the user nickname's
        const isMember = await client.sIsMember('user:nickName', 'john')
        console.log(isMember)

        // await client.sRem('user:nickName', 'varun')
        const result = await client.sMembers('user:nickName')
        console.log(result)

        //sorted sets -> zAdd, zMembers, zisMember, zRem
        // await client.zAdd("cart", [{
        //     score: 100,
        //     value: "Shoe"
        // }, 
        // {
        //     score: 90,
        //     value: "bag"
        // }, 
        // {
        //     score: 10,
        //     value: "phone"
        // }])

        const extractCartItems = await client.zRange('cart', 0, -1)
        console.log("extractCartItems", extractCartItems)

        const extractCartTimesWithScore = await client.zRangeWithScores('cart', 0, -1)
        console.log("extractCartTimesWithScore", extractCartTimesWithScore);

        const extractCartItemRank = await client.zRank('cart', "Shoe")
        console.log("extractCartItemRank ", extractCartItemRank)


        // hashes -> hSet, hGet, hGetAll, hDel
        // await client.hSet('hello', {
        //     name: "first product",
        //     description: "product one desscription",
        //     rating: "5"
        // })
        const hashedValue = await client.hGet('hello', "name")
        console.log(hashedValue)

        const getProductDetails = await client.hGetAll('hello')
        console.log(getProductDetails)

        // await client.hDel('hello', 'name')
        const updatedProductDetails = await client.hGetAll('hello')
        console.log("updatedProductDetails", updatedProductDetails)

    } catch (error) {
        console.log(error)
    }finally{
        await client.quit()
    }
}

redisDataStructures()