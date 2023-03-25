const Category = require('../model/category');
const Product = require('../model/product');
const ProductPhoto = require('../model/productPhoto');
const slug = require('slug');

// libreria para subir archivos.
const formidable = require("formidable");
const fs = require("fs");
const path = require("path");

// Pagina principal
exports.home = (request, response) => {
  return response.render('mongodb/home', {tituloPagina: 'MongoDB'});
}

/*===========================================
Categoria
=============================================*/
exports.category = async (request, response) => {

  try {
    // Mostrar listado de categorias.
    let datos = await Category.find().lean().sort({_id: -1});
    return response.render('mongodb/category', {tituloPagina: 'MongoDB - Category', datos: datos});

  } catch (error) {

    request.flash('css', 'danger');
    request.flash('message', [{msg: error.message}]);
    return response.redirect('/');

  }

}

// Guardar una categoria.
exports.category_add = (request, response) => {
  return response.render('mongodb/category_add', {tituloPagina: 'MongoDB - Category Add'});
}

// Guardar una categoria [ POST ].
exports.category_add_post = async (request, response) => {

  const {name} = request.body;
  try {

    const save = new Category({
      name: name,
    });

    await save.save();

    request.flash('css', 'success');
    request.flash('message', [{msg: 'Se creo el registro exitosamente.'}]);
    return response.redirect('/mongodb/category/add');

  } catch (error) {

    request.flash('css', 'danger');
    request.flash('message', [{msg: error.message}]);
    return response.redirect('/mongodb/category/add');

  }
}

// View Editar Categoria
exports.category_edit = async (request, response) => {
  const {id} = request.params;

  try {

    let category = await Category.findById(id).lean() // FindOne

    if (!category) {
      throw new Error('Error desconocido.');
    }

    return response.render('mongodb/category_edit', {tituloPagina: 'MongoDB - Category Edit', category: category});

  } catch (error) {

    request.flash('css', 'danger');
    request.flash('message', [{msg: error.message}]);
    return response.redirect('/mongodb/category');

  }
}

// Guardar editar categoria [ POST ]
exports.category_edit_post = async (request, response) => {

  const {id} = request.params;
  const {name} = request.body;

  try {

    let category = await Category.findById(id) // FindOne

    if (!category) {
      throw new Error('Error desconocido.');
    }

    await category.updateOne({ name: name, slug: slug(name) });

    request.flash('css', 'success');
    request.flash('message', [{msg: "Se modifico el registro exitosamente."}]);
    return response.redirect(`/mongodb/category/edit/${id}`);

  } catch (error) {

    request.flash('css', 'danger');
    request.flash('message', [{msg: error.message}]);
    return response.redirect('/mongodb/category');

  }
}

// Elimnar Categoria
exports.category_delete = async (request, response) => {

  const {id} = request.params;

  try {

    let category = await Category.findById(id) // FindOne

    if (!category) {
      throw new Error('Error desconocido.');
    }

    await category.remove();

    request.flash('css', 'success');
    request.flash('message', [{msg: "Se elimino el registro exitosamente."}]);
    return response.redirect(`/mongodb/category`);

  } catch (error) {
    request.flash('css', 'danger');
    request.flash('message', [{msg: error.message}]);
    return response.redirect('/mongodb/category');
  }
}

/*===========================================
PRODUCTOS
=============================================*/
exports.product = async (request, response) => {

  try {
    // Mostrar listado de categorias.
    // let datos = await Product.find().lean().sort({_id: -1});

    // inner join
    // let datos = await Product.aggregate(
    //   [
    //     {
    //       $lookup: {
    //         from: "categories",
    //         localField: "category_id",
    //         foreignField: "_id",
    //         as: "category"
    //       }
    //     },
    //     {
    //       $unwind: "$category"
    //     }
    //   ]
    // ).sort({_id: -1});

    // inner join ( segunda forma )
    let datos = await Product.find().populate("category_id").lean().sort({_id: -1});

    return response.render('mongodb/product', {tituloPagina: 'MongoDB - Products', datos: datos});

  } catch (error) {

    request.flash('css', 'danger');
    request.flash('message', [{msg: error.message}]);
    return response.redirect('/');

  }

}

// Guardar una producto.
exports.product_add = async (request, response) => {

  let categories = await Category.find().lean();
  return response.render('mongodb/product_add', {tituloPagina: 'MongoDB - Products Add', categories: categories});
}

