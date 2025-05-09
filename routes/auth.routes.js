import express from 'express';
const router = express.Router();
import { signIn,signUp } from '../controllers/auth.controller.js';

router.post('/signup', signUp);
router.post('/signin', signIn);

export default router;