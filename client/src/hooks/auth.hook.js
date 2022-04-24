import {useState,useCallback,useEffect} from 'react'

const storageName = 'userData'

export const useAuth = () =>{
    const [token,setToken] = useState(null)
    const [userId,setUserId] = useState(null)
    const [userName,setUserName] = useState(null)
    const [userRole,setUserRole] = useState(null)


    const login = useCallback((jwtToken,userIdInput,userNameInput,userRoleInput) =>{
        setToken(jwtToken)
        setUserId(userIdInput)
        setUserName(userNameInput)
        setUserRole(userRoleInput)
        
        localStorage.setItem(storageName, JSON.stringify({
            token: jwtToken, userId: userIdInput, userName: userNameInput, userRole: userRoleInput
        }))
    },[])

    const logout = useCallback(()=>{
        setToken(null)
        setUserId(null)
        setUserName(null)
        setUserRole(null)

        localStorage.removeItem(storageName)
    },[])

    useEffect(()=>{
        const data = JSON.parse(localStorage.getItem(storageName))
        if(data && data.token){
            login(data.token, data.userId, data.userName, data.userRole)
        }
    },[login])

    return {login,logout,token,userId,userName,userRole}
}