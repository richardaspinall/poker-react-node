import express from 'express';
import { router as actionsRouter } from './actions';

const router = express.Router();

router.use('/actions', actionsRouter);

export default router;
