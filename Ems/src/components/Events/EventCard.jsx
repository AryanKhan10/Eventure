import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Edit, Hand, Trash2 } from "lucide-react";
import { deleteEvent, getAllEvents } from "../../services/event";
import { useDispatch, useSelector } from "react-redux";
import { setEvent, setIsEditable, setSelectedEvent } from "../../slices/event";
import { toast } from "react-toastify";

function EventCard({ event, setConfirmationModal }) {

  const { token } = useSelector((state) => state.auth);
  const [loading, setloading] = useState(false);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const fetchEvents = async () => {
    try {
      const result = await getAllEvents(token);
      console.log(result);
      if (result) {
        dispatch(setEvent(result));
      }
    } catch (error) {
      console.log(error);
      toast.error("Failed to fetch events");
    }
  };

  const handleDelete = async (eventId) => {
    setloading(true);
    const result = await deleteEvent(token, eventId);
    if (result) {
      fetchEvents();
    }
    setConfirmationModal(null);
    setloading(false);
  };

  return (
    <>
      <div className="border-t-[2px] border-gray-300 bg-white rounded-lg overflow-hidden shadow-md hover:shadow-lg transition-shadow duration-300">
        <Link to={`/events/${event.id}`} className="block">
          <div className="relative h-48 overflow-hidden">
            {/* <img 
            src={event.image} 
            alt={event.title}
            className="w-full h-full object-cover"
          /> */}
          </div>
          <div className="p-4">
            <h3 className="text-xl font-semibold text-gray-800 mb-2">
              {event.title}
            </h3>
            <p className="text-sm text-gray-600 mb-1">{event.date}</p>
            <p className="text-sm text-gray-600 mb-2">{event.location}</p>
            <p className="text-sm text-gray-700 line-clamp-2">
              {event.description.length > 100
                ? `${event.description.substring(0, 100)}...`
                : event.description}
            </p>
          </div>
        </Link>
        <div className="flex justify-end p-4 pt-0 space-x-2">
          <button
              onClick={(e) => {
                e.stopPropagation();
                dispatch(setSelectedEvent(event));
                dispatch(setIsEditable(true))
                navigate("/create-event");
              }}
            className="p-2 text-gray-500 hover:text-purple-600 transition-colors"
            aria-label="Edit event"
          >
            <Edit className="cursor-pointer" size={18} />
          </button>
          <button
            className="p-2 text-gray-500 hover:text-red-600 transition-colors"
            aria-label="Delete event"
          >
            <Trash2
              onClick={() => {
                setConfirmationModal({
                  text1: "Do you want to delete this event?",
                  text2: "All the data related to the event will be deleted",
                  btn1Text: "Delete",
                  btn2Text: "Cancel",
                  btn1Handler: !loading
                    ? () => handleDelete(event.id)
                    : () => {},
                  btn2Handler: !loading
                    ? () => setConfirmationModal(null)
                    : () => {},
                });
              }}
              className="cursor-pointer"
              size={18}
            />
          </button>
        </div>
      </div>
    </>
  );
}

export default EventCard;
