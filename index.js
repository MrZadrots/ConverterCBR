/*const express = require('express')
const config = require('config')

const fetch = require('node-fetch')*/
const express = require('express')
const config = require('config')
const fetch = require('node-fetch')
const getDataFromCb = require('./getData')
/*import express from 'express';
import config  from 'config';
import fetch from 'node-fetch'
import {getDataFromCb} from './getData.js'*/


const app = express();
app.use(express.json({extended:true}))

const PORT = config.get('port') || 5000

async function start(){
    try {
       app.listen(PORT,() => console.log("Server is started on port ",PORT)) 
       //getDataFromCb
       console.log("asdasdasdasdasdsadasdasdasdsda")
    } catch (error) {
        console.log("Server error: ",error)
        process.exit(1)
    }
}

start()
//setInterval(getDataFromCb,10000)
