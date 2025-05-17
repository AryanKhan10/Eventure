import React, { useEffect } from 'react'
import { useForm } from 'react-hook-form'
import { useDispatch, useSelector } from 'react-redux'
import { setEvent } from '../slices/event'
import { createEvent } from '../services/event'
import { useNavigate } from 'react-router-dom'
function CreateEventForm() {

    const { editable, event } = useSelector( state => state.event )
    const { token } = useSelector( state=> state.auth)
    const dispatch= useDispatch()
    const navigate= useNavigate()
    const {
        setValue,
        getvalues,
        register,
        handleSubmit,
        formState:{errors}
    } = useForm({
        defaultValues: {
      title: '',
      description: '',
      ticketPrice: '',
      location: '',
      capacity: '',
      date: '',
      time: ''
    }
    })

    useEffect(()=>{
        if(editable){
            const formData = getvalues()
            setValue("title",formData.title)
            setValue("description",formData.description)
            setValue("ticketPrice",formData.ticketPrice)
            setValue("dateTime",formData.dateTime)
            setValue("location",formData.location)
            setValue("capacity",formData.capacity)

            // Split dateTime back into date and time if it exists
      if (event.dateTime) {
        const dateObj = new Date(event.dateTime);
        setValue("date", dateObj.toISOString().split('T')[0]);
        setValue("time", `${dateObj.getHours().toString().padStart(2, '0')}:${dateObj.getMinutes().toString().padStart(2, '0')}`);
      }
        }

    },[editable])

    const submit = (data) => {
    // Concatenate date and time into a single dateTime string
    console.log(data)
    let dateTime = null;
    if (data.date && data.time) {
      const [hours, minutes] = data.time.split(':');
      const dateObj = new Date(data.date);
      dateObj.setHours(parseInt(hours, 10), parseInt(minutes, 10));
      dateTime = dateObj.toISOString();
    }

    // Create the final data object, replacing separate date and time with dateTime
    const finalData = {
      ...data,
      dateTime,
    };
    
    // Remove the separate date and time fields
    delete finalData.date;
    delete finalData.time;
    
    console.log("Submitted data:", finalData);
    const result = createEvent(finalData,token)
    
    if(result){
        // navigate('/my-events')
    }
    // dispatch(setEvent(finalData));

  };

  return (
    <div className="bg-white rounded-lg shadow-md border border-gray-100 overflow-hidden">
        <div className="bg-gradient-to-r from-violet-500 to-purple-500 py-4 px-6">
          <h2 className="text-xl font-bold text-white">
            {!editable ? 'Edit Event' : 'Create New Event'}
          </h2>
        </div>
        
        <div className="p-6">
          <form onSubmit={handleSubmit(submit)} className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {/* Title Field */}
              <div>
                <label htmlFor="title" className="block text-sm font-medium text-gray-700 mb-1">
                  Event Title
                </label>
                <input
                  id="title"
                  type="text"
                  placeholder="Enter event title"
                  className={`w-full px-4 py-2 rounded-md border ${
                    errors.title ? "border-red-500" : "border-gray-300"
                  } focus:outline-none focus:ring-2 focus:ring-purple-500 transition-colors`}
                  {...register("title", { required: "Title is required" })}
                />
                {errors.title && <p className="mt-1 text-sm text-red-600">{errors.title.message}</p>}
              </div>

              {/* Ticket Price Field */}
              <div>
                <label htmlFor="ticketPrice" className="block text-sm font-medium text-gray-700 mb-1">
                  Ticket Price ($)
                </label>
                <input
                  id="ticketPrice"
                  type="number"
                  step="0.01"
                  placeholder="0.00"
                  className={`w-full px-4 py-2 rounded-md border ${
                    errors.ticketPrice ? "border-red-500" : "border-gray-300"
                  } focus:outline-none focus:ring-2 focus:ring-purple-500 transition-colors`}
                  {...register("ticketPrice", { 
                    required: "Ticket price is required",
                    min: { value: 0, message: "Price cannot be negative" }
                  })}
                />
                {errors.ticketPrice && <p className="mt-1 text-sm text-red-600">{errors.ticketPrice.message}</p>}
              </div>
            </div>

            {/* Description Field */}
            <div>
              <label htmlFor="description" className="block text-sm font-medium text-gray-700 mb-1">
                Description
              </label>
              <textarea
                id="description"
                rows="4"
                placeholder="Describe your event..."
                className={`w-full px-4 py-2 rounded-md border ${
                  errors.description ? "border-red-500" : "border-gray-300"
                } focus:outline-none focus:ring-2 focus:ring-purple-500 transition-colors resize-none`}
                {...register("description", { required: "Description is required" })}
              ></textarea>
              {errors.description && <p className="mt-1 text-sm text-red-600">{errors.description.message}</p>}
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {/* Location Field */}
              <div>
                <label htmlFor="location" className="block text-sm font-medium text-gray-700 mb-1">
                  Location
                </label>
                <input
                  id="location"
                  type="text"
                  placeholder="Event location"
                  className={`w-full px-4 py-2 rounded-md border ${
                    errors.location ? "border-red-500" : "border-gray-300"
                  } focus:outline-none focus:ring-2 focus:ring-purple-500 transition-colors`}
                  {...register("location", { required: "Location is required" })}
                />
                {errors.location && <p className="mt-1 text-sm text-red-600">{errors.location.message}</p>}
              </div>

              {/* Capacity Field */}
              <div>
                <label htmlFor="capacity" className="block text-sm font-medium text-gray-700 mb-1">
                  Capacity
                </label>
                <select
                  id="capacity"
                  className={`w-full px-4 py-2 rounded-md border ${
                    errors.capacity ? "border-red-500" : "border-gray-300"
                  } focus:outline-none focus:ring-2 focus:ring-purple-500 transition-colors bg-white`}
                  {...register("capacity", { required: "Please select a capacity" })}
                >
                  <option value="">Select capacity</option>
                  <option value="20">20 People</option>
                  <option value="30">30 People</option>
                  <option value="40">40 People</option>
                  <option value="50">50 People</option>
                  <option value="100">100 People</option>
                </select>
                {errors.capacity && <p className="mt-1 text-sm text-red-600">{errors.capacity.message}</p>}
              </div>
            </div>

            {/* Date and Time Fields */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {/* Date Field */}
              <div>
                <label htmlFor="date" className="block text-sm font-medium text-gray-700 mb-1">
                  Event Date
                </label>
                <input
                  id="date"
                  type="date"
                  className={`w-full px-4 py-2 rounded-md border ${
                    errors.date ? "border-red-500" : "border-gray-300"
                  } focus:outline-none focus:ring-2 focus:ring-purple-500 transition-colors`}
                  {...register("date", { required: "Date is required" })}
                />
                {errors.date && <p className="mt-1 text-sm text-red-600">{errors.date.message}</p>}
              </div>

              {/* Time Field */}
              <div>
                <label htmlFor="time" className="block text-sm font-medium text-gray-700 mb-1">
                  Event Time
                </label>
                <input
                  id="time"
                  type="time"
                  className={`w-full px-4 py-2 rounded-md border ${
                    errors.time ? "border-red-500" : "border-gray-300"
                  } focus:outline-none focus:ring-2 focus:ring-purple-500 transition-colors`}
                  {...register("time", { required: "Time is required" })}
                />
                {errors.time && <p className="mt-1 text-sm text-red-600">{errors.time.message}</p>}
              </div>
            </div>

            {/* Submit Button */}
            <div className="pt-4">
              <button
                type="submit"
                className="w-full bg-gradient-to-r from-violet-500 to-purple-500 text-white py-3 rounded-md hover:opacity-90 transition-colors font-medium"
              >
                {editable ? 'Update Event' : 'Create Event'}
              </button>
            </div>
          </form>
        </div>
      </div>
  )
}

export default CreateEventForm
