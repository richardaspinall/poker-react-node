import express from 'express';
import { actionsRouter } from './actions';

const router = express.Router();

router.use('/actions', actionsRouter);

export default router;
