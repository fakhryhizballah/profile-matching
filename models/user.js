'use strict';
const {
  Model,
  Op
} = require('sequelize');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
module.exports = (sequelize, DataTypes) => {
  class User extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      // User.belongsToMany(models.Previlage, { through: 'gid', as: 'akses' });
      User.hasMany(models.Previlage, { foreignKey: 'gid', as: 'kd_access' });
      // User.hasMany(models.Session, { foreignKey: 'gid', as: 'session' }); //, onDelete: 'CASCADE', hooks: true

    }

    checkPassword = password => {
      return bcrypt.compareSync(password, this.password);
    };

    generateToken = () => {
      const payload = {
        gid: this.gid,
        username: this.username,
        email: this.email,
        kd_access: this.kd_access

      };

      const secretKey = process.env.JWT_SECRET_KEY;
      const token = jwt.sign(payload, secretKey, { expiresIn: 60 * 60 });
      return token;
    };
    generateRefreshToken = () => {
      const payload = {
        id: this.gid,
        // username: this.username,
        // email: this.email
      };
      const secretKey = process.env.JWT_SECRET_KEY;
      const token = jwt.sign(payload, secretKey);
      return token;
    };

    static authenticate = async ({ username, password }) => {
      try {
        const user = await this.findOne({
          where: {
            [Op.or]: [
              { email: username },
              { username: username },
              { nohp: username }
            ]
          }
        });
        if (!user) return Promise.reject(new Error('user not found!'));

        const isPasswordValid = user.checkPassword(password);
        if (!isPasswordValid) return Promise.reject(new Error('wrong password!'));

        return Promise.resolve(user);

      } catch (err) {
        return Promise.reject(err);
      }
    };

  }
  User.init({
    gid: {
      type: DataTypes.STRING,
      primaryKey: true,
      allowNull: false
    },
    username: DataTypes.STRING,
    email: DataTypes.STRING,
    nohp: DataTypes.BIGINT,
    password: DataTypes.STRING,
    fullname: DataTypes.STRING,
    pic: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'User',
  });
  return User;
};