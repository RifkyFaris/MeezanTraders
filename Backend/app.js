const express =require('express');
const cors = require('cors'); 
const app=express();
const dotenv=require('dotenv');

const path=require('path')
dotenv.config({path:path.join(__dirname,"config/config.env")});
const cookieParser=require('cookie-parser')
const profile=require('./routes/ProfileRoutes/profile.js')
const product=require('./routes/MarketRoutes/productRoutes.js')
const order=require('./routes/MarketRoutes/order.js')
const payment=require('./routes/MarketRoutes/paymentRoutes.js')
const connectDatabase = require('./config/database');
connectDatabase();
app.use(cors({
    origin: process.env.FRONTEND_URL,
    methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
    credentials: true
  }));
app.use(express.json())
app.use(cookieParser())


app.use('/uploads',express.static(path.join(__dirname,'uploads')))

app.use('/api/profile',profile);
app.use('/api/product',product);
app.use('/api/order',order);
app.use('/api/payment',payment);

module.exports=app;