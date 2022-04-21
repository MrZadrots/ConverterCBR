//let fetch = await require("node-fetch")
import fetch from 'node-fetch'


export const getDataFromCb = ()=>{
    fetch('https://www.cbr-xml-daily.ru/daily_json.js').then(async(result)=>{
    if(result.status===200 && result.ok){
        return result.json();

    }
    }).then((JSON_DATA)=>{
        console.log('Список получен ', JSON_DATA)
    }).catch((error)=>{
        console.error("Ошибка", error)
    })
}
