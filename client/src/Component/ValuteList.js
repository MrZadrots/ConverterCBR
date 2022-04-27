import React,{ useEffect, useState, useContext } from 'react'
import {useHttp, } from '../hooks/http.hook'
import { useMessage } from '../hooks/message.hook'
import {AuthContext} from '../context/AuthContext'
import {Loader} from '../Component/Loader'

export const ValuteList = ({valutes}) =>{
    const auth = useContext(AuthContext)
    const message = useMessage()
    const {loading,error,request,clearError}=useHttp()

    console.log({valutes})
    useEffect(()=>{
        message(error)
        clearError()  
      },[error,message,clearError])

    
    if (loading){
        return <Loader />
    }

    if(!valutes.length){
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
            <div className="row">
                    <table>
                        <tr>
                            <th className='d-none d-lg-table-cell'>Букв.код</th>
                            <th className='d-none d-lg-table-cell'>Единиц</th>
                            <th>Валюта</th>
                            <th>Курс</th>
                        </tr>
                        {valutes.map(val =>{
                        return(
                            <tr>
                                <td className='d-none d-lg-table-cell'>{val.CharCode}</td>
                                <td className='d-none d-lg-table-cell'>{val.nominal}</td>
                                <td>{val.name}</td>
                                <td>{val.value}</td>
                            </tr>
                        )
                            
                    })}
                    </table>
            </div>
        </div>
    )
}