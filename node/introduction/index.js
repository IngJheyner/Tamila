// Framework server con express.
const express = require('express');
const session = require('express-session');
const csrf = require('csurf');
const flash = require('connect-flash');

// Libreria dotenv para creacion de variables
// Globales.
require('dotenv').config();

// Inicializamos express.
const app = express();

// Se llama a passport para la autenticacion.
const passport = require('passport');

// Se llama a la conexion con mongoDB
require('./database/mongodb');
// Tablas o schema en mongodb
require('./model/category');
require('./model/product');
require('./model/productPhoto');

// Se llama a la conexion con mysql.
const mysqlConnection = require('./database/mysql');
// Tablas o schema en mysql
require('./model/category-mysql');
require('./model/product-mysql');
require('./model/productPhoto-mysql');
require('./model/user-mysql');
mysqlConnection.sync().then(
  () => {
    console.log('me conecte a mysql');
  }
).catch(
  (error) => {
    console.log('No me conecte a mysql ' + error);
  }
);

// Configuracion de las sessiones.
app.use(
  session({
      secret: process.env.SECRET,
      resave: false,
      saveUninitialized: false,
      name: 'secret-name',
      cookie: {
        expires: 600000
      }
    }
  )
);

// Inicializar passport. (siempre despues de session)
app.use(passport.initialize());
app.use(passport.session());
passport.serializeUser((user, done)=>done(null, {
    id:user.id,
    name: user.name
    //perfil_id:user.perfil_id
}));
passport.deserializeUser(async(user, done)=>{
    return done(null, user);
});

// Habilitamos para formularios.
app.use(express.urlencoded({extended: true}));

// Inicializar CSRF.
app.use(csrf());

// Configuracion de handlebars
const {create} = require('express-handlebars');
const hbs = create({
  extname: '.hbs',
  defaultLayout: 'frontend',
  partialsDir:["./views/components"],
  helpers: require('./views/helpers/handlebars'), // Agregar helpers funciones de ayuda.
});

// Se informa que el motor de plantillas es handlebars.
app.engine('.hbs', hbs.engine);
app.set("view engine", ".hbs");
app.set("views", "./views");

// Se configura las rutas estaticas.
app.use(express.static(__dirname+"/assets"));

// Inicializamos flash.
app.use(flash());

// Variables locales.
app.use((request, response, next) => {
  response.locals.example_local = 'Hola desde mi variable local';
  response.locals.csrfToken = request.csrfToken();

  response.locals.css = request.flash('css');
  response.locals.message = request.flash('message');

  // Crear variables para las sessiones.
  if (request.isAuthenticated())
  {
      response.locals.user_id = request.user.id;
      response.locals.user_name = request.user.name;
  }

  next();
});

// Se registran las rutas.
app.use("/", require('./routes/route'));

// Personalizar las paginas 404.
app.use( (request, response) => {
  response.status(404).render('error/404', {tituloPagina: 'Pagina no encontrada'});
});

// Levantamos un servidor
app.listen(process.env.PORT, () => console.log('Corriendo desde express'));