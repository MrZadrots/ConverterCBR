const Sequelize = require('sequelize')
const config = require('config')
const { password } = require('pg/lib/defaults')

class User{
    constructor(){
        this.sequelize = new Sequelize(
            config.get('database'), config.get('userName'),config.get('password'),{
                 dialect: 'postgres',
                 pool: {
                     max: 5,
                     min: 0,
                     acquire: 30000,
                     idle: 10000
                 },
                 define: {
                     timestamps: false
                 }
            }
        )

        this.users = this.sequelize.define('users',{
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
                defaultValue:"user",
                allowNull:false
            },
            id:{
                type: Sequelize.NUMBER,
                primaryKey:true,
                autoIncrement:true
            }
        })
         
    }
    

    async getConn(){
        this.sequelize.authenticate()
        .then(() => console.log('Connected.'))
        .catch((err) => console.error('Connection error: ', err))
    }
    async closeCoon(){
        this.sequelize.close()
        .then(() => console.log('Closed.'))
        .catch((err) =>
            console.error('Close connection error: ', err)
        )
    }
    async getUser(req){
        const isSearched = await this.users.findAll({where:{login:req}, raw:true}).then(val=>{
            console.log('successfully Get');
            return val
        }).catch(err=>console.log(err));
        return isSearched
    }
    async setUser(data){
        const user = await this.users.create({login:data[0], password:data[1]}).then(users=>{
                console.log('successfully Set');
                return users
            }).catch(err=>console.log(err));

        return user
    }
}

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


module.exports = new User()