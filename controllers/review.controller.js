import prisma from "../db/db.config";

const createReview = async (req, res) => {
    try {
        const {userId, eventId, rating, comment} = req.body;
        if(!userId || !eventId || !rating || !comment){
            return res.status(400).json({ 
                success: false,
                message: "All fields are required"
            });
        }
        const review = await prisma.review.create({
            data: {
                userId,
                eventId,
                rating,
                comment
            },
        });

        res.status(201).json({ 
            success: true,
            message: "Review created successfully",
            review:review
        });
    } catch (error) {
        console.error("Error in createReview:", error);
        res.status(500).json({ 
            success: false,
            message: "Internal server error",
            error:error.message
        });
        
    }
}

// Get all reviews of an event
const getReviews = async (req, res) => {
    try {
        const { eventId } = req.params;
        if(!eventId){
            return res.status(400).json({ 
                success: false,
                message: "Event ID is required"
            });
        }
        const reviews = await prisma.review.findMany({
            where: {
                eventId: eventId
            },
            include: {
                user: true,
            }
        });
        if (reviews.length === 0) {
            return res.status(404).json({ 
                success: false,
                message: "No reviews found for this event"
            });
        }
        res.status(200).json({ 
            success: true,
            message: "Reviews fetched successfully",
            reviews:reviews
        });

    } catch (error) {
        console.error("Error in getReviews:", error);
        res.status(500).json({ 
            success: false,
            message: "Internal server error",
            error:error.message
        });
        
    }
}

const deleteReview = async (req, res) => {
    try {
        const { reviewId } = req.params;
        if(!reviewId){
            return res.status(400).json({ 
                success: false,
                message: "Review ID is required"
            });
        }

        // Check if the review exists
        const review = await prisma.review.findUnique({
            where: {
                id: reviewId
            },
        })
        if (!review) {
            return res.status(404).json({ 
                success: false,
                message: "Review not found"
            });
        }
        // Delete the review
        await prisma.review.delete({
            where: {
                id: reviewId
            },
        })
        res.status(200).json({ 
            success: true,
            message: "Review deleted successfully",
        });
    } catch (error) {
        console.error("Error in deleteReview:", error);
        res.status(500).json({ 
            success: false,
            message: "Internal server error",
            error:error.message
        });
    }
}

const updateReview = async (req, res) => {
    try {
        const { reviewId } = req.params;
        const { rating, comment } = req.body;
        if(!reviewId || !rating || !comment){
            return res.status(400).json({ 
                success: false,
                message: "All fields are required"
            });
        }

        // Check if the review exists
        const review = await prisma.review.findUnique({
            where: {
                id: reviewId
            },
        })

        if (!review) {
            return res.status(404).json({ 
                success: false,
                message: "Review not found"
            });
        }

        // Update the review
        const updatedReview = await prisma.review.update({
            where: {
                id: reviewId
            },
            data: {
                rating,
                comment
            },
        })

        res.status(200).json({ 
            success: true,
            message: "Review updated successfully",
            review:updatedReview
        });
    } catch (error) {
        console.error("Error in updateReview:", error);
        res.status(500).json({ 
            success: false,
            message: "Internal server error",
            error:error.message
        });
        
    }
}

// Get all reviews of the logged-in user
const getMyReviews = async (req, res) => {
    try {
        const userId = req.user.id;
        const reviews = await prisma.review.findMany({
            where: {
                userId: userId
            },
            include: {
                event: true,
                user: true,
            },
        });
        if (reviews.length === 0) {
            return res.status(404).json({ 
                success: false,
                message: "No reviews found for this user"
            });
        }

        const count = await prisma.review.count({
            where: {
                userId: userId
            },
        })
        res.status(200).json({ 
            success: true,
            message: "Reviews fetched successfully",
            reviews:reviews,
            count:count
        });
    } catch (error) {
        console.error("Error in getMyReviews:", error);
        res.status(500).json({ 
            success: false,
            message: "Internal server error",
            error:error.message
        });
    }
}

// Get a specific review against event of the logged-in user
const getMyReview = async (req, res) => {
    try {
        const { eventId } = req.params;
        const userId = req.user.id;
        if(!eventId){
            return res.status(400).json({ 
                success: false,
                message: "Event ID is required"
            });
        }
        // Check if the review exists
        const event = await prisma.event.findUnique({
            where: {
                id: eventId
            },
        })
        if (!event) {
            return res.status(404).json({ 
                success: false,
                message: "Event not found"
            });
        }
        
        const review = await prisma.review.findUnique({
            where:{
                userId: userId,
                eventId: eventId
            },
            include: {
                user: true,
            }
        })
        if (!review) {
            return res.status(404).json({ 
                success: false,
                message: "Review not found"
            });
        }
    
        res.status(200).json({ 
            success: true,
            message: "Review fetched successfully",
            review:review
        });
    } catch (error) {
        console.error("Error in getMyReview:", error);
        res.status(500).json({ 
            success: false,
            message: "Internal server error",
            error:error.message
        });
        
    }
}

// Get the average rating of an event
const getAvgRating = async (req, res) => {
    try {
        const { eventId } = req.params;
        if(!eventId){
            return res.status(400).json({ 
                success: false,
                message: "Event ID is required"
            });
        }

        // Check if the event exists
        const event = await prisma.event.findUnique({
            where: {
                id: eventId
            },
        })

        if (!event) {
            return res.status(404).json({ 
                success: false,
                message: "Event not found"
            });
        }

        // Get the average rating

        const avgRating = await prisma.review.aggregate({
            where: {
                eventId: eventId
            },
            _avg: {
                rating: true
            }
        })
        console.log(avgRating);
        if (!avgRating) {
            return res.status(404).json({ 
                success: false,
                message: "No reviews found for this event"
            });
        }
        res.status(200).json({ 
            success: true,
            message: "Average rating fetched successfully",
            avgRating:avgRating
        });
    } catch (error) {
        console.error("Error in getAvgRating:", error);
        res.status(500).json({ 
            success: false,
            message: "Internal server error",
            error:error.message
        });
    }
}

export {
    createReview,
    getReviews,
    deleteReview,
    updateReview,
    getMyReviews,
    getMyReview,
    getAvgRating
}