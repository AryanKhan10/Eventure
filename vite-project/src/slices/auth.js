import { createSlice } from "@reduxjs/toolkit"

const initialState = {
    user: localStorage.getItem("user")
        ? JSON.parse(localStorage.getItem("user"))
        : null,
    token: localStorage.getItem("token")
        ? JSON.parse(localStorage.getItem("token"))
        : null,
    loading:false

}

const authSlice = createSlice({
    name: "auth",
    initialState,
    reducers:{
        setToken:(state,action)=>{
            state.token = action.payload
            localStorage.setItem("token", JSON.stringify(action.payload))
        },
        setUser:(state,action)=>{
            state.user = action.payload
            localStorage.setItem("user", JSON.stringify(action.payload))
        },
        setLoading:(state,action)=>{
            state.user = action.payload
        }
    }

})
export const { setToken, setUser, setLoading } = authSlice.actions
export default authSlice.reducer
// export { authSlice }