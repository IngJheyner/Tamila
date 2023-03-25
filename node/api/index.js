const express = require('express'); // Importamos express

const app = express(); // Inicializamos express

const bodyParser = require('body-parser'); // Para poder leer los datos que nos envian desde el cliente

require('dotenv').config(); // Variables de entorno

const cors = require('cors'); // Para poder hacer peticiones desde el cliente

app.use(cors(
  {
    origin: 'http://localhost:3000',
  },
)); // Para poder hacer peticiones desde el cliente

// Conexion a mysql
const mysqlConnection = require('./database/mysql');
mysqlConnection.sync()
  .then(() => {
    console.log('Conectado a la base de datos');
  }).catch((err) => { console.log(err); });
require('./models/product-mysql');
require('./models/category-mysql');
require('./models/user-mysql');
require('./models/productPhoto-mysql');

// Middlewares (Funciones que se ejecutan antes de que lleguen a las rutas) boyParser
app.use(bodyParser.urlencoded({ extended: false }));

app.use(bodyParser.json()); // Para que el servidor entienda los datos que nos envian en formato json

app.use(express.static(`${__dirname}/assets`)); // Para que el servidor entienda los archivos estaticos

app.use('/', require('./routes/route')); // Rutas de la api

// Error 404
app.use((req, res) => { // Si no encuentra la ruta
  res.status(404).json({
    message: 'Error 404 - Recurso no encontrado',
  });
});

app.listen(process.env.PORT, () => { // Iniciamos el servidor
  console.log(`Server running on port ${process.env.PORT}`);
});