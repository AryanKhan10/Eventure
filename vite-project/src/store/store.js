import { configureStore } from "@reduxjs/toolkit";
import  auth from "../slices/auth.js";
export const store = configureStore({
  reducer: { 
     auth: auth
   },
});
export default store;