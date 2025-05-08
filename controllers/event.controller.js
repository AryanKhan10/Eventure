import prisma from "../db/db.config.js";

const createEvent = async (req, res) => {
    try {
        const { title, description, ticketPrice, dateTime, location } = req.body;
        if(!title || !description || ticketPrice || dateTime || !location){
            return res.status(400).json({ 
                success: false,
                message: "All fields are required"
            });
        }
        const userId = req.user.id; 

        const event = await prisma.event.create({
            data: {
                title,
                description,
                ticketPrice,
                dateTime,
                location,
                organizer:userId, 
            },
        });

        res.status(201).json({ 
            success: true,
            message: "Event created successfully",
            event:event
        });
    } catch (error) {
        console.error("Error in createEvent:", error);
        res.status(500).json({ 
            success: false,
            message: "Internal server error",
            error:error.message
        });
    }
}

const updateEvent = async (req, res) => {
    try {
        const { eventId } = req.params;
        const { title, description, ticketPrice, dateTime, location } = req.body;
        if(!title || !description || ticketPrice || dateTime || !location){
            return res.status(400).json({ 
                success: false,
                message: "All fields are required"
            });
        }
        const userId = req.user.id;
        const event = await prisma.findUnique({
            where: {
                id: eventId,
                organizer: userId, 
            },
        })
        if (!event) {
            return res.status(404).json({ 
                success: false,
                message: "Event not found"
            });
        }
        const updatedEvent = await prisma.event.update({
            where: {
                id: eventId,
            },
            data: {
                title,
                description,
                ticketPrice,
                dateTime,
                location,
            },
        });
        res.status(200).json({ 
            success: true,
            message: "Event updated successfully",
            event:updatedEvent
        });
    } catch (error) {
        console.error("Error in updateEvent:", error);
        res.status(500).json({ 
            success: false,
            message: "Internal server error",
            error:error.message
        });
    }
}

const deleteEvent = async (req, res) => {
    try {
        const eventId = req.params.eventId;

        if (!eventId) {
            return res.status(400).json({ 
                success: false,
                message: "Event ID is required"
            });
        }
        // retrieve the organizer ID from the request object
        const userId = req.user.id;

        // Check if the event exists and belongs to the user
        const event = await prisma.event.findUnique({
            where: {
                id: eventId,
                organizer: userId, 
            },
        })

        if (!event) {
            return res.status(404).json({ 
                success: false,
                message: "Event not found"
            });
        }
        // Delete the event
        await prisma.event.delete({
            where: {
                id: eventId,
            },
        });
        res.status(200).json({ 
            success: true,
            message: "Event deleted successfully",
        });
    } catch (error) {
        console.error("Error in deleteEvent:", error);
        res.status(500).json({ 
            success: false,
            message: "Internal server error",
            error:error.message
        });
    }
}

const getEvent = async (req, res) => {
    try {
        const eventId = req.params.eventId;
        if (!eventId) {
            return res.status(400).json({ 
                success: false,
                message: "Event ID is required"
            });
        }
        // retrieve the organizer ID from the request object
        const userId = req.user.id;

        // Check if the event exists and belongs to the user
        const event = await prisma.event.findUnique({
            where: {
                id: eventId,
                organizer: userId, 
            },
        })
        if (!event) {
            return res.status(404).json({ 
                success: false,
                message: "Event not found"
            });
        }

        res.status(200).json({ 
            success: true,
            message: "Event retrieved successfully",
            event:event
        });

    } catch (error) {
        console.error("Error in getEvent:", error);
        res.status(500).json({ 
            success: false,
            message: "Internal server error",
            error:error.message
        });
    }
}

const getAllEvents = async (req, res) => {
    try {
        const userId = req.user.id;
        const events = await prisma.event.findMany({
            where: {
                organizer: userId, 
            },
        })
        if (!events) {
            return res.status(404).json({ 
                success: false,
                message: "No events found"
            });
        }
        res.status(200).json({ 
            success: true,
            message: "Events retrieved successfully",
            events:events
        });
    } catch (error) {
        console.error("Error in getAllEvents:", error);
        res.status(500).json({ 
            success: false,
            message: "Internal server error",
            error:error.message
        });
    }
}

const bookedTicket = async (req, res) => {
    try {
        const eventId = req.params.eventId;
        const userId = req.user.id;

        const tickets = await prisma.ticket.findMany({
            where: {
                eventId: eventId,
                userId: userId, 
            },
        })
        if (!tickets) {
            return res.status(404).json({ 
                success: false,
                message: "No tickets found"
            });
        }
        
        res.status(200).json({
            success: true,
            message: "Tickets retrieved successfully",
            tickets:tickets
        });

    } catch (error) {
        console.error("Error in bookTicket:", error);
        res.status(500).json({ 
            success: false,
            message: "Internal server error",
            error:error.message
        });
    }
}

export {
    createEvent,
    updateEvent,
    deleteEvent,
    getEvent,
    getAllEvents,
    bookTicket
};