import { setToken, setUser } from '../slices/auth'
import { authEndpoints } from './api'
import apiConnector from './apiConntector'
import { toast } from 'react-toastify'

export const signup = async(data)=>{

    try {
        const res = await apiConnector("POST",authEndpoints.SIGNUP_API,data)
        console.log(res.data)
        if(!res.data.success){
            throw new Error("Error while singing up")
        }
        toast.success("Registered Successfully!")

        return res.data

    } catch (error) {
        console.log("Error while singing up",error)


    }

}
export const login = async(data)=>{
    
    try {
        const res = await apiConnector("POST",authEndpoints.LOGIN_API,data)
        console.log(res.data)
        if(!res.data.success){
            console.log("asdas")
            toast.error(res.data.message || "Login failed");
            throw new Error("Error while logging")
        }
        toast.success("logged In Successfully!")

        return res.data

    } catch (error) {
        console.log("Error while logging",error)
        toast.error(error?.response?.data?.message || error.message || "Something went wrong during login");
    }

}
export const logout = async(dispatch)=>{
    dispatch(setUser(null))
    dispatch(setToken(null))
    localStorage.removeItem('token')
    localStorage.removeItem('user')
    toast.success("Logged Out")
}

