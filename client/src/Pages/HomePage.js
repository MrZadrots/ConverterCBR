import React,{useState,useCallback,useContext,useEffect} from 'react'
import {useHttp} from '../hooks/http.hook'
import {AuthContext} from '../context/AuthContext'

export const HomePage = () =>{
    const [valutes,setValutes] = useState([])
    const {loading,request} =  useHttp()
    const {token,userName} = useContext(AuthContext)

    const fetchRate = useCallback(async ()=>{
        try {
           const fetch = await request('/api/valutes/getValutes','POST',null,{
               Authorization: `Bearer ${token}`
           })
           setValutes(fetch)
        } catch (e) {
            
        }
    },[token,request])
    useEffect(()=>{
        fetchRate()
    },[fetchRate])
    return(
       <div className='container'>
            <div className='row'>
                <h1>Welcome</h1>
            </div>
       </div>
    )
}