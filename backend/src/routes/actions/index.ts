import express from 'express';

import tablesJoinHandler from '../../handlers/actions/actions';

const router = express.Router();

router.post('/tables.join', (req, res) => {
  tablesJoinHandler.runHandler(req, res);
});

export { router as actionsRouter };
