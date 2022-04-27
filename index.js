/*const express = require('express')
const config = require('config')

const fetch = require('node-fetch')*/
const express = require('express')
const config = require('config')
const fetch = require('node-fetch')
const getDataFromCb = require('./utils/getData')
const mongoose = require('mongoose')

/*import express from 'express';
import config  from 'config';
import fetch from 'node-fetch'
import {getDataFromCb} from './getData.js'*/


const app = express();
app.use(express.json({extended:true}))
app.use('/api/auth',require('./router/auth.router'))
app.use('/api/valutes',require('./router/valutes.router'))


const PORT = config.get('port') || 5000

async function start(){
    try {
        await mongoose.connect(config.get('mongoURI'),{
            useNewUrlParser:true,
            useUnifiedTopology:true,
        })
       app.listen(PORT,() => console.log("Server is started on port ",PORT)) 
       getDataFromCb
    } catch (error) {
        console.log("Server error: ",error)
        process.exit(1)
    }
}

start()
//setInterval(getDataFromCb,10000)
