const express = require('express');
const cookieParser = require('cookie-parser');
const cors = require('cors');
const authRoutes = require('./routes/authRoutes');
const auth = require('./middleware/auth');

require('dotenv').config();
require('./database/mongoose');

const app = express();

app.use(cors({
    credentials: true,
    allowedHeaders: ['Content-Type', 'Authorization'],
    origin: ['http://localhost:3000']
}));
app.use(express.json());
app.use(cookieParser());
app.use(authRoutes);

app.get('/hello', auth, (req, res) => {
    try {
        res.json({"message": "hello worlds"});
    } catch(err) {
        res.json({"message": err.message});
    }
})

module.exports = app;