import express from 'express';
const router = express.Router();
import { signIn,signUp, deleteUser, refreshToken } from '../controllers/auth.controller.js';
import {auth, isAdmin, isUser } from '../middlewares/auth.middleware.js';

router.post('/signup', signUp);
router.post('/signin', signIn);
router.post('/refresh-token', auth, refreshToken);
router.post('/signin',auth, isUser,isAdmin, deleteUser);

export default router;