// Guardar una producto [ POST ].
exports.product_add_post = async (request, response) => {

  const {name, description, price, category_id} = request.body;

  try {

    let product = await Product.findOne({name: name});

    if(product) {
      throw new Error('El nombre del producto ya existe.');
    }
    const save = new Product({
      category_id: category_id,
      name: name,
      price: price,
      description: description,
    });

    await save.save();

    request.flash('css', 'success');
    request.flash('message', [{msg: 'Se creo el registro exitosamente.'}]);
    return response.redirect('/mongodb/product/add');

  } catch (error) {

    request.flash('css', 'danger');
    request.flash('message', [{msg: error.message}]);
    return response.redirect('/mongodb/product/add');

  }
}

// Mostrar productos por categoria
exports.product_category = async (request, response) => {

  const { id } = request.params;

  try {

    let cat = await Category.findById(id).lean();

    if (!cat) {
      throw new Error('Error desconocido');
    }

    let datos = await Product.find({category_id: id}).populate("category_id").lean().sort({_id: -1});

    return response.render('mongodb/product', {tituloPagina: 'MongoDB - Products', datos: datos, category: cat});

  } catch (error) {

    request.flash('css', 'danger');
    request.flash('message', [{msg: error.message}]);
    return response.redirect('/');

  }

}

// Mostrar fotos de los productos
exports.product_photos = async (request, response) => {

  const { id } = request.params;

  try {

    let product = await Product.findById(id).lean();

    if (!product) {
      throw new Error('Error desconocido.');
    }

    let photos = await ProductPhoto.find({product_id: id}).lean().sort({_id: -1});
    return response.render('mongodb/product_photos', {tituloPagina: 'MongoDB - Products Photos', product: product, photos: photos});

  } catch (error) {
    request.flash('css', 'danger');
    request.flash('message', [{msg: error.message}]);
    return response.redirect('/mongodb/product');
  }

}

// Guardar las fotos de los productos
exports.product_photos_post = async (request, response) => {

  const form = new formidable.IncomingForm();
  form.maxFileSize = 100 * 1024 * 1024; // 100MB
  const { id } = request.params;

  try {

    let producto = await Product.findById(id).lean();

    if (!producto) {
      throw new Error('No existe el producto.');
    }

    // Aqui empieza el subir.
    form.parse(request, async (err, fields, files) => {

      try {

        if (err) {
          throw new Error(`Se produjo un error: ${err}`);
        }

        const file = files.photo;

        if (file.originalFilename === "") {
          throw new Error(`No se subio ninguna imagen.`);
        }

        const imageTypes = [
          "image/jpeg",
          "image/png",
        ];

        if (!imageTypes.includes(file.mimetype)) {
          throw new Error(`Por favor agrega una imagen JPG|PNG.`);
        }

        let unix = Math.round(+new Date() / 1000); // Formato timestamp.

        // Renombrar el archivo
        switch (file.mimetype) {
          case 'image/jpeg':
            nameFinish = `${unix}.jpg`;
            break;
          case 'image/png':
            nameFinish = `${unix}.png`;
            break;
        }

        const dirFile = path.join(__dirname, `../assets/uploads/products/${nameFinish}`);

        fs.copyFile(file.filepath, dirFile, function(err) {
          if (err) {
            throw new Error(`Error subiendo el archivo: ${err}`);
          }
        });

        save = new ProductPhoto({
          product_id: id,
          name: `${nameFinish}`,
        })

        await save.save();

        request.flash('css', 'success');
        request.flash('message', [{msg: 'Se creo el registro exitosamente.'}]);
        return response.redirect(`/mongodb/product/photo/${id}`);

      } catch (error) {
        request.flash('css', 'danger');
        request.flash('message', [{msg: error.message}]);
        return response.redirect(`/mongodb/product/photo/${id}`);
      }

    });

    // Aqui termina.

  } catch (error) {
    request.flash('css', 'danger');
    request.flash('message', [{msg: error.message}]);
    return response.redirect(`/mongodb/product/photo/${id}`);
  }
}

// Eliminar las fotos de los productos
exports.product_photos_delete = async (request, response) => {

  const { id, photo_id } = request.params;

  try {

    let product = await Product.findById(id);

    if (!product) {
      throw new Error('Error desconocido.');
    }

    let photo = await ProductPhoto.findById(photo_id);

    if (!photo) {
      throw new Error('Error desconocido.');
    }

    fs.unlinkSync(`./assets/uploads/products/${photo.name}`);

    await photo.remove();

    request.flash('css', 'success');
    request.flash('message', [{msg: 'Se elimino el registro exitosamente.'}]);
    return response.redirect(`/mongodb/product/photo/${id}`);

  } catch (error) {
    request.flash('css', 'danger');
    request.flash('message', [{msg: error.message}]);
    return response.redirect(`/mongodb/product/photo/${id}`);
  }
}