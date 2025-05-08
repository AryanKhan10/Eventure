import express from 'express';
const router = express.Router();
import { createEvent, updateEvent, deleteEvent, getAllEvents, getEvent, bookedTicket } from '../controllers/event.controller.js';
import { auth, isOrganizer, isAdmin } from '../middleware/auth.middleware.js';

router.post('/create-event', auth, isOrganizer, createEvent);
router.put('/update-event/:eventId', auth, isOrganizer, updateEvent);
router.delete('/delete-event/:eventId', auth, isOrganizer, deleteEvent);
router.get('/get-event/:eventId', auth, getEvent);
router.get('/get-all-events', auth, getAllEvents);
router.get('/booked-ticket/:eventId', auth, bookedTicket);

export default router;