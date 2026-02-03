require('dotenv').config()
const express = require('express');
const connectToDB = require('./database/db');
const bookRoutes = require('./routes/book-routes')
const authRoutes = require('./routes/auth-routes');
const homeRoutes = require('./routes/home-routes')

const app = express();
const PORT = process.env.PORT || 3000;

//connect to our database
connectToDB();

//middleware -> express.json()
app.use(express.json()) //returns a middleware which parses incoming json requests and puts the parsed data in req.body


//routes here
app.use('/api/book', bookRoutes);
app.use('/api/auth', authRoutes);
app.use('/api/home', homeRoutes);



app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
})