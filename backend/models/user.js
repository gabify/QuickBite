const mongoose = require('mongoose')
const bcrypt = require('bcrypt')
const validator = require('validator')

const Schema = mongoose.Schema

const userSchema = new Schema({
    email: {
        type: String,
        required: true,
    },
    password: {
        type: String,
        required: true,
    },
    name: {
        type: String,
        required: true
    },
    userLevel: {
        type: String,
        required: true
    }
}, {timestamps: true})

//static signup method
userSchema.statics.signup = async function(email, password, name){
    //validate if all fields are filled
    if(!email || !password || !name){
        throw Error('All fields must be filled!')
    }

    //validate email

    //validate password
    if(!validator.isStrongPassword(password)){
        throw Error('Weak Password. Please use more secured password')
    }

    //check if user exists 
    const exists = await this.findOne({email})
    if(exists){
        throw Error('An account has already been created using this email')
    }

    //Everything is OK
    const salt = await bcrypt.genSalt(15)
    const hashedPassword = await bcrypt.hash(password, salt)
    
    let userLevel = "customer"

    const user = await this.create({email, password: hashedPassword, name, userLevel})

    return user


}

module.exports = mongoose.model('User', userSchema)