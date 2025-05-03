const express = require('express');

// Main router creation
const mainRouter = express.Router();

const userRouter = require('./userRoutes');

// Sub routes registration
mainRouter.use('/users', userRouter);

module.exports = mainRouter;
