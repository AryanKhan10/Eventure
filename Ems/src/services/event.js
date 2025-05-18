import { eventEndpoints } from "./api";
import { toast } from "react-toastify";
import apiConnector from "./apiConntector";
export const createEvent = async(data, token)=>{
    console.log(token)
    try {
        const res = await apiConnector("POST",eventEndpoints.CREATE_EVENT_API,data,
            {authorization: `Bearer ${token}`}
        )
        console.log(res.data)
        console.log(res.data)
        if(!res.data.success){
            toast.error(res.data.message || "Couldn't create an event");
            throw new Error("Error creating an event")
        }
        toast.success(res.data.message || "Event created")

        return res.data.event

    } catch (error) {
        console.log("Error creating an event",error)
        toast.error(error?.response?.data?.message || error.message || "Something went wrong during event creation");
    }

}
export const getAllEvents = async(token)=>{
    try {
        const res = await apiConnector("GET",eventEndpoints.GET_ALL_EVENTS_API,null,
            {authorization: `Bearer ${token}`}
        )
        console.log(res.data)

        if(!res.data.success){
            toast.error(res.data.message || "Couldn't fetch events");
            throw new Error("Error fetching events")
        }
        // toast.success(res.data.message || "Got All Events")

        return res.data.events

    } catch (error) {
        console.log("Error fetching events",error)
        toast.error(error?.response?.data?.message || error.message || "Something went wrong while fetching eventts");
    }

}
export const deleteEvent = async(token,eventId)=>{
    try {
        const res = await apiConnector("DELETE",`${eventEndpoints.DELETE_EVENT_API}/${eventId}`,null,
            {authorization: `Bearer ${token}`}, 
        )
        console.log(res.data)

        if(!res.data.success){
            toast.error(res.data.message || "Couldn't fetch events");
            throw new Error("Error fetching events")
        }
        toast.success(res.data.message || "Got All Events")

        return true

    } catch (error) {
        console.log("Error fetching events",error)
        toast.error(error?.response?.data?.message || error.message || "Something went wrong while fetching eventts");
    }

}