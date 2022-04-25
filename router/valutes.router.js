const {Router} = require('express')
const bcrypt = require('bcrypt')
const config = require('config')
const jwt = require('jsonwebtoken')
const auth = require('../middleware/auth.middleware')
const {check, validationResult} =require('express-validator')





module.exports =  router
