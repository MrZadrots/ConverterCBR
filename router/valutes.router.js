const {Router} = require('express')
const bcrypt = require('bcrypt')
const config = require('config')
const jwt = require('jsonwebtoken')
const auth = require('../middleware/auth.middleware')
const {check, validationResult} =require('express-validator')
const Valutes = require('../model/valutes')
const router = Router()

const convertDate = datePars =>{
    datePars = datePars.split(" ").join()
    const index = datePars.indexOf('T')
    let tmp = datePars.slice(1,index)
    let year = tmp.slice(0,4)
    let day = tmp.slice(tmp.length-2,tmp.length)
    let months = tmp.split(year+'-').join("")
    let month = months.split('-'+day).join("")
    const rez = day + '-' + month + '-' + year
    return rez

}
const convertValutes = tmp =>{
    let rez = []
    for(let i=0;i<tmp.length;i++){
        const data = tmp[i].toObject()
        const Keys = Object.keys(data)
        const dataV = data[Keys[0]].data
        rez.push({CharCode: Keys[0], name: dataV.name, nominal: dataV.nominal, value: dataV.value})
    }
    return rez
}

const createWeekData = (data,code) =>{
    const ValueMas = []
    const dateMas = []
    for(let i=0;i<data.length;i++){
        const dateParsing = JSON.stringify(data[i].dateParsing)
        const rez = convertValutes(data[i].cbr)
        for(let i=0;i<rez.length;i++){
            if(rez[i].CharCode === code){
                console.log("SDad")
                ValueMas.push(rez[i].value)
                continue
            }
        }
        
        dateMas.push(convertDate(dateParsing))
    }

    console.log(ValueMas)   

    return [ValueMas.reverse(),dateMas.reverse()]
}
router.post(
    '/getValutes',
    [],
    async (req,res) =>{
        try {
            
            const valutes = await Valutes.findOne({isLast:true})
            if(!valutes)
                return res.status(501).json({message:"Ой, попробуйте позже"})
            const dateParsing = JSON.stringify(valutes.dateParsing)

            //console.log(rez)
            res.json([convertDate(dateParsing),convertValutes(valutes.cbr)])
            
        } catch (error) {
            console.log(error.message)
            return res.status(501).json({message:"Ой, попробуйте позже"})
        }

    }
)

router.post(
    '/convert',
    [],
    async (req,res) =>{
        const {convON, roleTO,roleON} = req.body
        const valutes = await Valutes.findOne({isLast:true})
        if(!valutes)
            return res.status(501).json({message:"Ой, попробуйте позже"})
        const data = convertValutes(valutes.cbr)
        if(roleTO==="RU"){
            for(let i=0;i<data.length;i++){

                console.log(data[i].CharCode)
                if(data[i].CharCode == roleON){
                    const rezult = convON/data[i].nominal*data[i].value
                    return res.json(rezult)
                }   
            }
        }
        if(roleON ==="RU"){
            for(let i=0;i<data.length;i++){

                console.log(data[i].CharCode)
                if(data[i].CharCode == roleTO){
                    const rezult = convON*data[i].nominal/data[i].value
                    return res.json(rezult)
                }   
            }
        }
        //console.log(data)
        res.json({message:"adsda"})
    }
)


router.post(
    '/getWeekData',
    [],
    async (req,res) =>{
        try {
            const data = await Valutes.find().sort({$natural:-1}).limit(7)
            const rez = createWeekData(data,req.body.name)
            res.status(200).json(rez)
        } catch (error) {
            res.status(501).json({message:error})
        }   
    }
)
module.exports = router
