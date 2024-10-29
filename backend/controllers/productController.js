const Product = require('../models/product')
const mongoose = require('mongoose')


//Create Product
const createProduct = async(request, response) =>{
    const {name, price, description, category} = request.body

    try{
        const product = await Product.create({name, price, description, category})
        response.status(200).json(product)
    }catch(err){
        response.status(500).json({error: err})
    }
}

//Get all Products
const getProducts = async(request, response) =>{
    const products = await Product.find({})
    response.status(200).json(products)
}

module.exports = {
    createProduct,
    getProducts,
}