require('dotenv').config();
const express = require('express');
const { connectToDB } = require('./database/db');
const app = express()
const productRoutes = require('./routes/product-routes')
const bookRoutes = require('./routes/book-routes')

const PORT = process.env.PORT || 3000;

app.use(express.json());

connectToDB();

app.use('/api/product', productRoutes);
app.use('/api/book', bookRoutes)

app.listen(PORT, () => {
    console.log("Server is running on port: ", PORT)
})