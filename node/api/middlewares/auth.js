const jwt = require('jwt-simple');
const moment = require('moment');

exports.comparateToken = (req, res, next) => {

  // Comprobamos si nos llega la autorizacion
  if(!req.headers.authorization) {
    return res.status(403).json({ message: 'No tienes autorizacion' }); // 403: Forbidden
  }

  let token = req.headers.authorization.replace(/['"]+/g, ''); // Limpiamos el token

  try {

    let payload = jwt.decode(token, process.env.SECRET_KEY); // Decodificamos el token

    // Comprobamos si el token ha expirado
    if(payload.exp <= moment().unix()) {
      return res.status(401).json({ message: 'El token ha expirado' });
    }

  } catch (error) {

    return res.status(401).json({ message: 'El token no es valido' });

  }

  next(); // Se debe indicar para seguir la ejecucion del sistema.
}

