import { createSlice } from "@reduxjs/toolkit"

const initialState ={
    editable: false,
    events: localStorage.getItem("events") ? localStorage.getItem("events") :[]
}

const eventSlice = createSlice({
    name:"event",
    initialState,
    reducers: {
        setEvent:(state, action)=>{
            state.events = action.payload;
            console.log(action.payload)
            localStorage.setItem("events", JSON.stringify(action.payload))
        },
        setIsEditable:(state, action)=>{
            state.editable = action.payload;
        }
    }
})

export const { setEvent, setIsEditable } = eventSlice.actions
export default eventSlice.reducer