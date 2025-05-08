import jwt from "jsonwebtoken";

const auth = async (req, res, next) => {
  try {

    const token = req.body || req.cookie || req.headers.authorization;
    if (!token) return res.status(401).json({ message: "Unauthorized" });
    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        req.user = decoded;
        next();
        
    } catch (error) {
        console.error(error);
        return res.status(401).json({ message: "Unauthorized" });
        
    }


  } catch (error) {
    console.error(error);
    return res.status(401).json({ message: "Unauthorized" });
  }
};

const isUser = (req, res, next) => {
    try {
        const user = req.user;
        if (!user) return res.status(403).json({ message: "Forbidden" });
        if (user.role !== "user") return res.status(403).json({ message: "Forbidden" });
        next();
    } catch (error) {
        console.error(error);
        return res.status(403).json({ message: "Forbidden" });
    }
}

const isOrganizer = (req, res, next) => {
    try {
        const user = req.user;
        if (!user) return res.status(403).json({ message: "Forbidden" });
        if (user.role !== "organizer") return res.status(403).json({ message: "Forbidden" });
        next();
    } catch (error) {
        console.error(error);
        return res.status(403).json({ message: "Forbidden" });
    }
}

const isAdmin = (req, res, next) => {
    try {
        const user = req.user;
        if (!user) return res.status(403).json({ message: "Forbidden" });
        if (user.role !== "admin") return res.status(403).json({ message: "Forbidden" });
        next();
    } catch (error) {
        console.error(error);
        return res.status(403).json({ message: "Forbidden" });
    }
}

export { auth, isUser, isOrganizer, isAdmin };