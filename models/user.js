'use strict';
const {
  Model
} = require('sequelize');

const { hashPassword } = require('../helpers/bcrypt');

module.exports = (sequelize, DataTypes) => {
  class User extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  };
  User.init({
    email: {
      type: DataTypes.STRING,
      validate: {
        isEmail: true,
        notEmpty: {
          args: true,
          msg: 'Field email can\'t be empty!'
        }
      }
    },
    password: {
      type: DataTypes.STRING,
      validate: {
        notEmpty: {
          args: true,
          msg: 'Field password can\'t be empty!'
        },

      }
    }
  }, {
    hooks: {
      beforeCreate: (user) => {
        user.password = hashPassword(user.password)
      }  
    },
    sequelize,
    modelName: 'User',
  });
  return User;
};