const Sequelize = require('sequelize');
const db = require('../database/mysql');
const bcrypt = require('bcryptjs');

const User = db.define('user', {
    id: {
      type: Sequelize.INTEGER,
      primaryKey: true,
      autoIncrement: true
    },
    name: {
      type: Sequelize.STRING(100),
    },
    email: {
      type: Sequelize.STRING(100),
    },
    password: {
      type: Sequelize.STRING(100),
    },
},
{
  hooks: {
    async beforeCreate(user) {
      const salt = await bcrypt.genSalt(10);
      user.password = await bcrypt.hash(user.password, salt);
    },
  }
});

module.exports = User;