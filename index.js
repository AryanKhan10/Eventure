import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';

dotenv.config();
const app = express();
const PORT = process.env.PORT || 3000;


app.use(cors({origin: 'http://localhost:5173', credentials: true}));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));


// Import routes
import authRoutes from './routes/auth.routes.js';
import eventRoutes from './routes/event.routes.js';
app.use('/api/v1/auth', authRoutes);
app.use('/api/v1/organizer', eventRoutes);


app.get('/', (req, res) => {
    res.send('Hello World!');
    });



app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
    }
);

