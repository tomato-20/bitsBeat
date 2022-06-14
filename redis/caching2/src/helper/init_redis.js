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

    redisHelper.setCache = async(req,key,value) => {
        await req.cache_db.set(key,JSON.stringify(value));
    }

    redisHelper.getCache = async (req,key) => {
        let data = await req.cache_db.get(key);
        return JSON.parse(data)
    }

})(module.exports)



