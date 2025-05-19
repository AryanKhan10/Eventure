import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { setSelectedEvent } from "../../slices/event";

function EventDetails() {
  const { token } = useSelector((state) => state.auth);
  const { selectedEvent } = useSelector((state) => state.event);
  const [eventDate, setEventDate] = useState(null)
  const [eventTime, setEventTime] = useState(null)
  const dispatch = useDispatch();
  const eventId = useParams();
  console.log(eventId);

  const getEvent = async () => {
    const result = await fetchEventDetails(token, eventId);
    if (result) {
      dispatch(setSelectedEvent(result));
    }
  };

  useEffect(() => {
    fetchEventDetails();
  }, [token, dispatch]);

  if (selectedEvent) {
    const formattedDate = new Date(selectedEvent.dateTime).toLocaleDateString();
    const formattedTime = new Date(selectedEvent.dateTime).toLocaleTimeString(
      [],
      {
        hour: "2-digit",
        minute: "2-digit",
      }

    );
    setEventDate(formattedDate)
    setEventTime(formattedTime)
  }
  return (
    <div className="min-h-screen bg-gray-100 pb-12">
      {loading ? (
        <div>loading..</div>
      ) : (
        <>
          {/* Hero Section */}
          <div className="relative h-96">
            {/* <img 
          src={event.image} 
          alt={event.title}
          className="w-full h-full object-cover"
        /> */}
            <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/30 to-transparent" />
            <button
              onClick={() => navigate(-1)}
              className="absolute top-4 left-4 text-white bg-black/30 p-2 rounded-full hover:bg-black/50 transition-colors"
            >
              <ArrowLeft className="w-6 h-6" />
            </button>
            <button className="absolute top-4 right-4 text-white bg-black/30 p-2 rounded-full hover:bg-black/50 transition-colors">
              <Share2 className="w-6 h-6" />
            </button>
          </div>

          {/* Content */}
          <div className="max-w-4xl mx-auto px-4 -mt-20 relative">
            <div className="bg-white rounded-xl shadow-lg p-6 mb-8">
              <div className="flex justify-between items-start mb-6">
                <div>
                  <h1 className="text-3xl font-bold text-gray-900 mb-2">
                    {selectedEvent.title}
                  </h1>
                  <p className="text-gray-600">
                    Organized by {selectedEvent.organizer}
                  </p>
                </div>
                <div className="bg-purple-100 px-4 py-2 rounded-full">
                  <div className="flex items-center">
                    <Ticket className="w-5 h-5 text-purple-600 mr-2" />
                    <span className="font-semibold text-purple-600">
                      Rs {selectedEvent.ticketPrice}
                    </span>
                  </div>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
                <div className="flex items-center">
                  <Calendar className="w-5 h-5 text-purple-600 mr-3" />
                  <div>
                    <p className="text-sm text-gray-500">Date</p>
                    <p className="font-medium">{eventDate}</p>
                  </div>
                </div>
                <div className="flex items-center">
                  <Clock className="w-5 h-5 text-purple-600 mr-3" />
                  <div>
                    <p className="text-sm text-gray-500">Time</p>
                    <p className="font-medium">{eventTime}</p>
                  </div>
                </div>
                <div className="flex items-center">
                  <Users className="w-5 h-5 text-purple-600 mr-3" />
                  <div>
                    <p className="text-sm text-gray-500">Capacity</p>
                    <p className="font-medium">{selectedEvent.capacity} attendees</p>
                  </div>
                </div>
              </div>

              <div className="mb-8">
                <div className="flex items-start mb-4">
                  <MapPin className="w-5 h-5 text-purple-600 mr-3 mt-1" />
                  <div>
                    <p className="text-sm text-gray-500">Location</p>
                    <p className="font-medium">{selectedEvent.location}</p>
                  </div>
                </div>
              </div>

              <div className="mb-8">
                <h2 className="text-xl font-semibold mb-4">About This Event</h2>
                <div className="prose max-w-none">
                  {selectedEvent.description.split("\n").map((paragraph, index) => (
                    <p key={index} className="mb-4 text-gray-700">
                      {paragraph}
                    </p>
                  ))}
                </div>
              </div>

              {/* <div className="mb-8">
            <h2 className="text-xl font-semibold mb-4">Schedule</h2>
            <div className="space-y-4">
              {event.schedule.map((item, index) => (
                <div key={index} className="flex items-start border-l-2 border-purple-200 pl-4 py-2">
                  <div className="w-24 flex-shrink-0">
                    <p className="font-medium text-purple-600">{item.time}</p>
                  </div>
                  <p className="text-gray-700">{item.activity}</p>
                </div>
              ))}
            </div>
          </div> */}

              <div className="flex justify-center">
                <button className="bg-purple-600 text-white px-8 py-3 rounded-full font-semibold hover:bg-purple-700 transition-colors">
                  Register Now
                </button>
              </div>
            </div>
          </div>
        </>
      )}
    </div>
  );
}

export default EventDetails;
