import prisma from "../db/db.config.js";

//ticket booking controller ..... generate unique qr code in frontend using uuid and send it to backend
const createTicket = async (req, res) => {
    try {
        const  {eventId, userId, qrCode} = req.body;

        if(!eventId || !userId || !qrCode){
            return res.status(400).json({ 
                success: false,
                message: "All fields are required"
            });
        }

        const ticket = await prisma.ticket.create({
            data: {
                eventId,
                userId,
                qrCode
            },
        });

        res.status(201).json({ 
            success: true,
            message: "Ticket created successfully",
            ticket:ticket
        });
    } catch (error) {
        console.error("Error in createTicket:", error);
        res.status(500).json({ 
            success: false,
            message: "Internal server error",
            error:error.message
        });
    }
}

const getMyTickets = async (req, res) => {
    try {
        const userId = req.user.id;
        const tickets = await prisma.ticket.findMany({
            where: {
                userId: userId
            },
            include: {
                event: true,
            }
        });

        res.status(200).json({ 
            success: true,
            message: "Tickets fetched successfully",
            tickets:tickets
        });
    } catch (error) {
        console.error("Error in getMyTickets:", error);
        res.status(500).json({ 
            success: false,
            message: "Internal server error",
            error:error.message
        });
    }
}

// TODO: ticket against specific event...
export { createTicket, getMyTickets };