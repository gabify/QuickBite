const User = require('../models/user')
const mongoose = require('mongoose')

const signUp = async(req, res) =>{
    const {email, password, name} = req.body

    try{
        const user = await User.signup(email,password, name)
        res.status(200).json({result: "Operation complete"})
    }catch(err){
        res.status(400).json({error: err.message})
    }
}

module.exports = {signUp}