import React, { useEffect, useState } from 'react'
import { toast } from 'react-toastify'
import EventCard from '../components/Events/EventCard'
import { useDispatch, useSelector } from 'react-redux'
import { getAllEvents } from '../services/event'
import { useNavigate } from 'react-router-dom'
import { setEvent } from '../slices/event'
import ConfirmationModal from '../components/ConfirmationModal'
function MyEvent() {

    const {events} = useSelector(state=>state.event)
    const {token} = useSelector(state=>state.auth)
    const [loading, setLoading] = useState(false)
    const [confirmationModal, setConfirmationModal]= useState(false);
    
    const dispatch = useDispatch()
    const navigate = useNavigate()
    console.log(events)


    useEffect(() => {
    const fetchEvents = async () => {
      setLoading(true);
        try {
          const result = await getAllEvents(token);
          if (result) {
            dispatch(setEvent(result));
          }
        } catch (error) {
          toast.error("Failed to fetch events");
        }

      setLoading(false);
    };

    fetchEvents();
  }, [dispatch, token]);
    
   
    
  return (
    <div className="container mx-auto px-4 py-8">
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-3xl font-bold text-gray-800">My Events</h1>
        <button 
          className="px-4 py-2 bg-purple-600 text-white rounded-md hover:bg-purple-700 transition-colors"
          onClick={() => toast.info("Create event functionality will be implemented in the next version")}
        >
          Create Event
        </button>
      </div>
      
      {
        loading ? ( <div>loading...</div> ):(
            events.length === 0 ? (
        <div className="text-center py-12">
          <p className="text-xl text-gray-600">You don't have any events yet.</p>
          <button 
            className="mt-4 px-4 py-2 bg-purple-600 text-white rounded-md hover:bg-purple-700 transition-colors"
            onClick={() => toast.info("Create event functionality will be implemented in the next version")}
          >
            Create Your First Event
          </button>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 justify-center">
          {Array.isArray(events) && events.map(event => (
            <EventCard 
              key={event.id} 
              event={event}
              setConfirmationModal={setConfirmationModal} 

            />
          ))}
        </div>
      )
        )
      }

      {
        confirmationModal && 
            <ConfirmationModal data={confirmationModal}/>
    }
    </div>
  )
}

export default MyEvent
