async function invalidatePostCache(req, input) {
    //remove all the cache that starts with the cacheKeys
    // in the lifecycle of the create post request we execute the invalidatePostCache function after we have
    //saved the response in the database and before we send the response back
    const keys = await req.redisClient.keys("posts:*");
    if(keys.length > 0){
        await req.redisClient.del(keys)
    }
}

module.exports = {invalidatePostCache}