import express from 'express';
import { registerUser, loginUser, getProfile } from '../controllers/authController.js';
import cors from 'cors';

const router = express.Router();

router.use(
    cors({
        credentials: true,
        origin: 'http://localhost:5173'
    })
)

router.post('/register', registerUser);
router.post('/login', loginUser);
router.get('/profile', getProfile);

export default router; // Use ES Modules export