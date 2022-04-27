const fetch = require('node-fetch')
const config = require('config')
const schedule = require('node-schedule')
const Valutes = require('../model/valutes')

const UpdateDB = async(req) =>{
    console.log(req[0])
    const candidate = await Valutes.findOne({dateParsing:req[0]})
    if(candidate){
        console.log("Is added")
        return
    }
    const updater = await Valutes.findOneAndUpdate({isLast:true},{isLast:false},{new:true})
    const valute = new Valutes({dateParsing:req[0],cbr:req[1]})
    console.log(valute)
    await valute.save()

    console.log("Added")
}

const getDataFromCb = schedule.scheduleJob('*/5  * * * *',async function (){
    try {
        var Today = new Date()
        Today.setMilliseconds(3 * 60 * 60 * 1000);  // +3 часа
        const data = await fetch('https://www.cbr-xml-daily.ru/daily_json.js')
        if(data.status===200&&data.ok){
            const JSON_DATA = await data.json()
            const Valute = JSON_DATA['Valute']
            const ValuteKeys = Object.keys(Valute)
            let Date =  JSON_DATA['Date'].split('+03:00').join('');
            let result = []
            for(let i=0;i<ValuteKeys.length;i++){
                const tmp = {name:null,nominal:null, value:null}
                tmp.name = Valute[ValuteKeys[i]].Name
                tmp.nominal = Valute[ValuteKeys[i]].Nominal
                tmp.value = Valute[ValuteKeys[i]].Value
                const tmps = {data:tmp}
                const rezP = {}
                rezP[Valute[ValuteKeys[i]].CharCode] = tmps
                result.push(rezP)
            }
            /*for(let i=0;i<Valute.Length;i++)
                console.log(Valute[i])*/
            
            await UpdateDB([Date,result])
        }
        else{
            console.log("Cannt parsing")
            return
        }
    } catch (error) {
        console.log("error",error)
    }
})
module.exports =  getDataFromCb