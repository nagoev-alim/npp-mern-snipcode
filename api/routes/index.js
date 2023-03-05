import express from 'express';

import userRouter from './user.router.js';
import snippetRouter from './snippet.router.js';

const router = express.Router();

router.use('/snippet', snippetRouter);
router.use('/users', userRouter);

export default router;
