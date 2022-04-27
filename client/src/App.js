import './App.css';
import React  from 'react';
import {useRoutes} from './routes'
import {useAuth} from './hooks/auth.hook'
import {AuthContext} from './context/AuthContext'
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom'
import {AuthPage} from './Pages/AuthPage'
import { NotFound} from "./Pages/NotFoundPage"
import { HomePage } from './Pages/HomePage';
import {Header} from './Component/Header'


function App() {
  const {login,logout,token,userId,userName,userlastname,userphone,userrate}=useAuth()
  const isAuthenticated = !!token
  const routes = useRoutes(isAuthenticated)


  return (
    <AuthContext.Provider value={{
     login,logout,token,userId,userName,userlastname,userphone,userrate,isAuthenticated 
    }}>
      {isAuthenticated }
      {routes}
    </AuthContext.Provider>
   );
}

export default App;
