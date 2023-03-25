const Sequelize = require('sequelize');

const db = require('../database/mysql');
const slug = require('slug');

const Category = db.define('categories', {
                  id: {
                    type: Sequelize.INTEGER,
                    primaryKey: true,
                    autoIncrement: true,
                  },
                  name: {
                    type: Sequelize.STRING(100),
                  },
                  slug: {
                    type: Sequelize.STRING(100)
                  }
                },{
                  hooks: {
                    beforeCreate(categories) {
                      categories.slug = slug(categories.name).toLowerCase();
                    },
                  }
                });

module.exports = Category;