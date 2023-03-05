import express from 'express';
import { snippetController } from '../controllers/index.js';
import { verifyTokenMiddleware } from '../middleware/index.js';

const router = express.Router();

router
  .route('/')
  .get(verifyTokenMiddleware, snippetController.get)
  .post(verifyTokenMiddleware, snippetController.create);

router
  .route('/:id')
  .delete(verifyTokenMiddleware, snippetController.delete)
  .put(verifyTokenMiddleware, snippetController.update);

export default router;
