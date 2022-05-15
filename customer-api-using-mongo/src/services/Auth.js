const User = require('../models/Users')

const {generateAccessToken} = require('../utils/jwtauthentication')
const {compare} = require('../utils/bcrypt')
const {getUserByEmail} = require('./SearchUser') 

exports.login = async (email,password) => {
    // input validation
    if (!email || !password) throw new Error('Email and password are requried')

    let isPasswordValid = false;
    try {
        const existedUser = await getUserByEmail(email);
        if(existedUser) {
            console.log(existedUser.password)
             isPasswordValid = await compare(password,existedUser.password);
             console.log(isPasswordValid)
        }
        if(!existedUser || !isPasswordValid) throw new Error('Invalid email or password');

        const token = await generateAccessToken({
            username: existedUser.username,
            id: existedUser._id
        });
        
        return {
            token
        }
    } catch (error) {
        throw (error)
    }
}

exports.logout = async (id) => {
    try {
        // check if session is active
        // - token is valid or not 
        // - check if token is expired

    } catch (error) {
        throw (error)
    }
}