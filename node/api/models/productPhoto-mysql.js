const Sequelize = require('sequelize');

const db = require('../database/mysql');

const Product = require('./product-mysql');

const productPhoto = db.define('products_photo', {
                  id: {
                    type: Sequelize.INTEGER,
                    primaryKey: true,
                    autoIncrement: true,
                  },
                  name: {
                    type: Sequelize.STRING(100),
                  }
                });

// Agregar las llaves foraneas.
productPhoto.belongsTo(Product, {foreignKey: 'product_id'});

module.exports = productPhoto;