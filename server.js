const express = require('express');
require('dotenv').config();
require('colors');
const connectDB = require('./config/db');
const { notFound, errorHandler } = require('./middlewares/errorMiddleware');

// connect database
connectDB();

// routes
const userRoutes = require('./routes/userRoute');

const app = express();

//  middlewares
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// routes middleware
app.use('/api/users', userRoutes);

app.get('/', (req, res) => {
  res.send('API is running....');
});

// error middlewares
app.use(notFound);
app.use(errorHandler);

// listen to server
const PORT = process.env.PORT || 5000;

app.listen(PORT, console.log(`Server running on port ${PORT}`.yellow.bold));
