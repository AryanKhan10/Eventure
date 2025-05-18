import { createSlice } from "@reduxjs/toolkit"

const initialState ={
    editable: false,
    selectedEvent:null,
    events: localStorage.getItem("events") ? JSON.parse(localStorage.getItem("events")) :[]
}

const eventSlice = createSlice({
    name:"event",
    initialState,
    reducers: {
        setEvent:(state, action)=>{
            state.events = action.payload;
            localStorage.setItem("events", JSON.stringify(action.payload))
        },
        setIsEditable:(state, action)=>{
            state.editable = action.payload;
        },
        setSelectedEvent:(state, action)=>{
            state.selectedEvent = action.payload;
        }
    }
})

export const { setEvent, setIsEditable, setSelectedEvent } = eventSlice.actions
export default eventSlice.reducer