import express from 'express';

import { AuthToken } from '../../../middlewares';

import { ScoreController } from '../../../controllers/v1';

const router = express.Router();

const scoreController = new ScoreController();

router.get('/highest', AuthToken.verifyToken, scoreController.getHighestScore);
router.get(
  '/leaderboard',
  AuthToken.verifyToken,
  scoreController.getLeaderboard,
);
router.post('/', AuthToken.verifyToken, scoreController.createScore);
router.get('/all', AuthToken.verifyToken, scoreController.getAllScores);

export default router;
