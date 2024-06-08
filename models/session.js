'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Session extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
    static valid = async ({ refresh_token }) => {
      try {
        console.log('refresh_token', refresh_token);
        const user = await this.findOne({
          where: {
            refresh: refresh_token
          }
        });
        if (!user) return Promise.reject(new Error('Session not found!'));

        return Promise.resolve(user);

      } catch (err) {
        return Promise.reject(err);
      }
    };
    getToken = () => {
      const secretKey = process.env.JWT_SECRET_KEY;
      try {
        let decoded = jwt.verify(this.refresh, secretKey);
        // const token = jwt.sign(decoded, secretKey, { expiresIn: 60 * 60 });
        return decoded;
      } catch (err) {
        return err;
      }

  };
  }
  Session.init({
    name: DataTypes.STRING,
    status: DataTypes.STRING,
    user_agent: DataTypes.STRING,
    host: DataTypes.STRING,
    remoteAddress: DataTypes.STRING,
    refresh: DataTypes.STRING,
    access: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'Session',
  });
  return Session;
};