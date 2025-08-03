const express = require('express');
const cors = require('cors');
const axios = require('axios'); // <-- add axios here
const app = express();
const dotenv = require('dotenv');
const path = require('path');
const cookieParser = require('cookie-parser');
const profile = require('./routes/ProfileRoutes/profile.js');
const product = require('./routes/MarketRoutes/productRoutes.js');
const order = require('./routes/MarketRoutes/order.js');

app.use(cors({
  origin: 'https://meezantraders-home.onrender.com',
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
  credentials: true
}));
app.use(express.json());
app.use(cookieParser());

dotenv.config({ path: path.join(__dirname, "config/config.env") });
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));

// Your existing routes
app.use('/', profile);
app.use('/', product);
app.use('/', order);

// Proxy route to fetch images from original local backend
app.get('/proxy-image/:filename', async (req, res) => {
  const { filename } = req.params;
  try {
    const response = await axios({
      method: 'get',
      url: `http://127.0.0.1:3000/uploads/${filename}`,
      responseType: 'stream'
    });
    res.setHeader('Content-Type', response.headers['content-type']);
    response.data.pipe(res);
  } catch (error) {
    console.error('Error fetching image:', error.message);
    res.status(404).send('Image not found');
  }
});

module.exports = app;


