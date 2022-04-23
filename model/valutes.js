const Sequelize = require('sequelize')
const config = require('config')

class Valutes {
    constructor(){
        console.log("asdasdas")
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
        this.valutes = this.sequelize.define('valutes',{
            dateparsing:{                    
                type: Sequelize.DATE,
                allowNull:false
            },
            aud:{
                type: Sequelize.REAL,
                allowNull:false
            },
            azn:{
                type: Sequelize.REAL,
                allowNull:false
            }, 
            gbp:{
                type: Sequelize.REAL,
                allowNull:false
            }, 
            amd:{
                type: Sequelize.REAL,
                allowNull:false
            }, 
            byn:{
                type: Sequelize.REAL,
                allowNull:false
            }, 
            bgn:{
                type: Sequelize.REAL,
                allowNull:false
            }, 
            brl:{
                type: Sequelize.REAL,
                allowNull:false
            }, 
            huf:{
                type: Sequelize.REAL,
                allowNull:false
            }, 
            hkd:{
                type: Sequelize.REAL,
                allowNull:false
            }, 
            dkk:{
                type: Sequelize.REAL,
                allowNull:false
            }, 
            usd:{
                type: Sequelize.REAL,
                allowNull:false
            }, 
            eur:{
                type: Sequelize.REAL,
                allowNull:false
            }, 
            inr:{
                type: Sequelize.REAL,
                allowNull:false
            }, 
            kzt:{
                type: Sequelize.REAL,
                allowNull:false
            }, 
            cad:{
                type: Sequelize.REAL,
                allowNull:false
            }, 
            kgs:{
                type: Sequelize.REAL,
                allowNull:false
            }, 
            mdl:{
                type: Sequelize.REAL,
                allowNull:false
            }, 
            nok:{
                type: Sequelize.REAL,
                allowNull:false
            }, 
            pln:{
                type: Sequelize.REAL,
                allowNull:false
            }, 
            ron:{
                type: Sequelize.REAL,
                allowNull:false
            }, 
            xdr:{
                type: Sequelize.REAL,
                allowNull:false
            }, 
            sgd:{
                type: Sequelize.REAL,
                allowNull:false
            }, 
            tjs:{
                type: Sequelize.REAL,
                allowNull:false
            }, 
            try:{
                type: Sequelize.REAL,
                allowNull:false
            }, 
            tmt:{
                type: Sequelize.REAL,
                allowNull:false
            }, 
            uzs:{
                type: Sequelize.REAL,
                allowNull:false
            }, 
            uah:{
                type: Sequelize.REAL,
                allowNull:false
            }, 
            czk:{
                type: Sequelize.REAL,
                allowNull:false
            }, 
            sek:{
                type: Sequelize.REAL,
                allowNull:false
            }, 
            chf:{
                type: Sequelize.REAL,
                allowNull:false
            }, 
            zar:{
                type: Sequelize.REAL,
                allowNull:false
            }, 
            krw:{
                type: Sequelize.REAL,
                allowNull:false
            }, 
            jpy:{
                type: Sequelize.REAL,
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
        await this.sequelize.authenticate()
        .then(() => console.log('Connected.'))
        .catch((err) => console.error('Connection error: ', err))
    }
    async getRow(req){
        const isAdded = await this.valutes.findAll({where:{dateparsing:req}, raw:true}).then(val=>{
            console.log('isAdded');
            return val
        }).catch(err=>console.log(err));
        return isAdded
    }
    async setRow(data){
        await this.valutes.create({dateparsing:data[0], aud:data[1], azn:data[2], gbp:data[3], amd:data[4], 
            byn:data[5], bgn:data[6], brl:data[7], huf:data[8], hkd:data[9], dkk:data[10], usd:data[11], 
            eur:data[12], inr:data[13], kzt:data[14], cad:data[15], kgs:data[16], mdl:data[17], nok:data[18], 
            pln:data[19], ron:data[20], xdr:data[21], sgd:data[21], tjs:data[22], try:data[23], tmt:data[24], 
            uzs:data[25], uah:data[26], czk:data[27], sek:data[28], chf:data[29], zar:data[30], krw:data[31], jpy:data[32]}).then(users=>{
                console.log('successfully');
            }).catch(err=>console.log(err));
    }
    async closeConn(){
        await this.sequelize.close()
        .then(() => console.log('Closed.'))
        .catch((err) =>
            console.error('Close connection error: ', err)
        )
    }
}


async function initValutes(sequelize){
    return new Promise (resolve =>{
        Valutes.init(
            {
                dateparsing:{                    
                    type: Sequelize.DATE,
                    allowNull:false
                },
                aud:{
                    type: Sequelize.REAL,
                    allowNull:false
                },
                azn:{
                    type: Sequelize.REAL,
                    allowNull:false
                }, 
                gbp:{
                    type: Sequelize.REAL,
                    allowNull:false
                }, 
                and:{
                    type: Sequelize.REAL,
                    allowNull:false
                }, 
                byn:{
                    type: Sequelize.REAL,
                    allowNull:false
                }, 
                bgn:{
                    type: Sequelize.REAL,
                    allowNull:false
                }, 
                brl:{
                    type: Sequelize.REAL,
                    allowNull:false
                }, 
                huf:{
                    type: Sequelize.REAL,
                    allowNull:false
                }, 
                hkd:{
                    type: Sequelize.REAL,
                    allowNull:false
                }, 
                dkk:{
                    type: Sequelize.REAL,
                    allowNull:false
                }, 
                usd:{
                    type: Sequelize.REAL,
                    allowNull:false
                }, 
                eur:{
                    type: Sequelize.REAL,
                    allowNull:false
                }, 
                inr:{
                    type: Sequelize.REAL,
                    allowNull:false
                }, 
                kzt:{
                    type: Sequelize.REAL,
                    allowNull:false
                }, 
                cad:{
                    type: Sequelize.REAL,
                    allowNull:false
                }, 
                kgs:{
                    type: Sequelize.REAL,
                    allowNull:false
                }, 
                mdl:{
                    type: Sequelize.REAL,
                    allowNull:false
                }, 
                nok:{
                    type: Sequelize.REAL,
                    allowNull:false
                }, 
                pln:{
                    type: Sequelize.REAL,
                    allowNull:false
                }, 
                ron:{
                    type: Sequelize.REAL,
                    allowNull:false
                }, 
                xdr:{
                    type: Sequelize.REAL,
                    allowNull:false
                }, 
                sgd:{
                    type: Sequelize.REAL,
                    allowNull:false
                }, 
                tjs:{
                    type: Sequelize.REAL,
                    allowNull:false
                }, 
                try:{
                    type: Sequelize.REAL,
                    allowNull:false
                }, 
                tmt:{
                    type: Sequelize.REAL,
                    allowNull:false
                }, 
                uzs:{
                    type: Sequelize.REAL,
                    allowNull:false
                }, 
                uah:{
                    type: Sequelize.REAL,
                    allowNull:false
                }, 
                czk:{
                    type: Sequelize.REAL,
                    allowNull:false
                }, 
                sek:{
                    type: Sequelize.REAL,
                    allowNull:false
                }, 
                chf:{
                    type: Sequelize.REAL,
                    allowNull:false
                }, 
                zar:{
                    type: Sequelize.REAL,
                    allowNull:false
                }, 
                krw:{
                    type: Sequelize.REAL,
                    allowNull:false
                }, 
                jpy:{
                    type: Sequelize.REAL,
                    allowNull:false
                }, 
                id:{
                    type: Sequelize.NUMBER,
                    primaryKey:true,
                    autoIncrement:true
                },
            },
            {
                sequelize,
                modelName:'Valutes'
            }
        )
    })
}

module.exports = new Valutes()