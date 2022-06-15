const router = require('express').Router();
const {todoRouter} = require('./modules/router')

router.use('/todos', todoRouter);

router.get('/',(req,res,next) => {
  res.status(200).send({message: "API "})
})

module.exports = router;