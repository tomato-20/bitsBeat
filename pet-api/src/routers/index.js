const router = require('express').Router();

const petRouter = require('./petRouter')

router.use('/pet',petRouter)

router.get('/',async (req,res,next)=>{
  const {client,db} = req.dbConfig
  try {
    res.json({
      success: true,
      message: "heyeyey"
    })
  }catch(error) {
    next(error)
  } finally {
    if(client) await client.close()
  }
  // const client = req.dbConfig?.client;
  // try {
  //   if(client) {
  //     client.connect()
  //     const movies= client.db('sample_mflix').collection('movies')
  //     let movieList = movies.find({}).limit(10)
  //     res.status(200).json({
  //       app : "customerAPI",
  //       version: "1.0.1",
  //       movieList
  //     })
  //   }
    
  // } catch (error) {
  //   console.log(error);
  //   res.end()
  // } finally {
  //   if(client) {
  //     client.close()
  //   }
  // }
  

})

module.exports = router;