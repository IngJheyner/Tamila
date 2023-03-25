const Sequelize = require('sequelize');

const db = require('../database/mysql');
const slug = require('slug');
const Category = require('./category-mysql');

const Product = db.define('products', {
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
                  },
                  precie: {
                    type: Sequelize.INTEGER(11)
                  },
                  description: {
                    type: Sequelize.TEXT('long')
                  }
                },{
                  hooks: {
                    beforeCreate(products) {
                      products.slug = slug(products.name).toLowerCase();
                    },
                  }
                });

// Agregar las llaves foraneas.
Product.belongsTo(Category, {foreignKey: 'category_id'});

module.exports = Product;