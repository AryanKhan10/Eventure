// import React, { useEffect } from "react";
// import { useDispatch, useSelector } from "react-redux";
// import { useParams } from "react-router-dom";
// import { setSelectedEvent } from "../../slices/event";

// function EventDetails() {
//   const { token } = useSelector((state) => state.auth);
//   const dispatch = useDispatch();
//   const eventId = useParams();
//   console.log(eventId);
//   const getEvent = async () => {
//     const result = await fetchEventDetails(token, eventId);
//     if (result) {
//       dispatch(setSelectedEvent(result));
//     }
//   };
//   useEffect(() => {}, [token, dispatch]);
//   return (
//     <div className="min-h-screen bg-gray-100 pb-12">
//       {loading ? (
//         <div>loading..</div>
//         ) : ( selectedEvent )
//       }
//     </div>
//   );
// }

// export default EventDetails;
