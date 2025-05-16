import { configureStore } from "@reduxjs/toolkit";
import  auth from "../slices/auth.js";
import event from "../slices/event.js"
export const store = configureStore({
  reducer: { 
     auth,
     event
   },
});
export default store;