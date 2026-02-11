// publisher -> sends -> channel receives -> subscribe consumes

const redis = require('redis')

const client = redis.createClient({
    host: "localhost",
    port: 6379
})

client.on("error", (error)=> {
    console.log("Redis client error ooccured!", error)
})

// so in a simple project you can just push changes/updates directly to your server or database and it is processed
// since there's only one source of storage
// but for a large scalable application your redis server will be it's own service and your monolothic application 
// is split into multiple services and they can communicate using the redis server where, the redis server will serve as 
// a centralized point of synchronization for your services, this is a simple overview but RabbitMQ and message Queue are
// tools that will take to the next level
async function testAdditionalFeature(){
    try{
        await client.connect() //connect to the redis server
        const subscriber = client.duplicate()
        await subscriber.connect() // get a connection to the same server

        // this client listens to the dummy-channel event, whenever a different service publishes to redis on this channel
        // this subscriber's callback function gets executed
        subscriber.subscribe('dummy-channel', (message, channel) => {
            console.log(`Received message from ${channel}:${message}`)
        })

        await client.publish('dummy-channel', 'Some dummy data ')
        await client.publish('dummy-channel', 'another published data')


        //making sure that we receive the message and then unsubscribe()
        await new Promise((resolve) => setTimeout(resolve, 3000))

        await subscriber.unsubscribe('dummy-channel')
        await subscriber.quit() //close the subs


        //pipelining & transactions
        // pipelining allows you to send multiple commands to a server
        // while transactions allow multiple commands to be executed as a single unit
        // a pipelining scenario would be, a batch insert to the redis database
        // say you had 1000s of records and you needed to insert them into the database, 
        // for example logging events, storing how many times a user is logging into your website
        
        // an example for transactions is that say you have a banking applciation and you needed to ensure that the money being withdrawed 
        // from one account is being deposited into the other account, the two actions must be completed since money taken
        // out of the users account must be transferred to the other account and the changes and balances should reflect
        // one action can't succeed while the other fails. the "withdrawal" action must succeed


        // //transaction
        // const multi = client.multi()
        // //we add the commands to be executed
        // multi.set('key-transaction1', 'value1')
        // multi.set('key-transaction2', 'value2')
        // multi.get('key-transaction1')
        // multi.get('key-transaction2')

        // const results = await multi.exec()
        // console.log(results)

        // // piipelining will allow you to send multiple commmands to the redis server in one go without waiting for each response

        // const pipeline = client.multi()
        //  multi.set('key-pipeline1', 'value1')
        // multi.set('key-pipeline2', 'value2')
        // multi.get('key-pipeline3')
        // multi.get('key-pipeline4')

        // const pipelineresults = await multi.exec()
        // console.log(pipelineresults)

        // //batch data operation -> 
        // const pipelineOne = client.multi()
        // for(let i=0; i< 1000; i++){
        //     pipeline.set(`user:${i}:action`, `Action:${i}`)

        // }
        // await pipelineOne.exec() 

        // const dummyExample = client.multi()
        // multi.decrBy('account:1234:balance', 100); //decrementing the value for this account by 100
        // multi.incrBy('account:0000:balance', 100); //increasing the value for this account by 100

        // const finalResults = await multi.exec() //we're implementing ATOMICITY HERE
        // //if any of the previous commands fail the whole operation fails

        // //another example is in a cart scenario
        // // you'll need to add a product to your cart and then update the price for your cart
        // const cartExample = client.multi()
        // multi.hIncrBy('cart:1234', 'item_count', 1)
        // multi.hIncrBy('cart:1234', 'total_price', 10)

        // await multi.exec()

        // pipeling performance example
        console.log('Performance test')
        console.time('without pipelining')

        for(let i=0; i< 1000; i++){
            await client.set(`user${i}`, `user_value${i}`)
        }
        console.timeEnd('without pipelining')

        //with pipelining
        console.time('with pipelining')
        const bigPipeline = client.multi()
         for(let i=0; i< 1000; i++){
            await bigPipeline.set(`user_pipeline_key${i}`, `user_pipeline_value${i}`)
        }
        
        await bigPipeline.exec()
        
        console.timeEnd('with pipelining')

        //         Received message from dummy-channel:Some dummy data 
        // Received message from dummy-channel:another published data
        // Performance test
        // without pipelining: 119.446ms
        // with pipelining: 11.16ms
         
        //we wouldn't be using redis package 
        // we would use the nodejs redis package or ioredis since we're using node
    }catch(error){
        console.log(error);
    }finally{
        client.quit()
    }
}

testAdditionalFeature()