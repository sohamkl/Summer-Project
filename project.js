const express = require('express');
const fs = require('fs');

let app = express();
let products = JSON.parse(fs.readFileSync('./Data/Phones.json', 'utf-8'))

//GET - api/iPhones
app.get('/api/v1/Phones', (req, res) => {
    res.status(200).json({
        status: "success",
        count: products.length,
        data: {
            products: products
        }
    })
})
//Create a server
const port = 3000;
app.listen(port, () => {
    console.log('server has started...');
})