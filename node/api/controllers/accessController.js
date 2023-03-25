const Joi = require('@hapi/joi');
const jwt = require('jwt-simple');
const moment = require('moment');
const User = require('../models/user-mysql');
const bcrypt = require('bcryptjs');

// Login
exports.login = async (req, res) => {

  const { email, password } = req.body; // Destructuring

  // Validacion de datos
  const schema = Joi.object({
    email: Joi.string().email({ minDomainSegments: 2}).min(6).max(50).required().messages({
      'string.empty': `El campo email no puede estar vacio`,
      'any.required': `El campo email es requerido`,
      'string.email': `El campo email debe ser un email valido`,
      'string.min': `El campo email debe tener al menos {#limit} caracteres`,
      'string.max': `El campo email debe tener como maximo {#limit} caracteres`,
    }),
    password: Joi.string().min(6).max(50).required().messages({
      'string.empty': `El campo password no puede estar vacio`,
      'any.required': `El campo password es requerido`,
      'string.min': `El campo password debe tener al menos {#limit} caracteres`,
      'string.max': `El campo password debe tener como maximo {#limit} caracteres`,
    }),
  });

  const { error, value } = schema.validate({ email: email, password: password });

  if (error) {
    return res.status(400).json({ message: error.message });
  }
  else {

    try {

      // Buscamos el usuario por el correo
      let user = await User.findOne({
        raw: true,
        where: { email }
      });

      if(!user) {
        return res.status(400).json({ message: 'Usuario no encontrado' });
      }

      // Comparamos las contraseñas
      await bcrypt.compare(password, user.password, (err, result) => {

        if(err) {
          return res.status(400).json({ message: 'Error al comparar las contraseñas' });
        }

        // Si las contraseñas coinciden creamos el token
        if(result) {

          // Creamos el token
          let payload = {
            sub: user.id,
            name: user.name,
            email: user.email,
            iat: moment().unix(), // Fecha de creacion del token
            exp: moment().add(30, 'days').unix() // Fecha de expiracion del token
          }

          let token = jwt.encode(payload, process.env.SECRET_KEY);

          return res.status(200).json({
            token: token,
            user: user.name
          });
        }

      });

    } catch (error) {
      return res.status(400).json({ message: error.message });
    }
  }
};