const express = require('express');

const dotenv = require('dotenv');

const cors = require('cors');

const cookieParser = require('cookie-parser');

const connectDB = require('./config/db');

const authRoutes = require('./routes/authRoutes');
const cardRoutes = require('./routes/cardRoutes');

const paymentRoutes = require('./routes/paymentRoutes');

const transactionRoutes = require('./routes/transactionRoutes');

const transferRoutes = require('./routes/transferRoutes');
dotenv.config();

connectDB();

const app = express();


// MIDDLEWARE
app.use(express.json());

app.use(cookieParser());

app.use(
  cors({
    origin: 'http://localhost:5173',
    credentials: true,
  })
);


// ROUTES
app.use('/api/auth', authRoutes);

app.use('/api/cards', cardRoutes);

app.use('/api/payments', paymentRoutes);

app.use(
  '/api/transactions',
  transactionRoutes
);



app.use(
  '/api/transfers',
  transferRoutes
);


// SERVER
const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`Server Running ${PORT}`);
});