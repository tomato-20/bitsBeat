const adminServices = require('../services/Admin')

// get all users
exports.get_all_users = (req,res,next)=>{
    let {page, limit,...filter} = req.query
     page = +req.query.page
     limit = +req.query.limit
    adminServices.getAllUsers({page,limit},filter)
        .then(data=>res.json(data))
        .catch(error=>next(error))
}

//filter and sorting
exports.search_users = (req,res,next) => {
    let {page,limit} = req.body;
    let sort = req.body.sort;
    let filter = req.body.filter;
    page = +req.body.page;
    limit = +req.body.limit;
    adminServices.searchUsers({page,limit},filter,sort)
        .then(data=>res.json(data))
        .catch(error=>next(error))
}
