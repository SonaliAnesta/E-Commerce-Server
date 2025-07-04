const express = require('express');

// Main router creation
const mainRouter = express.Router();

const userRouter = require('./userRoutes');
const productRouter = require('./productRoutes');

// Sub routes registration
mainRouter.use('/users', userRouter);
mainRouter.use('/products', productRouter);

module.exports = mainRouter;
