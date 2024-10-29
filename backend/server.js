require('dotenv').config()

const express = require('express')
const { default: mongoose } = require('mongoose')

const app = express()

//middleware
app.use((request, response, next) =>{
    console.log(request.path, request.method)
    next()
})

//initialize the app
mongoose.connect(process.env.DB_URI)
    .then(() =>{
        app.listen(process.env.PORT, ()=>{
            console.log('Connected to the database...')
            console.log('Listening to port 6060...')
        })
    }).catch(err =>{
        console.log(err)
    })



//If no request match 
app.use((request, response) =>{
    response.status(404).json({error: "No such method  exist"})
})

