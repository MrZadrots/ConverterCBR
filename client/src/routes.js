import React from "react"
import { BrowserRouter as Router, Route, Routes ,Navigate,Redirect} from 'react-router-dom'
import {AuthPage} from './Pages/AuthPage'
import { HomePage } from "./Pages/HomePage"
import { NotFound} from "./Pages/NotFoundPage"
import {Header} from './Component/Header'
import { RegPage } from "./Pages/RegPage"

export const useRoutes = isAuthenticated =>{
    if(isAuthenticated){
        return(
            <>
                <Routes>    
                    <Route exact path="/" element={<HomePage/>}/>
                    <Route path="*" element={<NotFound/>}/>
                </Routes>
            </>
        )
    }
   else return(
            <Routes>
                <Route exact path="/" element={<AuthPage/>}/>
                <Route exact path="/registration" element={<RegPage/>}/>
                <Route path="*" element={<NotFound/>}/>
            </Routes>

    )
}