const { validationResult } = require('express-validator');
const User = require('../model/user-mysql');
const bcrypt = require('bcryptjs');

/*===========================================
register usuarios
=============================================*/
exports.register = (request, response) => {
  return response.render('users/register', {tituloPagina: 'Registro de usuarios'});
}

// Registrar usuario
exports.register_post = async (request, response) => {

  const errors = validationResult(request);

  if (!errors.isEmpty()) {
    request.flash('css', 'danger');
    request.flash('message', errors.array());
    return response.redirect('/users/register');
  }

  const {nombre, correo, password, password2} = request.body;

  try {

    let user = await User.findOne({
      where: {
        email: correo
      }
    });

    if (user) {
      throw new Error('El e-mail ya esta siendo utilizado por otro usuario');
    }

    let save = await User.create({
      name: nombre,
      email: correo,
      password: password
    });

    if (!save) {
      throw new Error('No se pudo guardar el usuario');
    } else {
      request.flash('css', 'success');
      request.flash('message', [{msg: 'Usuario registrado correctamente'}]);
      return response.redirect('/users/register');
    }

  } catch (error) {
    request.flash('css', 'danger');
    request.flash('message', error.message);
    return response.redirect('/users/register');
  }
}

/*===========================================
login usuarios
=============================================*/
exports.login = (request, response) => {
  return response.render('users/login', {tituloPagina: 'Login de usuarios'});
}
exports.login_post = async (request, response) => {

  const errors = validationResult(request);

  if (!errors.isEmpty()) {
    request.flash('css', 'danger');
    request.flash('message', errors.array());
    return response.redirect('/users/login');
  }

  const {correo, password} = request.body;

  try {

    let user = await User.findOne({
      where: {
        email: correo
      },
      raw: true
    });

    if (!user) {
      throw new Error('Los datos ingresados no son correctos a');
    }

    bcrypt.compare(password, user.password, (error, result) => {
      if (error) {
        throw new Error('Los datos ingresados no son correctos b');
      }
      if (result) {

        request.login(user, (error) => {
          if (error) {
            throw new Error('Error al crear la sesión del usuario, por favor vuelva a intentarlo');
          }

          request.flash('css', 'success');
          request.flash('message', [{msg: 'Bienvenido a la aplicación'}]);
          return response.redirect('/users/protected');
        });

      } else {
        request.flash('css', 'danger');
        request.flash('message', [{msg: 'Los datos ingresados no son correctos c'}]);
        return response.redirect('/users/login');
      }
    });

  } catch (error) {

    request.flash('css', 'danger');
    request.flash('message', [{msg: error.message}]);
    return response.redirect('/users/login');

  }
}

exports.protected = (request, response) => {
  return response.render('users/protected', {tituloPagina: 'Bienvenido a la aplicación'});
}

exports.lagout = (request, response, next) => {
  request.logout((error) => {
    if (error) {
     return next(error);
    }
  });
  return response.redirect('/users/login');
}