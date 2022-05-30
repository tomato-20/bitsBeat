const { array } = require('joi');
const {Users} = require('../models')

/**
 * 
 * @param {Object} pageOptions 
 * @param {Number} pageOptions.page 
 * @param {Number} pageOptions.limit 
 * 
 * @param {string} filter
 * @returns 
 */
 exports.getAllUsers = async(pageOptions,sort,filter={}) => {
    const {page = 0, limit=10} = pageOptions;
    const email = filter.email;
    console.log(page,limit,email)
    let query = {}
    try {
            if(email) {
                query.email = {$regex: new RegExp(email,'i') }
            }

            let users = await Users.find(query).
            skip(page*limit)
            .limit(limit)
            const totalCount = await Users.countDocuments();
            return {
                totalCount,
                data: users,
                page,
                limit,
                
            }
    } catch (error) {
        throw (error)
    }
}

/**
 * 
 * @param {Object} pageOptions 
 * @param {Number} pageOptions.page
 * @param {Number} pageOptions.limit 
 * 
 * @param {Object} sortOptions 
 * @param {String} sortOptions.by 
 * @param {Bool} sortOptions.reverse
 * 
 * @param {Object} filterOptions 
 */
exports.searchUsers = async (pageOptions,filterOptions = {}, sortOptions = {}) => {
    let query = {}
    let sort = undefined
    let {page = 0, limit = 10} = pageOptions;

    //https://www.mongodb.com/docs/manual/reference/operator/query/and/
    if(!isObjEmpty(filterOptions)) {
        query = {
            $and : [
                ...Object.keys(filterOptions).map((filterOption,index) => {
                    let filterObj = {};

                    if (filterOption == "deleted") {
                        return {
                            deleted : filterOptions[filterOption]
                        }
                    }

                    if (filterOption == "date") {
                        return {
                            created_at : {
                                $gte: filterOptions[filterOption].from,
                                $lt: filterOptions[filterOption].to
                            }
                        }
                    } 
                    
                    filterObj[filterOption] = {
                        $regex: new RegExp(filterOptions[filterOption],'i')
                    }
                    return filterObj
            })]
        }
    }
    
    if(!isObjEmpty(sortOptions)) {
        const {by,reverse} = sortOptions;
        sort = [by, reverse?-1:1]
        console.log(sort)
    }
    console.log(query)

    //https://stackoverflow.com/questions/14559200/how-to-exclude-one-particular-field-from-a-collection-in-mongoose
    let users = await Users.find(query, {password: 0}).skip(page*limit).limit(limit).sort(sort&&[sort])
    try {
        return {
            data: users,
            totalCount: await Users.countDocuments(),
            page, limit
        }
    } catch (error) {
        throw (error)
    }
}


// utils
const isObjEmpty = (obj = {}) => !Object.keys(obj).length

