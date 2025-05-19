import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { deleteEvent, getAllEvents } from "../../services/event";
import { useDispatch, useSelector } from "react-redux";
import { setEvent, setIsEditable, setSelectedEvent } from "../../slices/event";
import { toast } from "react-toastify";
import { Calendar, Clock, MapPin, Users, Ticket, Edit, Trash2, ArrowRight } from "lucide-react";

// function EventCard({ event, setConfirmationModal }) {

//   console.log(event)
//   const { token } = useSelector((state) => state.auth);
//   const [loading, setloading] = useState(false);
//   const dispatch = useDispatch();
//   const navigate = useNavigate();

//   const fetchEvents = async () => {
//     try {
//       const result = await getAllEvents(token);
//       console.log(result);
//       if (result) {
//         dispatch(setEvent(result));
//       }
//     } catch (error) {
//       console.log(error);
//       toast.error("Failed to fetch events");
//     }
//   };

//   const handleDelete = async (eventId) => {
//     setloading(true);
//     const result = await deleteEvent(token, eventId);
//     if (result) {
//       fetchEvents();
//     }
//     setConfirmationModal(null);
//     setloading(false);
//   };
//   const formattedDate = new Date(event.dateTime).toLocaleDateString();
//   const formattedTime = new Date(event.dateTime).toLocaleTimeString([], {
//     hour: "2-digit",
//     minute: "2-digit",
//   });
//   return (
//     <>
    
//       <div className="border-t-[2px] border-gray-300 bg-white rounded-lg overflow-hidden shadow-md hover:shadow-lg transition-shadow duration-300">
//         <Link to={`/events/${event.id}`} className="block">
//           <div className="relative h-48 overflow-hidden">
//             {/* <img 
//             src={event.image} 
//             alt={event.title}
//             className="w-full h-full object-cover"
//           /> */}
//           </div>
//           <div className="p-4">
//             <div className="flex justify-between items-center">
//               <h3 className="text-xl font-semibold text-gray-800 mb-2">
//                 {event.title}
//               </h3>
//               <span>{event.capacity} M. Attendies</span>
//           </div>
//           <div className="">

//             <p className="text-sm text-gray-600 mb-1">{formattedDate}</p>
//             <p className="text-sm text-gray-600 mb-1">{formattedTime}</p>
//             <p className="text-sm text-gray-600 mb-2">{event.location}</p>
//             <p className="text-sm text-gray-700 line-clamp-2">
//               {event.description.length > 100
//                 ? `${event.description.substring(0, 100)}...`
//                 : event.description}
//             </p>
//           </div>
//           </div>
//         </Link>
//         <div className="flex justify-between p-4 pt-0 space-x-2">
//                 <p>Rs {event.ticketPrice}</p>
//           <div>
//             <button
//               onClick={(e) => {
//                 e.stopPropagation();
//                 dispatch(setSelectedEvent(event));
//                 dispatch(setIsEditable(true))
//                 navigate("/create-event");
//               }}
//             className="p-2 text-gray-500 hover:text-purple-600 transition-colors"
//             aria-label="Edit event"
//           >
//             <Edit className="cursor-pointer" size={18} />
//           </button>
//           <button
//             className="p-2 text-gray-500 hover:text-red-600 transition-colors"
//             aria-label="Delete event"
//           >
//             <Trash2
//               onClick={() => {
//                 setConfirmationModal({
//                   text1: "Do you want to delete this event?",
//                   text2: "All the data related to the event will be deleted",
//                   btn1Text: "Delete",
//                   btn2Text: "Cancel",
//                   btn1Handler: !loading
//                     ? () => handleDelete(event.id)
//                     : () => {},
//                   btn2Handler: !loading
//                     ? () => setConfirmationModal(null)
//                     : () => {},
//                 });
//               }}
//               className="cursor-pointer"
//               size={18}
//             />
//           </button>
//           </div>
//         </div>
//       </div>
//     </>
//   );
// }

// export default EventCard;


const EventCard = ({ event, setConfirmationModal }) => {
  // console.log(event)
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
  const formattedDate = new Date(event.dateTime).toLocaleDateString();
  const formattedTime = new Date(event.dateTime).toLocaleTimeString([], {
    hour: "2-digit",
    minute: "2-digit",
  });

  return (
    <div className="bg-white rounded-xl overflow-hidden shadow-md hover:shadow-lg transition-all duration-300 transform hover:-translate-y-1 border border-gray-200">
      {/* Image Container */}
      <Link to={`/events/${event.id}`} className="block">
      <div className="relative h-52 overflow-hidden">
        <img 
          src={event.image} 
          alt={event.title}
          className="w-full h-full object-cover"
        />
        <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/70 to-transparent h-16" />
        <div className="absolute top-3 right-3 bg-white/90 px-3 py-1 rounded-full flex items-center shadow-sm">
          <Ticket className="w-4 h-4 text-purple-600 mr-1" />
          <span className="text-sm font-medium text-gray-800">₹{event.ticketPrice}</span>
        </div>
      </div>
      
      {/* Content Container */}
      <div className="p-5">
        {/* Header with Title and Capacity */}
        <div className="flex justify-between items-start mb-3">
          <h3 className="text-xl font-bold text-gray-800 leading-tight hover:text-purple-700 transition-colors">
            {event.title}
          </h3>
          <div className="flex items-center text-gray-600 bg-purple-50 px-2 py-1 rounded-full">
            <Users className="w-4 h-4 mr-1 text-purple-600" />
            <span className="text-sm font-medium">{event.capacity}</span>
          </div>
        </div>
        
        {/* Event Details */}
        <div className="space-y-2 mb-4">
          <div className="flex items-center text-gray-600">
            <Calendar className="w-4 h-4 mr-2 text-purple-600 flex-shrink-0" />
            <p className="text-sm">{formattedDate}</p>
          </div>
          
          <div className="flex items-center text-gray-600">
            <Clock className="w-4 h-4 mr-2 text-purple-600 flex-shrink-0" />
            <p className="text-sm">{formattedTime}</p>
          </div>
          
          <div className="flex items-center text-gray-600">
            <MapPin className="w-4 h-4 mr-2 text-purple-600 flex-shrink-0" />
            <p className="text-sm line-clamp-1">{event.location}</p>
          </div>
        </div>
        
        {/* Description */}
          <p className="text-sm text-gray-700 line-clamp-2 mb-4">
            {event.description.length > 100
              ? `${event.description.substring(0, 100)}...`
              : event.description}
          </p>
        </div>
        </Link>
        {/* Footer with Actions */}
        <div className="flex justify-end items-center pt-2 border-t border-gray-100 px-3">
          <div className="flex space-x-1">
            <button
              onClick={(e) => {
                e.stopPropagation();
                dispatch(setSelectedEvent(event));
                dispatch(setIsEditable(true))
                navigate("/create-event");
              }}
              className="p-2 cursor-pointer text-purple-600 transition-colors hover:bg-purple-50 rounded-full"
              aria-label="Edit event"
            >
              <Edit className="w-5 h-5" />
            </button>
            
            <button
              onClick={() => {
                setConfirmationModal({
                  text1: "Delete this event?",
                  text2: "All data related to this event will be permanently deleted.",
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
              className="p-2 cursor-pointer text-red-600 transition-colors hover:bg-red-50 rounded-full"
              aria-label="Delete event"
            >
              <Trash2 className="w-5 h-5" />
            </button>
          </div>
        </div>
      </div>
  );
};

export default EventCard;