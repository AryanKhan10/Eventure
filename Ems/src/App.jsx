import { useState } from 'react'
import { Route, Routes } from 'react-router-dom'
import Login from './pages/Login'
import Signup from './pages/Signup'
import Navbar from './components/Navbar/NavBar'
import './App.css'
import { useSelector } from 'react-redux'
import CreateEvent from './pages/CreateEvent'
import MyEvent from './pages/MyEvent'
import EventDetails from './components/Events/EventDetails'
function App() {
  const role = useSelector(state => state.auth?.user?.role)
  return (
    <>
    <Navbar/>
      <Routes>
        <Route path='/login' element={<Login/>} />
        <Route path='/signup' element={<Signup/>} />

        {
          role === 'organizer' &&
            <>
             <Route path='create-event' element={<CreateEvent/>}/>
             <Route path='my-events' element={<MyEvent/>}/>
             <Route path='events/organizer/:organierId/event/:eventId' element={<EventDetails/>}/>
            </>
          
        }

      </Routes>
    </>
  )
}

export default App
