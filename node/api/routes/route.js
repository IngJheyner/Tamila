const express = require('express'); // Importamos express

const router = express.Router(); // Inicializamos express

const exampleController = require('../controllers/exampleController'); // Importamos el controlador

const mysqlController = require('../controllers/mysql/mysqlController'); // Importamos el controlador mysql

const accessController = require('../controllers/accessController'); // Importamos el controlador de acceso

const auth = require('../middlewares/auth'); // Importamos el middleware de autenticacion

let api_route = '/api/v1'; // Ruta base de la api

/*===========================================
=            Rutas de ejemplo               =
=============================================*/
router.get(`${api_route}/example`, exampleController.method_get); // Ruta para obtener un ejemplo
router.post(`${api_route}/example`, exampleController.method_post); // Ruta para obtener un ejemplo
router.post(`${api_route}/example-upload`, exampleController.method_upload); // Ruta para obtener un ejemplo
router.delete(`${api_route}/example/:id`, exampleController.method_delete); // Ruta para obtener un ejemplo

/*===========================================
RUTAS PARA REALIZARLLO CON BASE DE DATOS
=============================================*/
router.get(`${api_route}/mysql/products`, [auth.comparateToken], mysqlController.products); // Ruta para obtener productos
router.get(`${api_route}/mysql/products/:id`, mysqlController.products_id); // Ruta para obtener productos por id
router.post(`${api_route}/mysql/products`, mysqlController.products_post); // Ruta para obtener productos por id
router.put(`${api_route}/mysql/products/:id`, mysqlController.products_put); // Ruta para actualizar productos
router.delete(`${api_route}/mysql/products/:id`, mysqlController.products_delete); // Ruta para actualizar productos

/*===========================================
LOGIN
=============================================*/
router.post(`${api_route}/access/login`, accessController.login); // Ruta para el login

module.exports = router; // Exportamos el router