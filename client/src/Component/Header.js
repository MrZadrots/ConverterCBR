import React, { useContext } from 'react'
import {NavLink, useNavigate} from 'react-router-dom'
import {AuthContext} from '../context/AuthContext'


export const Header = () =>{
    const History = useNavigate()
    const auth = useContext(AuthContext)
    const logoutHandler = event =>{
        event.preventDefault()
        auth.logout()
        History.push('/')
    }

    return(
        <div className="container">
            <div className="row">
                <NavLink className="menu_item" to="/login">Войти</NavLink>
            </div>
        </div>
    )
}