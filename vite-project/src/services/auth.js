import { authEndpoints } from './api'
import apiConnector from './apiConntector'
import { toast } from 'react-toastify'
import { setLoading } from '../slices/auth'
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