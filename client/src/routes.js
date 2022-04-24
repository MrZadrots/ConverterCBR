import React from "react"
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom'
import {AuthPage} from './Pages/AuthPage'
import { HomePage } from "./Pages/HomePage"
import { NotFound} from "./Pages/NotFoundPage"
import {Header} from './Component/Header'
export const useRoutes = isAuthenticated =>{
    //if(isAuthenticated){
        return(

                <Routes>
                    <Route exact path="/" element={<HomePage/>}/>
                    <Route exact path="/login" element={<AuthPage/>}/>
                    <Route path="*" element={<NotFound/>}/>
                </Routes>
        )
    //}
   /*else return(
            <Routes>
                <Route exact path="/login" element={<AuthPage/>}/>
                <Route path="*" element={<NotFound/>}/>
            </Routes>
    )*/
}