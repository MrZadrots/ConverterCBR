import React, {useEffect,useState,useContext} from 'react'
import '../style/AuthPage.css'
import {NavLink } from 'react-router-dom'
import {useHttp} from '../hooks/http.hook'
import {useMessage} from '../hooks/message.hook'
import {AuthContext} from '../context/AuthContext'


export const RegPage = ()=>{
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

    const registerHandler = async () =>{
        console.log({...form})

        try {
            const data = await request('/api/auth/register','POST',{...form})
            console.log("DATA", data)
            message(data.message)
            if (data.message == "Вы успешно зарегистрировались!") {
                loginHandler()
            }
        } catch (e) {
            console.log(e.message)
        }
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
                  <span className="heading">Регистрация</span>
                  <div className="form-group">
                    <input
                      type="login"
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
                      placeholder="Пароль" />
                    <i className="fa fa-lock"></i>
                  </div>
                  <div className="form-group">
                    <button type="submit" className="btn btn-default" disabled={loading} onClick={registerHandler}>Регистрация</button>
                  </div>
               
                </form>
              </div>
            </div>
          </div>
        </div>
      )
}