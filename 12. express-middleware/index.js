const express = require('express');
const  middleware  = require('./middleware');
const app = express();
// to get the env variables



const PORT = process.env.PORT || 3001;



app.use(middleware);

app.get('/', (req, res) => {
    res.send("hello world")
})

app.get('/products', (req, res) => {
    const products = [
        {id: 1, name: "Product 1"},
        {id: 2, name: "Product 2"},
        {id: 3, name: "Product 3"}
    ]
    res.json(products)
})

app.get('/products/:id', (req, res) => {
    const id = parseInt(req.params.id);
    const products = [
        {id: 1, name: "Product 1"},
        {id: 2, name: "Product 2"},
        {id: 3, name: "Product 3"}
    ]
    const found = products.find(products => products.id === id)

    if (found){
    res.json(found)
    }else {
        res.status(404).send({"error": "Product not found"})
    }

})


app.listen(PORT, () => {
    console.log(`Server is listening on port ${PORT}`)
})