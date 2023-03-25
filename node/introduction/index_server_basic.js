const http = require('http');

const server = http.createServer( (request, response) => {
  response.end('Hola mundo con las manos en el codigo');
});

server.listen(5000, () => {
  console.log("Servidor ejecutandose!!");
});
