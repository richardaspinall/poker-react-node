import express from 'express';
import { router as pokerActionsRouter } from './pokerActions';
import { router as pokerTablesRouter } from './pokerTables';

const router = express.Router();

router.use('/actions', pokerActionsRouter);
router.use('/pokertables', pokerTablesRouter);

export default router;
