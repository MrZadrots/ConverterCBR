import React,{useState,useCallback,useContext,useEffect} from 'react'
import {useHttp} from '../hooks/http.hook'
import {AuthContext} from '../context/AuthContext'
import {Loader} from '../Component/Loader'
import {ValuteList} from '../Component/ValuteList'
import {Header} from '../Component/Header'
import { Converter } from '../Component/Converter'



export const HomePage = () =>{
    const [valutes,setValutes] = useState([])
    const [dateParsing,setDate] = useState(null)
    const {loading,request} =  useHttp()
    const {token,userName} = useContext(AuthContext)

    const fetchValue = useCallback(async ()=>{
        try {
            const fetch = await request('/api/valutes/getValutes','POST',null)   
            setDate(fetch[0])
            setValutes(fetch[1])
            loading = false

        } catch (e) {   
            
        }
    },[token,request,])
    
    
    useEffect(()=>{
        fetchValue()
    },[fetchValue])
    if (loading){
        return <Loader />
    }
    return(
       
        <div className='container'>
            {<Header />}
            {<Converter  data = {valutes}/> }

            <h2>Дата обновления базы данных: {dateParsing}</h2>
            {!loading && <ValuteList valutes = {valutes} />}
        </div>
    )

    /*return(
        <div>
            <h1>{dateParsing}</h1>
            <div>
                {valutes.map(val =>{
                    <p>{val.name}</p>
                })}
            </div>
        </div>
    )*/
}