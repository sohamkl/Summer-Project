const express = require('express');
const fs = require('fs');

let app = express();
let products = JSON.parse(fs.readFileSync('./Data/products.json', 'utf-8'))

app.use(express.json())

//GET - api/Phones
const getAllProducts = (req, res) => {
    res.status(200).json({
        status: "success",
        count: products.length,
        data: {
            products: products
        }
    })
}
//GET - api/v1/Phones/id
const getProduct = (req, res) => {
    //console.log(req.params);
    const id = +req.params.id*1;

    let product = products.find(el => el.id === id)

    if(!product){
        return res.status(404).json({
            status: "fail",
            message: 'Phone with ID ' +id+ ' is not found'
        })
    }

    res.status(200).json({
        status: "success",
        data: {
            product: product
        }
    });
}
//POST - /api/v1/Phones
const createProduct = (req, res) => {
    const newId = products[products.length - 1].id + 1;

    const newProduct = Object.assign({id: newId}, req.body)

    products.push(newProduct);

    fs.writeFile('./Data/products.json', JSON.stringify(products), (err) => {
        res.status(201).json({
            status: "success",
            data: {
                products: newProduct
            }
        })
    })
    //res.send('Created');
}
//PATCH = api.v1/Phones/id
const updateProduct = (req, res) => {
    let id = req.params.id * 1;
    let productToUpdate = products.find(el => el.id === id);

    if(!productToUpdate){
        res.status(404).json({
            status: "fail",
            message: 'No product object with ID ' +id+ ' is found'
        })
    }
    let index = products.indexOf(productToUpdate);

    Object.assign(productToUpdate, req.body);
    products[index] = productToUpdate;

    fs.writeFile('./Data/products.json', JSON.stringify(products), (err) => {
        res.status(200).json({
            status: "success",
            data: {
                product: productToUpdate
            }
        })
    })
}
//DELETE = api.v1/Phones/id
const deleteProduct = (req, res) => {
    let id = req.params.id*1;
    let productToDelete = products.find(el => el.id === id);

    if(!productToDelete){
        res.status(404).json({
            status: "fail",
            message: 'No product object with ID ' +id+ ' is found'
        })
    }

    let index = products.indexOf(productToDelete);

    products.splice(index, 1);

    fs.writeFile('./Data/products.json', JSON.stringify(products), (err) => {
        res.status(204).json({
            status: "success",
            data: {
                product: null
            }
        })
    })

}

app.route('/api/v1/Phones')
    .get(getAllProducts)
    .post(createProduct)

app.route('/api/v1/Phones/:id')
    .get(getProduct)
    .patch(updateProduct)
    .delete(deleteProduct)


//Create a server
const port = 3000;
app.listen(port, () => {
    console.log('server has started...');
})