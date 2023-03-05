import express from 'express';
import { userController } from '../controllers/index.js';
import { verifyTokenMiddleware } from '../middleware/index.js';

const router = express.Router();

router.post('/register', userController.register);
router.post('/login', userController.login);
router.get('/about', verifyTokenMiddleware,  userController.about);

export default router;
