const Sequelize = require('sequelize');

const db = new Sequelize('node_zoom', 'root', '123', {
            host: 'localhost',
            dialect: 'mysql',
            port: '3306',
            logging: false,
            define: {
              timestamps: false,
            },
            pool: { // too many connections.
              max: 5,
              min: 0,
              acquire: 30000,
              idle: 10000,
            }
          });

module.exports = db;