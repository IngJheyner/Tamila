// exports.home = (request, response) => response.send("Hola desde mi controlador");
// exports.home = (request, response) => response.json({mensaje: "hola"});

// exports.nosotros = (request, response) => response.send("Sobre nosotros");

// // http://localhost:3000/parametros/1/hola-lagos.
// exports.parametros = (request, response) => {

//   // Desestructuracion.
//   const {id, slug} = request.params;

//   // response.send(`id=${request.params.id}`);
//   response.send(`id=${id} | slug=${slug}`);
// }

// // http://localhost:3000/query-string?id=1&slug=hola-lagos
// exports.query_string = (request, response) => {

//   // Desestructuracion.
//   const {id, slug} = request.query;

//   // response.send(`id=${request.params.id}`);
//   response.send(`id=${id} | slug=${slug}`);
// }


exports.home = (request, response) => {

  // let paises = [
  //   {
  //     nombre: 'Bolivia',
  //     nic: "bo"
  //   },
  //   {
  //     nombre: 'Argentina',
  //     nic: "ar"
  //   },
  //   {
  //     nombre: 'Venezuela',
  //     nic: "ve"
  //   },
  //   {
  //     nombre: 'Mexico',
  //     nic: "mx"
  //   },
  // ];

  // let tituloPagina= "Curso de node.js";
  // let nombre = "David Ibagon";
  // return response.render("home/home", {
  //   tituloPagina: tituloPagina,
  //   nombre: nombre,
  //   paises: paises,
  // });
  let tituloPagina= "Home";
  return response.render("home/home",{ tituloPagina: tituloPagina})
}

exports.nosotros = (request, response) => {
  return response.render("home/nosotros");
};
