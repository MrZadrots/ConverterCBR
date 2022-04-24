const {Router} = require('express')
const bcrypt = require('bcrypt')
const config = require('config')
const jwt = require('jsonwebtoken')
const auth = require('../middleware/auth.middleware')
const {check, validationResult} =require('express-validator')
const valutes = require('../model/valutes');

const router = Router()

router.post(
    '/getValutes',
    [],
    async(req,res) =>{
        var Today = new Date()
        //Today.setMilliseconds(3 * 60 * 60 * 1000);  // +3 часа
        const day = Today.getDate()
        const month = Number(Today.getMonth()) + 1 
        const data = Today.getFullYear() 
        console.log(day)
        console.log(month)
        console.log(data)

        const Dates =  Today.getFullYear() + '-' + month + '-' +Today.getDate()
        console.log(Dates)
    }   
)

module.exports =  router
