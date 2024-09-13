import bcrypt from 'bcrypt';
import { Model } from 'sequelize';

import { CONFIG, enums } from '../../utils';

export default (sequelize: any, DataTypes: any): typeof Model => {
  class Score extends Model {
    static associate({ User }: { User: any }) {
      Score.belongsTo(User, {
        foreignKey: 'user_id',
      });
    }
  }
  Score.init(
    {
      score_id: {
        type: DataTypes.UUID,
        primaryKey: true,
        unique: true,
        allowNull: false,
        defaultValue: DataTypes.UUIDV4,
      },
      user_id: {
        type: DataTypes.UUID,
        allowNull: true,
        primaryKey: false,
      },
      score: {
        type: DataTypes.INTEGER,
        allowNull: false,
        validate: {
          notNull: { msg: 'Score must have a value.' },
          notEmpty: { msg: 'Score must not be empty.' },
        },
      },
      remarks: {
        type: DataTypes.STRING,
        allowNull: true,
        validate: {
          notEmpty: { msg: 'Remarks must not be empty.' },
          isIn: {
            args: [
              [
                enums.SCORE_REMARKS.GOOD,
                enums.SCORE_REMARKS.BAD,
                enums.SCORE_REMARKS.BEST,
              ],
            ],
            msg: 'Remarks must be either good or bad.',
          },
        },
        defaultValue: enums.SCORE_REMARKS.GOOD,
      },
    },
    {
      timestamps: true,
      sequelize,
      modelName: 'Score',
      createdAt: 'created_at',
      updatedAt: 'updated_at',
      underscored: true,
    },
  );
  return Score;
};
