const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const http =  require('http');
const stripe = require('stripe')(process.env.STRIPE_PAYMENT_GATEWAY_SECRET_KEY); // secret key
const morgan = require('morgan');
const dotenv = require('dotenv').config();

const port = process.env.PORT || 5000;
console.log('process.env.STRIPE_PAYMENT_GATEWAY_SECRET_KEY', process.env.STRIPE_PAYMENT_GATEWAY_SECRET_KEY);
// require('dotenv').config();


const app = express();

// middlewares
app.use('/uploads',express.static('uploads'));
app.use(morgan('dev'));
// app.use(bodyParser.urlencoded({extended:false}));
// app.use(bodyParser.json());
app.use(express.json());

// CORS
app.use((req, res, next) => {
    res.header('Access-Control-Allow-Origin', '*');
    res.header(
        'Access-Control-Allow-Headers',
        'Origin, X-Requested-With, Content-Type, Accept, Authorization'
        );
    
    if(req.method === 'OPTIONS'){
        res.header('Access-Control-Allow-Methods', 'GET, POST, PATCH, DELETE, OPTIONS, PUT');
        return res.status(200).json({});
    }
    next();
});

const productsRoute = require('./api/routes/products');
const orderRoute = require('./api/routes/order');
const userRoute = require('./api/routes/user');

const server = http.createServer(app);
// server.listen(port);
server.listen(port, () => console.log(`Server is running on port ${port}`));



console.log('MONGO_URI', process.env.MONGO_URI);

// mongoose.connect('mongodb://127.0.0.1:27017/ecommerce?retryWrites=true&serverSelectionTimeoutMS=5000&connectTimeoutMS=10000')
// mongoose.connect(process.env.MONGO_URI)
// .then(() => console.log('Database Connected!!!'))
// .catch((err) => console.log('Database connection error', err));
const connectDb = async () => {
    try{
        const connect = await mongoose.connect(process.env.MONGO_URI);
        console.log('Database Connected!!!', connect.connection.host, connect.connection.name)
    } catch(err){
        console.log('Database connection error', err);
        process.exit(1);
    }
}
connectDb();

// routes
app.use('/products', productsRoute);
app.use('/orders', orderRoute);
app.use('/user', userRoute);

app.use((req, res, next) =>{
    const error = new Error('Not Found');
    error.status = 404;
    next(error);
});

// error handles
app.use((error, req, res, next) =>{
    res.status(error.status || 500);
        res.json(
        {error: {
            message: error.message
        }}
    )
});

// https://www.youtube.com/watch?v=0D5EEKH97NA&list=PL55RiY5tL51q4D-B63KBnygU6opNPFk_q&index=12

// app.use((req, res, next) =>{
//     res.status(200).json(
//         {message: 'It works!'}
//     )
//     });



// const DUMMY_PRODUCTS = [];

// app.use(bodyParser.json());



// // roiutes


// app.post('/product', (req, res, next) =>{
//     const {title, price} = req.body;

//     if(!title || title.trim().length === 0 || !price || price <= 0){
//         res.status(422).json(
//             {message: 'Invalid input, please enter valid title and price'}
//         )
//     }

//     const createdProduct = {
//         id: uuid(),
//         title,
//         price
//     };
    
//     DUMMY_PRODUCTS.push(createdProduct);
//     res.status(201).json(
//         {message:'Created new product!',product: createdProduct}
//     )

// });




// app.listen(5000);
