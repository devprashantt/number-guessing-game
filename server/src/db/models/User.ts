import bcrypt from 'bcrypt';
import { Model } from 'sequelize';

import { CONFIG, enums } from '../../utils';

export default (sequelize: any, DataTypes: any): typeof Model => {
  class User extends Model {
    static associate({ Score }: { Score: any }) {
      User.hasMany(Score, {
        foreignKey: 'user_id',
      });
    }
  }
  User.init(
    {
      user_id: {
        type: DataTypes.UUID,
        primaryKey: true,
        unique: true,
        allowNull: false,
        defaultValue: DataTypes.UUIDV4,
      },
      first_name: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
          notNull: { msg: 'User must have a first name.' },
          notEmpty: { msg: 'User first name must not be empty.' },
        },
      },
      last_name: {
        type: DataTypes.STRING,
        allowNull: true,
      },
      primary_email: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      password: {
        type: DataTypes.STRING,
        set(value: string) {
          const encryptedPassword = bcrypt.hashSync(value, CONFIG.SALT_ROUNDS);
          this.setDataValue('password', encryptedPassword);
        },
      },
      role: {
        type: DataTypes.STRING,
        defaultValue: enums.USER_ROLE.USER,
      },
      profile_picture: {
        type: DataTypes.STRING,
      },
    },
    {
      timestamps: true,
      sequelize,
      modelName: 'User',
      createdAt: 'created_at',
      updatedAt: 'updated_at',
      underscored: true,
    },
  );
  return User;
};
