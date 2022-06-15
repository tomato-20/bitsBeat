const {promisify} = require('util')
const redis = require('ioredis');

((redisHelper) => {


    const clientOptions = {
        port: 6397,
        host: "127.0.0.1"
    }
    
    redisHelper.init = async (app) => {
        // const client =  redis.createClient(clientOptions)
        // var authedRedis = new Redis(6380, '192.168.100.1', { password: 'password' });
        const client =  new redis()


        client.on('connect',()=>{
        console.log("Client connected to redis.")
        })

        client.on('err',(err)=>{
            console.log(err.message)
        })

        client.on('ready',(err)=>{
            console.log('Client is ready to use')
        })

        client.on('end', ()=> {
            console.log("Client disconnected from redis")``
        })

        // let connect = promisify(client.connect).bind(client)

        // app.locals.cache_db = await connect()
        app.locals.cache_db = client
    }

    redisHelper.setCache = async(req,key,value,expiry) => {
        await req.cache_db.set(key,JSON.stringify(value),'ex',expiry || 60);
    }

    redisHelper.getCache = async (req,key) => {
        let data = await req.cache_db.get(key);
        return JSON.parse(data)
    }

    redisHelper.clearKeys = async(req,pattern) => {
        let stream = req.cache_db.scanStream({match : pattern, count: 100});
        let pipeline = req.cache_db.pipeline();
        let localKeys = [];

        stream.on('data',function(resultKeys) {
            console.log(resultKeys)
            for (let i = 0 ; i < resultKeys.length ; i++) {
                localKeys.push(resultKeys[i]);
                pipeline.del(resultKeys[i]);
            }
        })

        stream.on('end' , function() {
            pipeline.exec(()=>{
                console.log("Stream complete");
            })
            
        })

        stream.on('error' , function() {
            console.log(error);
        })
    }

 

})(module.exports)



