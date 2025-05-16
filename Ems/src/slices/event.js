import { createSlice } from "@reduxjs/toolkit"

const initialState ={
    editable: false,
    event: localStorage.getItem("event") ? JSON.parse(localStorage.getItem("event")) :null
}

const eventSlice = createSlice({
    name:"event",
    initialState,
    reducers: {
        setEvent:(state, action)=>{
            state.event = action.payload;
            localStorage.setItem("event", JSON.stringify(action.payload))
        },
        setIsEditable:(state, action)=>{
            state.editable = action.payload;
        }
    }
})

export const { setEvent, setIsEditable } = eventSlice.actions
export default eventSlice.reducer