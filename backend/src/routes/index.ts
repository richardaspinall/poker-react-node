import express from 'express';
import { router as actionsRouter } from './actions';
import { router as tablesRouter } from './tables';

const router = express.Router();

router.use('/actions', actionsRouter);
router.use('/tables', tablesRouter);

export default router;
