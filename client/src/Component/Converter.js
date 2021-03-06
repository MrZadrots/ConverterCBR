import React,{ useEffect, useState, useContext,useCallback } from 'react'
import {useHttp, } from '../hooks/http.hook'
import { useMessage } from '../hooks/message.hook'
import {AuthContext} from '../context/AuthContext'
import {Loader} from '../Component/Loader'
import "../style/Converter.css"
import {LineChart,XAxis,YAxis,CartesianGrid,Tooltip,Legend,Line} from 'recharts'



export const Converter = ({data}) =>{
    const auth = useContext(AuthContext)
    const message = useMessage()
    const {loading,error,request,clearError}=useHttp()
    const [valueWeek, setValueWeek] = useState([])
    const [dateWeek, setDateWeek] = useState([])

    const [form,setForm] = useState({
        convON:'',roleTO:'',roleON:''
    })

    const [value,setValue] = useState(null)
    useEffect(()=>{
        message(error)
        clearError()  
      },[error,message,clearError]) 
    

    const changeHandler = async (event) =>{
        setForm({...form, [event.target.name]:event.target.value})
        if((event.target.name === 'roleON' && event.target.value != "RU" && event.target.value != "")||
            (event.target.name === 'roleTO' && event.target.value != "RU" && event.target.value != "")){
            const dataSend = {name: event.target.value}
            const fetchS = await fetch("/api/valutes/getWeekData",{
                mode: "cors",
                method:"POST",
                body: JSON.stringify(dataSend),
                headers:{
                "Content-Type": "application/json",
                }
            })
            const data = await fetchS.json()
            const objM = []
            for(let i=0;i<data[0].length;i++){
                const obj = {}
                obj.name = data[1][i]
                obj.Ru = Number(data[0][i])
                objM.push(obj) 
            }
            setDateWeek(objM)

        }
    }


    const clickHandler = async ()=>{
        if(form.convON===''|| form.roleTO==='' || form.roleON===''){
            message("Пустые поля")
            clearError()  
            return
        }
        if(form.roleTO !='RU'&& form.roleON !="RU")
            form.roleTO = "RU"
        const fetchS = await fetch("/api/valutes/convert",{
            mode: "cors",
            method:"POST",
            body: JSON.stringify({...form}),
            headers:{
            "Content-Type": "application/json",
            }
        })
        const data = await fetchS.json()
        setValue(data)
    }
    







    if (loading){
        return <Loader />
    }

    if(!data.length){
        return (
            <div className="contaier ">
                <div className="row ">
                   <div className="col-md-12 text-cent">
                     <p  id="ad" >Курсов пока нет</p>
                   </div>
                </div>
            </div>
        )
    }
    return(
        <div className="container">
            <div className="row InputRow">
                    <div className='col-md InputRow_selectOn'>
                        <select classname="selectOn_Selecter selecter" name="roleON" onChange={changeHandler}>
                            <option selected value="" disabled>Выберите из списка</option>
                            <option value="RU">Российский рубль</option>
                            {data.map(el =>{
                                return(
                                    <option value={el.CharCode}>{el.name}</option>
                                )
                            })}
                        </select>
                    </div>
                    <div className='col-md InputRow_InputBox'>
                        <input
                                type="number"
                                className="form-control InputRow_InputBox_Input" 
                                id="convON" 
                                name="convON"  
                                placeholder="Рубли"
                                onChange={changeHandler}
                        />
                    </div>
                    <div className='col-md InputRow_selectTo'>
                        
                        {form.roleON==='RU' ?
                            <div> 
                                <select  classname="InputRow_selectTo_Selecter  selecter" name="roleTO" onChange={changeHandler}>
                                <option selected value="" disabled>Выберите из списка</option>
                                {data.map(el =>{
                                return(
                                    <option value={el.CharCode}>{el.name}</option>
                                )})}
                                </select>
                            </div>
                        : 
                        <div> 
                        <select  classname="InputRow_selectTo_Selecter  selecter" name="roleTO" onChange={changeHandler}>
                        <option selected value="" disabled>Выберите из списка</option>
                        <option value="RU">Российский рубль</option>
                        </select>
                        </div>}
                    </div>
                    <div className='col-md InputRow_selectClick'>
                        <button className='InputRow_selectClick_Btn' type="button"  onClick = {clickHandler} disabled={loading}>Перевести</button>
                    </div>
            </div>
            <div className='row RezRow'>
                    <div className='text-center RezRow_Rez'>
                            <input
                                type="text"
                                className="form-control RezRow_Rez_Input" 
                                id="convTo" 
                                name="convTo"  
                                placeholder='Результат'
                                value={value}
                            />
                    </div>
            </div>
            <div className='row GraphRow'>
                {dateWeek.length !=0 
                ?<div className='GraphRow_main'>
                    <span>График выбранного курса</span>
                    <LineChart width={600} height={300} data = {dateWeek}
                        margin={{top:5, right:30, left:20,bottom:5}}>
                        <XAxis dataKey="name" />
                        <YAxis />
                        <CartesianGrid strokeDasharray="3 3 " />
                        <Tooltip />
                        <Legend />
                        <Line type="monotone" dataKey="Ru" stroke="#8884d8" activeDot = {{r:7}} />
                     </LineChart>
                </div>
                : <></>}
            </div>
        </div>  
    )
}