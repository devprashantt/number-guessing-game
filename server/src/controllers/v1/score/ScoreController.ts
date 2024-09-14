import { Request, Response } from 'express';
import bcrypt from 'bcrypt';

import { ScoreDao } from '../../../daos';

import jwtHelper from '../../../helpers/jwt';

import {
  internalServerError,
  successResponse,
  badRequestResponse,
} from '../../../utils/response';
import { logger, enums, CONFIG } from '../../../utils';

export default class ScoreController {
  private scoreDao: ScoreDao;

  constructor() {
    this.scoreDao = new ScoreDao();
  }

  getHighestScore = async (req: Request, res: Response) => {
    try {
      // @ts-ignore
      const { user_id } = req.user;

      let [highestScore, getHighestScoreError] =
        await this.scoreDao.getHighestScore({
          user_id,
        });
      if (getHighestScoreError) {
        logger.error(
          'Error occurred while retrieving the highest score',
          getHighestScoreError,
        );
        return internalServerError(
          res,
          'An error occurred while retrieving the highest score',
        );
      }

      const [totalScore, getTotalScoreError] =
        await this.scoreDao.getTotalScore({
          user_id,
        });
      if (getTotalScoreError) {
        logger.error(
          'Error occurred while retrieving the total score',
          getTotalScoreError,
        );
        return internalServerError(
          res,
          'An error occurred while retrieving the total score',
        );
      }

      return successResponse(
        res,
        {
          highest_score: highestScore,
          total_score: totalScore,
        },
        `Highest score retrieved successfully`,
      );
    } catch (error) {
      logger.error('ScoreController - getHighestScore:', error);
      return internalServerError(res, `Error getting highest score: ${error}`);
    }
  };

  createScore = async (req: Request, res: Response) => {
    try {
      // @ts-ignore
      const { user_id } = req.user;
      const { score } = req.body;

      if (!score) {
        return badRequestResponse(res, 'Score is required');
      }

      const [newScore, accumulateScoreError] = await this.scoreDao.createScore({
        user_id,
        score,
      });
      if (accumulateScoreError) {
        logger.error(
          'Error occurred while accumulating the score',
          accumulateScoreError,
        );
        return internalServerError(
          res,
          'An error occurred while accumulating the score',
        );
      }

      return successResponse(
        res,
        {
          new_score: newScore,
        },
        `Score accumulated successfully`,
      );
    } catch (error) {
      logger.error('Error while accumulation', error);
      return internalServerError(res, `Error accumulating score: ${error}`);
    }
  };

  getLeaderboard = async (req: Request, res: Response) => {
    try {
      // @ts-ignore
      const { user_id } = req.user;

      const [scores, scoresError] = await this.scoreDao.getLeaderboard({
        user_id,
      });
      if (scoresError) {
        logger.error('Error occurred while retrieving scores', scoresError);
        return internalServerError(
          res,
          'An error occurred while retrieving scores',
        );
      }

      return successResponse(res, scores, `Scores retrieved successfully`);
    } catch (error) {
      logger.error('Error getting scores', error);
      return internalServerError(res, `Error getting scores: ${error}`);
    }
  };

  getAllScores = async (req: Request, res: Response) => {
    try {
      // @ts-ignore
      const { user_id } = req.user;

      const [scores, scoresError] = await this.scoreDao.getAllScores({
        user_id,
      });
      if (scoresError) {
        logger.error('Error occurred while retrieving scores', scoresError);
        return internalServerError(
          res,
          'An error occurred while retrieving scores',
        );
      }

      return successResponse(res, scores, `Scores retrieved successfully`);
    } catch (error) {
      logger.error('Error getting scores', error);
      return internalServerError(res, `Error getting scores: ${error}`);
    }
  };
}
