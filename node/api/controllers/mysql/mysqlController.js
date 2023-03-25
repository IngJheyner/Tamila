// const Category = require('../models/category-mysql');
const Product = require('../../models/product-mysql');
// const User = require('../models/user-mysql');
const ProductPhoto = require('../../models/productPhoto-mysql');
const Joi = require("@hapi/joi"); // Para validar los datos que nos envian
const slug = require('slug'); // Para crear los slugs

// Lista de productos
exports.products = async (req, res) => {

  try {

    let data = await Product.findAll({
      raw: true,
      order: [ ['id', 'DESC'] ],
      include: { all: true, nested: true }
    });

    return res.status(200).json({ data });

  } catch (error) {

    return res.status(400).json({ message: error.message });

  }
};

// Lista de productos por id
exports.products_id = async (req, res) => {

  const { id } = req.params;

  try {

    let data = await Product.findOne({
      raw: true,
      order: [ ['id', 'DESC'] ],
      include: { all: true, nested: true },
      where: { id }
    });

    return res.status(200).json({ data });

  } catch (error) {

    return res.status(400).json({ message: error.message });

  }
};

// Crear producto
exports.products_post = async (req, res) => {

  const { name, description, precie, category_id } = req.body;

  const schema = Joi.object({
    name: Joi.string().min(3).required().messages({
      'string.empty': `El campo nombre no puede estar vacio`,
      'any.required': `El campo nombre es requerido`,
      'string.min': `El campo nombre debe tener al menos {#limit} caracteres`,
    }),
    description: Joi.string().min(3).required().messages({
      'string.empty': `El campo descripcion no puede estar vacio`,
      'any.required': `El campo descripcion es requerido`,
      'string.min': `El campo descripcion debe tener al menos {#limit} caracteres`,
    }),
    precie: Joi.number().integer().required().messages({
      'string.empty': `El campo precio no puede estar vacio`,
      'any.required': `El campo precio es requerido`,
      'number.integer': `El campo precio debe ser un numero entero`,
      'number.base': `El campo precio debe ser un numero`,
      'number.min': `El campo precio debe ser mayor a 0`,
    }),
    category_id: Joi.number().required().messages({
      'string.empty': `El campo categoria no puede estar vacio`,
      'any.required': `El campo categoria es requerido`,
    }),
  });

  const { error, value } = schema.validate({ name: name, description: description, precie: precie, category_id: category_id }); // se ejecuta el metodo validate de Joi

  if (error) {
    return res.status(400).json({ message: error.details[0].message }); // Si hay un error, se envia un mensaje
  }
  else {

    try {

      let data = await Product.create({
        name: name,
        description: description,
        precie: precie,
        category_id: category_id
      });

      if (!data) {
        return res.status(400).json({ message: 'Error al crear el producto' });
      }

      return res.status(201).json({ data });

    } catch (error) {
      return res.status(400).json({ message: error.message });
    }

  }
};

// Actualizar producto
exports.products_put = async (req, res) => {

  const { id } = req.params;
  const { name, description, precie, category_id } = req.body;

  const schema = Joi.object({
    name: Joi.string().min(3).required().messages({
      'string.empty': `El campo nombre no puede estar vacio`,
      'any.required': `El campo nombre es requerido`,
      'string.min': `El campo nombre debe tener al menos {#limit} caracteres`,
    }),
    description: Joi.string().min(3).required().messages({
      'string.empty': `El campo descripcion no puede estar vacio`,
      'any.required': `El campo descripcion es requerido`,
      'string.min': `El campo descripcion debe tener al menos {#limit} caracteres`,
    }),
    precie: Joi.number().integer().required().messages({
      'string.empty': `El campo precio no puede estar vacio`,
      'any.required': `El campo precio es requerido`,
      'number.integer': `El campo precio debe ser un numero entero`,
      'number.base': `El campo precio debe ser un numero`,
      'number.min': `El campo precio debe ser mayor a 0`,
    }),
    category_id: Joi.number().required().messages({
      'string.empty': `El campo categoria no puede estar vacio`,
      'any.required': `El campo categoria es requerido`,
    }),
  });

  const { error, value } = schema.validate({ name: name, description: description, precie: precie, category_id: category_id }); // se ejecuta el metodo validate de Joi

  if (error) {
    return res.status(400).json({ message: error.details[0].message }); // Si hay un error, se envia un mensaje
  }
  else {

    try {

      let product = await Product.findOne({
        where: { id },
        raw: true,
      });

      if (!product) {
        return res.status(400).json({ message: 'El producto no existe' });
      }

      await Product.update({
        name: name,
        slug: slug(name).toLowerCase(),
        description: description,
        precie: precie,
        category_id: category_id
      }, {
        where: { id }
      });

      return res.status(200).json({ message: 'Producto actualizado' });

    } catch (error) {
      return res.status(400).json({ message: error.message });
    }
  }

};

// Eliminar producto
exports.products_delete = async (req, res) => {
 const { id } = req.params;

 try {

  let product = await Product.findOne({
    where: { id },
    raw: true,
  });

  if (!product) {
    return res.status(400).json({ message: 'El producto no existe' });
  }

  let photo = await ProductPhoto.findOne({
    where: { product_id: id },
    raw: true,
  });

  if (photo) {
    return res.status(400).json({ message: 'El producto tiene fotos asociadas' });
  }

  await Product.destroy({
    where: { id }
  });

  return res.status(200).json({ message: 'Producto eliminado' });

 } catch (error) {
  return res.status(400).json({ message: error.message });
 }
};