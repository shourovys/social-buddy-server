const express = require ('express');
const { logIn, sineUp } = require ('../controllers/UserControllers.js');



const userRouters = express.Router();

userRouters.post('/login', logIn)
userRouters.post('/sineUp', sineUp)

module.exports = userRouters