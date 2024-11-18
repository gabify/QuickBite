require('dotenv').config()

const express = require('express')
const { default: mongoose } = require('mongoose')
const cors = require('cors')

const productRoutes = require('./routes/productRoutes')
const userRoutes = require('./routes/userRoutes')
const app = express()

//middleware
let corsOptions = {
    origin: ['http://127.0.0.1:5500']
}

app.use(cors(corsOptions))
app.use(express.json())
app.use((request, response, next) =>{
    console.log(request.path, request.method)
    next()
})

//initialize the app
mongoose.connect(process.env.DB_URI)
    .then(() =>{
        app.listen(process.env.PORT, ()=>{
            console.log('Connected to the database...')
            console.log('Listening to port', process.env.PORT)
        })
    }).catch(err =>{
        console.log(err)
    })

const requestMapper = '/api/v1';

//product routes
app.use(requestMapper+ '/product', productRoutes)

//user routes
app.use(requestMapper + '/user', userRoutes)


//If no request match 
app.use((request, response) =>{
    response.status(404).json({error: "No such method  exist"})
})

