import db from '../../../db/models/index';

import SuperDao from '../SuperDao';

const Score = db.Score;

export default class UserDao extends SuperDao {
  constructor() {
    super(Score);
  }

  getHighestScore = async ({ user_id }) => {
    try {
      const highest_score = await Score.findOne({
        order: [['score', 'DESC']],
        where: {
          user_id,
        },
      });

      return [highest_score, null];
    } catch (error) {
      return [null, error];
    }
  };

  createScore = async ({ user_id, score }) => {
    try {
      const newScore = await Score.create({
        user_id,
        score,
      });

      return [newScore, null];
    } catch (error) {
      return [null, error];
    }
  };

  getScores = async ({ user_id }) => {
    try {
      const scores = await Score.findAll({
        where: {
          user_id,
        },
      });

      return [scores, null];
    } catch (error) {
      return [null, error];
    }
  };

  getLeaderboard = async ({ user_id }) => {
    try {
      // sum of all score of all users and return the top 10 with name and email
      const leaderboard = await Score.findAll({
        attributes: [
          'user_id',
          [db.sequelize.fn('sum', db.sequelize.col('score')), 'total_score'],
        ],
        group: ['user_id'],
        order: [[db.sequelize.fn('sum', db.sequelize.col('score')), 'DESC']],
        limit: 10,
        include: [
          {
            model: db.User,
            attributes: ['first_name', 'primary_email'],
          },
        ],
      });

      return [leaderboard, null];
    } catch (error) {
      return [null, error];
    }
  };

  getTotalScore = async ({ user_id }) => {
    try {
      const total_score = await Score.findOne({
        attributes: [
          [db.sequelize.fn('sum', db.sequelize.col('score')), 'score'],
        ],
        where: {
          user_id,
        },
      });

      return [total_score, null];
    } catch (error) {
      return [null, error];
    }
  };

  getAllScores = async ({ user_id }) => {
    try {
      const scores = await this.findAllGeneric({
        where: {
          user_id,
        },
        order: [['score', 'DESC']],
        include: [
          {
            model: db.User,
            attributes: ['first_name', 'primary_email'],
          },
        ],
      });

      return [scores, null];
    } catch (error) {
      return [null, error];
    }
  };
}
