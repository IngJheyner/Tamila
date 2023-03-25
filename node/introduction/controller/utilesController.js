exports.home = (request, response) => {
  return response.render("utiles/home", { tituloPagina: 'Utiles'});
};

/*===========================================
EMAIL
=============================================*/
const nodemailer = require('nodemailer');
exports.mail = async (request, response) =>
{
    const transport = nodemailer.createTransport(
        {
            host: process.env.SMTP_SERVER,
            port: process.env.SMTP_PORT,
            auth:{
                user: process.env.SMTP_USER,
                pass: process.env.SMTP_PASSWORD
            }
        });
    await transport.sendMail(
        {
            from: '"Ejemplo node" <' + process.env.SMTP_USER + '>',
            to: "info@tamila.cl",
            subject: "E-Mail de prueba desde Curso",
            html: `<h1>Hola título del correo</h1><hr/><p>esto es un párrafo</p>`

        });
    return response.send("correo enviado");
}

/*===========================================
CODIGO QR
=============================================*/
const codigoQR = require('qrcode');
exports.qr = (request, response) => {

  let url = "https://www.tamila.cl";

  codigoQR.toDataURL(url, (err, src) => {

    if(err) {

      return response.send('error ' + err);

    }

    return response.render("utiles/qr", { tituloPagina: 'QR', src: src, url: url});

  });

};