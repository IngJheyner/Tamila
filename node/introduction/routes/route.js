const express = require('express');
const {body} = require('express-validator');

// Inicializamos las rutas
const router = express.Router();

// Mostrar el primer controlador utilizanod rutas
const homeController = require('../controller/homeController');
const utilesController = require('../controller/utilesController');
const mongoController = require('../controller/mongoController');
const mysqlController = require('../controller/mysqlController');
const accessController = require('../controller/accessController');
const verificatedUsers = require('../middlewares/vericatedUsersMiddlewares');

// Consumir una API
const webpayController = require('../controller/webpayController');

/*===========================================
USUARIOS
=============================================*/
router.get('/users/register', accessController.register);
// middleware para validar los datos del formulario
router.post('/users/register', [
  body("nombre", "El nombre es obligatrio").trim().notEmpty().escape(),
  body("correo", "El campo E-Mail es obligatorio y debe tener un formato válido").trim().isEmail().normalizeEmail(),
  body("password", "La contraseña es obligatoria")
  .trim()
  .isLength({min:6})
  .escape()
  .custom((value, {req})=>{
      if(value!== req.body.password2)
      {
          throw new Error("La contraseñas ingresadas no coinciden");
      }else
      {
          return value;
      }
  })
], accessController.register_post);

/*===========================================
login
=============================================*/
router.get('/users/login', accessController.login);
router.post('/users/login', [
  body("correo", "El campo E-Mail es obligatorio y debe tener un formato válido").trim().isEmail().normalizeEmail(),
  body("password", "La contraseña es obligatoria")
  .trim()
  .isLength({min:6})
  .escape()
], accessController.login_post);
// Pagina que se muestra despues de loguearse
router.get('/users/protected', [verificatedUsers], accessController.protected);

router.get('/users/lagout', accessController.lagout); // Cerrar sesion

/*===========================================
HOME
=============================================*/
router.get('/', homeController.home);
router.get('/nosotros', homeController.nosotros);

/*===========================================
UTILES
=============================================*/
router.get('/utiles/home', utilesController.home);
router.get('/utiles/mail', utilesController.mail);
router.get('/utiles/qr', utilesController.qr);
// router.get('/nosotros', homeController.nosotros);
// router.get('/parametros/:id/:slug', homeController.parametros);
// router.get('/query-string/:id/:slug', homeController.query_string);

/*===========================================
MONGODB
Home para realizar el crud productos y categorias
=============================================*/
router.get('/mongodb/home', mongoController.home);

/*===========================================
Categoria
=============================================*/
router.get('/mongodb/category', mongoController.category);

// Guardar categoria
router.get('/mongodb/category/add', mongoController.category_add);
router.post('/mongodb/category/add', mongoController.category_add_post); // Post add

// Editar Categoria
router.get('/mongodb/category/edit/:id', mongoController.category_edit); // view Edit
router.post('/mongodb/category/edit/:id', mongoController.category_edit_post); // Post Edit
router.get('/mongodb/category/delete/:id', mongoController.category_delete); // Get Delete

/*===========================================
Productos
=============================================*/
router.get('/mongodb/product', mongoController.product);

// Guardar productos
router.get('/mongodb/product/add', mongoController.product_add);
router.post('/mongodb/product/add', mongoController.product_add_post); // Post add
router.get('/mongodb/product/category/:id', mongoController.product_category); // show list products for category

// Cargar las fotos de los productos
router.get('/mongodb/product/photo/:id', mongoController.product_photos);
router.post('/mongodb/product/photo/:id', mongoController.product_photos_post);
router.get('/mongodb/product/photo/delete/:id/:photo_id', mongoController.product_photos_delete);

/*===========================================
MYSQL
Home para realizar el crud productos y categorias
=============================================*/
router.get('/mysql/home', mysqlController.home);

/*===========================================
Categoria
=============================================*/
router.get('/mysql/category', mysqlController.category);
router.get('/mysql/category/add', mysqlController.category_add);
router.post('/mysql/category/add', mysqlController.category_add_post);

// Editar categoria
router.get('/mysql/category/edit/:id', mysqlController.category_edit);
router.post('/mysql/category/edit/:id', mysqlController.category_edit_post);

// Eliminar categoria
router.get('/mysql/category/delete/:id', mysqlController.category_delete);

/*===========================================
PRODUCTOS
=============================================*/
router.get('/mysql/product', mysqlController.product);

/*===========================================
CONSUMIR API WEBPAY
=============================================*/
router.get('/webpay/home', webpayController.home);
router.get('/webpay/transaction', webpayController.transaction);
router.get('/webpay/return', webpayController.return);

module.exports = router;