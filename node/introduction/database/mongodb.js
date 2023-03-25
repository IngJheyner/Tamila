const mongoose = require('mongoose');

mongoose.connect(process.env.URI_LOCAL)
                .then(() => {
                  console.log('me conecte a mogo!');
                }).catch((err) => {
                  console.log('no me conecte a mongo' + err.message);
                });