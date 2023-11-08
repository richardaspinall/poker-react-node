import express from 'express';
import { router as actionsRouter } from './actions';
import { router as loginRouter } from './login';

const router = express.Router();

router.use('/actions', actionsRouter);
router.use('/login', loginRouter);

export default router;
