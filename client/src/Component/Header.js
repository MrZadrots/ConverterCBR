import React, { useContext } from 'react'
import {NavLink, useNavigate} from 'react-router-dom'
import {AuthContext} from '../context/AuthContext'
import '../style/Header.css'
export const Header = () =>{
    const History = useNavigate()
    const auth = useContext(AuthContext)
    const logoutHandler = event =>{
        event.preventDefault()
        auth.logout()
        History.push('/')
    }
    if(auth.isAuthenticated){
        return(
            <div className="container">
                <div className="row">
                    <div className='col-md  main text-right'>
                        <button className='btn btn-default b_logout'><a className="b_logout" href="/" onClick={logoutHandler}>Выйти</a></button>
                    </div>
                </div>
            </div>
        )
    }
    return(
        <div className="container">
            <div className="row">
                <NavLink className="menu_item" to="/login">Войти</NavLink>
            </div>
        </div>
    )
}