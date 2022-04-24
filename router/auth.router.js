const {Router} = require('express')
const bcrypt = require('bcrypt')
const config = require('config')
const jwt = require('jsonwebtoken')
const auth = require('../middleware/auth.middleware')
const {check, validationResult} =require('express-validator')
const router = Router()
const users = require('../model/user');


// /api/auth/login
router.post(
    '/login',
    [
        check('login','Неверный логин').isLength({min:4}),
        check('password','Неверный пароль').isLength({min:4})
    ],
    async(req,res)=>{
        try {
            const errors = validationResult(req)

            if(!errors.isEmpty()){
                return res.status(400).json({
                    errors: errors.array(),
                    message:errors.array()[0].msg
                })
            }

            console.log(req.body)
            const {login,password} = req.body
            await users.getConn()
            console.log(login)
            const user = await users.getUser(login)
            //await users.closeCoon()

            if(user.length===0){
                return res.status(400).json({message: "Нет такого пользователя"})
            }
            console.log("USER", user[0].login)
            const isMath = bcrypt.compare(user[0].password,password)
            if(!isMath ){
                return res.status(400).json({message: "Неверный пароль, попробуйте снова!"})
            }

            token = jwt.sign(
                {
                    userId:user[0].id,
                    userName: user[0].login,
                    userRole: user[0].role
                },
                config.get('jwtSecret'),
                {
                    expiresIn:'1h'
                }
            )

            res.json({token,userId:user[0].id,userName:user[0].login,userRole:user[0].role})

        } catch (error) {
            res.status(500).json({message: error.message})
        }
    }
)

router.post(
    '/register',
    [
        check('login','Неверный логин').isLength({min:4}),
        check('password','Неверный пароль').isLength({min:4})
    ],
    async(req,res) =>{
        try {
            const errors = validationResult(req)
            if(!errors.isEmpty()){
                return res.status(400).json({
                    errors: errors.array(),
                    message:errors.array()[0].msg
                })
            }
            console.log(req.body)
            const login =  req.body.login
            const pass = await bcrypt.hash(req.body.password,12)
            console.log(pass.length)
            
            
            await users.getConn()
            const candidate = await users.getUser(login)
            if(candidate.length != 0){
                return res.status(400).json({message:"Такой пользователь уже существует!"})
            }

            const user = await users.setUser([login,pass])
            const userData = user.dataValues
            console.log("tyPE", typeof(user))
            console.log("USER", user)
            console.log("USER[0]", user.dataValues)
            console.log("login", userData.login)

            res.status(201).json({message: 'Пользователь создан!'})
        } catch (error) {
            res.status(500).json({message:error.message})
        }
    }
)

module.exports=  router