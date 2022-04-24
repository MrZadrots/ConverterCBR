import React, {useEffect,useState,useContext} from 'react'
import '../index.css'
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

    const registerHandler = async () =>{
        console.log({...form})

        try {
            const data = await request('/api/auth/register','POST',{...form})
            message(data.message)
        } catch (e) {
            console.log(e.message)
        }
    }

    const loginHandler = async () =>{
        try {
            const data = await request('/api/auth/login','POST',{...form})
            auth.login(data.token,data.userId,data.userName,data.userRole)
        } catch (error) {
            console.log(error.message)
        }
    }

    return (
        <div className="container LogIn">
        <div className="row">
          <div className="col-md-offset-3 col-md-6">
            <div className="tab" role="tabpanel">
              <ul className="nav nav-tabs" role="tablist">
                <li role="presentation" className="active">
                  <a href="#Section1" aria-controls="home"role="tab" data-toggle="tab">Войти</a>
                </li>
                <li role="presentation">
                  <a href="#Section2" aria-controls="profile" role="tab" data-toggle="tab">Регистрация</a>
                </li>
              </ul>
              <div className="tab-content tabs">
                <div role="tabpanel" className="tab-pane fade in active" id="Section1">
                  <form className="form-horizontal">
                    <div className="form-group">
                      <label htmlFor="login">Логин</label>
                      <input 
                      type="text" 
                      className="form-control" 
                      id="loginLog" 
                      name="login"
                      onChange={changeHandler}
                      />
                    </div>
                    <div className="form-group">
                      <label htmlFor="password">Пароль</label>
                      <input 
                      type="password" 
                      className="form-control" 
                      id="passwordLog"
                      name="password"
                      onChange={changeHandler}
                      />
                    </div>
                    <div className="form-group">
                      <button type="submit" className="btn btn-default" disabled={loading} onClick={loginHandler}>
                        Войти
                      </button>
                    </div>
                  </form>
                </div>
                <div role="tabpanel" className="tab-pane fade" id="Section2">
                  <form className="form-horizontal">
                    <div className="form-group">
                      <label htmlFor="login">Логин</label>
                      <input 
                      type="text" 
                      className="form-control" 
                      id="login" 
                      name="login"
                      onChange={changeHandler}
                      />
                    </div>
                    <div className="form-group">
                      <label htmlFor="password">Пароль</label>
                      <input 
                      type="password" 
                      className="form-control" 
                      id="password" 
                      name="password"
                      onChange={changeHandler}
                      />
                    </div>
                    <div className="form-group">
                      <button type="submit" className="btn btn-default" onClick={registerHandler} disabled={loading}>
                        Регистрация
                      </button>
                    </div>
                  </form>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

    )

}
