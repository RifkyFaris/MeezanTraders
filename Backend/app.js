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





app.use(cors({
    origin: process.env.FRONTEND_URL,
    methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
    credentials: true
  }));
app.use(express.json())
app.use(cookieParser())

app.use('/uploads',express.static(path.join(__dirname,'uploads')))

app.use('/',profile);
app.use('/',product);
app.use('/',order);
module.exports=app;