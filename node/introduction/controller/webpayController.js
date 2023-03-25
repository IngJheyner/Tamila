let Client = require('node-rest-client').Client;
let webpay_petition;
let webpay_answer;

exports.home = function(req, res) {
  return res.render('webpay/home', {tituloPagina: 'WebPayTransfer'});
}

exports.transaction = function(req, res) {

  let client = new Client();

  let args = {
    data: {
      "buy_order": "ordenCompra12345678",
      "session_id": "sesion1234557545",
      "amount": 10000,
      "return_url": "http://localhost:3000/webpay/return"
    },
    headers: {
      "Tbk-Api-Key-Id": process.env.WEBPAY_ID,
      "Tbk-Api-Key-Secret": process.env.WEBPAY_SECRET,
      "Content-Type": "application/json",
    }
  };

  client.post(process.env.WEBPAY_URL, args, function(data, response) {
    webpay_petition = data;
    webpay_answer = response;
  });

  return res.render('webpay/transaction', {tituloPagina: 'WebPayTransfer', webpay_petition, webpay_answer});

}

exports.return = function(req, res) {

  const { token_ws } = req.query;

  let client = new Client();

  let args = {
    data: {},
    headers: {
      "Tbk-Api-Key-Id": process.env.WEBPAY_ID,
      "Tbk-Api-Key-Secret": process.env.WEBPAY_SECRET,
      "Content-Type": "application/json",
    }
  };

  client.put(process.env.WEBPAY_URL + '/' + token_ws, args, function(data, response) {
    webpay_petition = data;
    webpay_answer = response;
  });

  return res.render('webpay/return', {tituloPagina: 'WebPayTransfer', webpay_petition, webpay_answer, token_ws});
}