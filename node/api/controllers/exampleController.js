const Joi = require("@hapi/joi"); // Para validar los datos que nos envian
const fomidable = require("formidable"); // Para poder leer los datos que nos envian desde el cliente
const fs = require("fs"); //file system
const path = require("path"); // Para poder leer los datos que nos envian desde el cliente


exports.method_get = (req, res) => {
  res.json({ message: "Hello World GET" });
};

exports.method_post = (req, res) => {

  const { email, password } = req.body;

  // Validate data before we make a user
  let schema = Joi.object({
    email: Joi.string().min(6).required().email({ minDomainSegments: 2, tlds: { allow: ['com', 'net'] } }).messages({
      'string.empty': `El campo email no puede estar vacio`,
      'string.min': `El campo email debe tener al menos {#limit} caracteres`,
      'string.email': `El campo email debe ser un email valido`,
      'any.required': `El campo email es requerido`,
    }),
    password: Joi.string().min(6).required().messages({
      'string.empty': `El campo password no puede estar vacio`,
      'string.min': `El campo password debe tener al menos {#limit} caracteres`,
      'any.required': `El campo password es requerido`,
    }),
  });

  const { error, value } = schema.validate({ email: email, password: password }); // se ejecuta el metodo validate de Joi

  if (error) {
    return res.status(400).json({ message: error.details[0].message }); // Si hay un error, se envia un mensaje
  }

  res.send(`Hello World POST ${email} ${password}`);
};

// Cargar archivos
exports.method_upload = (req, res) => {

  const form = new fomidable.IncomingForm(); // Creamos un objeto de tipo form
  form.maxFileSize = 10 * 1024 * 1024; // 10MB

  form.parse(req, async (err, fields, files) => {

    try {

      if (err) {

        return res.status(400).json({ message: 'Se produjo un error: ' + err }); // Si hay un error, se envia un mensaje

      } // Si hay un error

      const file  = files.photo; // Obtenemos el archivo

      if(file.originalFilename === "") {

        return res.status(400).json({ message: 'No se ha seleccionado ningun archivo' }); // Si hay un error, se envia un mensaje

      }

      const imageTypes = [
        "image/jpeg",
        "image/png",
      ];

      if(!imageTypes.includes(file.mimetype)) {

        return res.status(400).json({ message: 'Por favor agrega una imagen JPG|PNG' }); // Si hay un error, se envia un mensaje

      }

      let unix = Math.round(+new Date()/1000); // Obtenemos la fecha actual en segundos

      switch (file.mimetype) {

        case "image/jpeg":
          nameFinishing = unix + '.jpg';
          break;

        case "image/png":
          nameFinishing = unix + '.png';
          break;
      }

      const dirFile = path.join(__dirname, `../assets/uploads/example/${nameFinishing}`); // Guardamos la imagen en el servidor

      fs.copyFile(file.filepath, dirFile, (err) => {
        if (err) {
          return res.status(400).json({ message: 'Se produjo un error: ' + err }); // Si hay un error, se envia un mensaje
        }
      });

      // Si tuvieras que guarar el registro en tu base de datos adivina donde va ese codigo? :D

      return res.status(200).json({ message: 'Archivo subido correctamente' }); // Si todo sale bien, se envia un mensaje

    } catch (error) {
      return res.status(400).json({ message: 'Se produjo un errors: ' + error }); // Si hay un error, se envia un mensaje
    }

  });
};

exports.method_delete = (req, res) => {
  res.send("Hello World DELETE");
};