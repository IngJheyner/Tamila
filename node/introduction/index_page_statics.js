// Framework server con express.
const express = require('express');

// Libreria dotenv para creacion de variables
// Globales.
require('dotenv').config();

// Inicializamos express.
const app = express();

// Middleware, la utilizamos para paginas estaticas.
app.use(express.static('statics'));

//app.get("/", (request, response) => response.send("Hola mundo desde express con Node nodemon"));

app.listen(process.env.PORT, () => console.log('Corriendo desde express'));