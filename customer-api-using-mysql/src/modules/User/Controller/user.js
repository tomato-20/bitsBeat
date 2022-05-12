
exports.createUserController = (req,res, next) => {
    // userInfo in req body
    try {
        //createUserService(userIngo)
        res.send("Creating user router")
    } catch (error) {
        next(error);
    }
}

exports.editUserProfileController = (req,res,next) => {
    // userId and edit params
    try {
        // updateUserService(userID, editParams)
        res.send("Updating user profile");
    } catch (error) {
        next(error)
    }
}

exports.deleteUserController = (req,res,next) => {
    // userID
    try {
        // deleteUserService(userID)
        res.send("Deleting user profile")
    } catch (error) {
        next(error)
    }
}

