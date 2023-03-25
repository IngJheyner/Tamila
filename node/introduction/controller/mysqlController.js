const Category = require('../model/category-mysql');
const Product = require('../model/product-mysql');
const ProductPhoto = require('../model/productPhoto-mysql');
const slug = require('slug');

exports.home = (request, response) => {
  return response.render("mysql/home", {title: 'MySQL'})
}

/*===========================================
Categoria
=============================================*/
exports.category = async (request, response) => {
  try {

    let data = await Category.findAll({
      raw: true,
      order: [['id', 'desc']] // Ordernar
    });

    return response.render("mysql/category", {title: 'MySQL', data: data});

  } catch (error) {
    request.flash('css', 'danger');
    request.flash('message', [{msg: error.message}]);
    return response.redirect('/mysql/home');
  }
}

exports.category_add = (request, response) => {
  return response.render("mysql/category_add", {title: 'MySQL'})
}

exports.category_add_post = async (request, response) => {
  const {name} = request.body;

  try {
    let category = await Category.findOne({
      where: {
        'name': name
      }
    });

    if(category) {
      throw new Error('La categoria ya existe en la base de datos.');
    }

    let save = await Category.create({
      'name': name,
    });

    if(!save) {
      request.flash('css', 'danger');
      request.flash('message', [{msg: 'Ocurrio un error inesperado, por favor vuelva a intentarlo.'}]);
    } else{
      request.flash('css', 'success');
      request.flash('message', [{msg: 'Se ha creado el registro exitosamente.'}]);
    }
    return response.redirect('/mysql/category/add');
  } catch (error) {
    request.flash('css', 'danger');
    request.flash('message', [{msg: error.message}]);
    return response.redirect('/mysql/category/add');
  }
}

exports.category_edit = async (request, response) => {

  const {id} = request.params;

  try {

    let category = await Category.findOne({
      raw: true,
      where: {
        'id': id
      }
    });

    if(!category) {
      throw new Error('Error desconocido.');
    }

    return response.render("mysql/category_edit", {title: 'MySQL', data: category});

  } catch (error) {
    request.flash('css', 'danger');
    request.flash('message', [{msg: error.message}]);
    return response.redirect('/mysql/category');
  }
}

exports.category_edit_post = async (request, response) => {

  const {id} = request.params;
  const {name} = request.body;

  try {

    let category = await Category.findOne({
      raw: true,
      where: {
        'id': id
      }
    });

    if(!category) {
      throw new Error('Error desconocido.');
    }

    await Category.update({
      'name': name,
      'slug': slug(name).toLowerCase(),
    },
    {
      where: {
        'id': id
      }
    });

    request.flash('css', 'success');
    request.flash('message', [{msg: 'Se ha actualizado el registro exitosamente.'}]);
    return response.redirect(`/mysql/category/edit/${id}`);

  } catch (error) {
    request.flash('css', 'danger');
    request.flash('message', [{msg: error.message}]);
    return response.redirect(`/mysql/category/edit/${id}`);
  }

}

exports.category_delete = async (request, response) => {
  const {id} = request.params;

  try {
    let category = await Category.findOne({
      where: {
        'id': id
      }
    });

    if(!category) {
      throw new Error('Error desconocido.');
    }

    // Se valida que la categoria exista en un producto. Si es asi no debe ser elimnada.
    let product = await Product.findOne({
      where: {
        'category_id': id,
      }
    });

    if(product) {
      throw new Error('Error desconocido.');
    }

    await Category.destroy({
      where: {
        'id': id
      }
    });

    request.flash('css', 'success');
    request.flash('message', [{msg: 'Se ha eliminado el registro exitosamente.'}]);
    return response.redirect(`/mysql/category`);

  } catch (error) {
    request.flash('css', 'danger');
    request.flash('message', [{msg: error.message}]);
    return response.redirect(`/mysql/category`);
  }
}

/*===========================================
Producto
=============================================*/
exports.product = async (request, response) => {
  try {

    let data = await Product.findAll({
      raw: true,
      order: [['id', 'desc']], // Ordernar
      include: {all: true, nested: true} // Traer los datos de las tablas relacionadas.
    });

    return response.render("mysql/product", {title: 'MySQL', data: data});

  } catch (error) {
    request.flash('css', 'danger');
    request.flash('message', [{msg: error.message}]);
    return response.redirect('/mysql/home');
  }
}