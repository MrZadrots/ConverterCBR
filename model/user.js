const Sequelize = require('sequelize')
const config = require('config')

class User extends Sequelize.Model {}
const sequelize = new Sequelize(
    config.get('database'), config.get('userName'),config.get('password'),{
        dialect: 'postgres',
        pool: {
         max: 5,
         min: 0,
         acquire: 30000,
         idle: 10000
      },
    }
    
 ) 

async function initUser(){
    return new Promise (resolve =>{
        User.init(
            {
                login:{
                    type: Sequelize.STRING,
                    allowNull:false
                },
                password:{
                    type: Sequelize.STRING,
                    allowNull:false
                },
                role:{
                    type: Sequelize.STRING,
                    allowNull:false,
                    defaultValue:'user'
                },
                id:{
                    type: Sequelize.NUMBER,
                    primaryKey:true
                },
            },
            {
                sequelize,
                modelName:'users'
            }
        )
    })
}


exports.user  = {initUser: initUser,userClass:User}