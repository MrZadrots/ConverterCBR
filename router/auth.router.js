const {Router} = require('express')
const bcrypt = require('bcrypt')
const config = require('config')
const jwt = require('jsonwebtoken')
const auth = require('../middleware/auth.middleware')
const {check, validationResult} =require('express-validator')
const router = Router()
const User = require('../model/user')

// /api/auth/login
router.post(
    '/login',
    [
        check('login','Неверный логин').isLength({min:4}),
        check('password','Неверный пароль').isLength({min:4})
    ],
    async (req,res)=>{
       try {
            const errors = validationResult(req)
            if(!errors.isEmpty()){
                return res.status(400).json({
                    errors: errors.array(),
                    message:errors.array()[0].msg
                })
            }
            const {login,password} = req.body
            const user = await User.findOne({login})
            if(!user){
                return res.status(400).json({message: "Неверное имя пользователя или логин"})
            }
            const isMath = await bcrypt.compare(password,user.password)

            if(!isMath){
                return res.status(400).json({message: "Неверное имя пользователя или логин"})
            }
            token = jwt.sign(
                {
                    userId: user.id,
                    userName: user.login,
                    userRole: user.role
                },
                config.get('jwtSecret'),
                {
                    expiresIn: '1h'
                }
            )
            res.json({token,userId:user.id,userName:user.login,userRole:user.role})
       } catch (error) {
            console.log(error.message)
            return res.status(500).json({message: "Что-то пошло ни так!"})
       }
    }

)

router.post(
    '/register',
    [
        check('login','Неверный логин').isLength({min:4}),
        check('password','Неверный пароль').isLength({min:4})
    ],
    async (req,res) => {
        try {
            const errors = validationResult(req)
            if(!errors.isEmpty()){
                return res.status(400).json({
                    errors: errors.array(),
                    message:errors.array()[0].msg
                })
            }

            const {login,password} = req.body
            const candidate = await User.findOne({login})
            
            if(candidate){
                return res.status(401).json({message:"Такой пользователь уже существует"})
            }

            const hash = await bcrypt.hash(password,12)
            const user = new User({login, password:hash})
            await user.save()
            res.status(200).json({message:"Вы успешно зарегистрировались!"})

        } catch (error) {
            console.log(error.message)
            return res.status(500).json({message: "Что-то пошло ни так!"})
       }
    }
)
module.exports =  router



