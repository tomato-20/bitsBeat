const express = require('express');

const rootRouter = require('./src/rootRouter')

const redisHelper = require('./src/helper/init_redis')
const dbHelper = require('./src/helper/db.helper')

const baseURI = 'http://localhost:3330'

// create an app
const app = express();

// connect database
dbHelper.init(app);
redisHelper.init(app);

app.use(async (req, res, next) => {
  if (app.locals.db) {
    req.db = app.locals.db;
  }

  if (app.locals.cache_db) {
    req.cache_db = app.locals.cache_db;

    if (req.method == 'GET') {
      let cacheData = await redisHelper.getCache(req, req.url)
      if (cacheData) return res.status(200).json({ success: 'true',message: "from cache", data: cacheData })
    }
  }

  next()
})

app.use((req, res, next) => {
  //search data in cache -> if not normal request
  next();
})

// parse req body 
app.use(express.json());
app.use(express.urlencoded({
  extended: false
}))

app.use('/api/v1', rootRouter)

// response handler
app.use(async (req, res, next) => {
  let data = req.setCacheData
  let url = req.url;
  try {
    if (data) {
      // if (req.query) {
      //   url = req.url + '?' +
      //     Object.keys(req.query).map(query => {
      //       return `${query}=${req.query[query]}&`
      //     }).join('').slice(0, -1);
      // }
      console.log(await redisHelper.setCache(req, url, data, 60))
    }else if(req.method == 'POST') {
      console.log(await redisHelper.clearKeys(req, `${url.slice(0,-1)}?*`))
    }
    return res.status(200).json(req.responseData) 
  } catch (error) {
    next(error)
  }
})

app.use('/*', (req, res, next) => {
  res.status(404).json({
    msg: `Cannot ${req.method} ${req.url}`
  })
})


// generic error handler
app.use((err, req, res, next) => {
  if (err.status) {
    res.status(err.status).json({
      message: err.message || err.msg
    })
  }

  console.error(err.stack)

  res.status(500).json({ message: err.message || err.msg || 'Internal server error' })
})


module.exports = app;





