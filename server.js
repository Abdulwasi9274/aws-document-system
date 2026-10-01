import dotenv from 'dotenv';
dotenv.config();

import express from 'express';
import './config/db.js'

import userRoutes from './routes/userRoute.js';
import productRoutes from './routes/productRoute.js'
import orderRoutes from './routes/orderRoute.js';
import testRoutes from './routes/mailRoute.js';

import './cron/reminderJob.js'

const app = express();
app.use(express.json());




app.use("/api/users", userRoutes);

app.use("/api/products", productRoutes);
app.use("/api/orders", orderRoutes);
app.use("/api/test", testRoutes)

app.get('/', (req, res) => {
    res.json({
        message: 'Backend is Running',
        data: null
    })
});


const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
    console.log(`server is running on port  ${PORT}`)
});