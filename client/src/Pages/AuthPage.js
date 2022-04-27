import React, {useEffect,useState,useContext} from 'react'
import '../style/AuthPage.css'
import {NavLink } from 'react-router-dom'
import {useHttp} from '../hooks/http.hook'
import {useMessage} from '../hooks/message.hook'
import {AuthContext} from '../context/AuthContext'

export const AuthPage = () =>{
    const auth = useContext(AuthContext)
    const message = useMessage()
    const {loading,error,request,clearError} = useHttp()
    const [form,setForm] = useState({
        login:'',password:''
    })

    useEffect(()=>{
        message(error)
        clearError()
    },[error,message,clearError])

    const changeHandler = event =>{
        setForm({...form, [event.target.name]:event.target.value})
    }

    const loginHandler = async () =>{
        try {
            const data = await request('/api/auth/login','POST',{...form})
            console.log(data)
            auth.login(data.token,data.userId,data.userName,data.userRole)
        } catch (error) {
            console.log(error.message)
        }
    }

    return (
      <div className="dada">
         <div className="container LogIn">
            <div className="row">
                <div className="col-md-offset-3 col-md-6 ">
                    <form className="form-horizontal">
                        <span className="heading">Вход</span>
                        <div className="form-group">
                        <input
                              type="text"
                              className="form-control" 
                              id="login" 
                              name="login"  
                              placeholder="Login"
                              onChange={changeHandler}
                              />
                            <i className="fa fa-user"></i> 
                        </div>
                        <div className="form-group help">
                            <input type="password" className="form-control" id="passwordLog" name="password" onChange={changeHandler} 
                            placeholder="Пароль"/>
                            <i className="fa fa-lock"></i>
                        </div>
                        <div className="form-group">
                            <NavLink to="/"><button type="submit" className="btn btn-default" disabled={loading} onClick={loginHandler}>Вход</button></NavLink>
                        </div>
                    </form>
                    <NavLink className="menu_item" to="/registration">Нет аккаунта?Зарегистрируйтесь!</NavLink>
                </div>
              </div>
       </div>
      </div>
     )

}
