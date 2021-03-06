const mongoose = require('mongoose');

/*
 * Mongoose by default sets the auto_reconnect option to true.
 * We recommend setting socket options at both the server and replica set level.
 * We recommend a 30 second connection timeout because it allows for
 * plenty of time in most operating environments.
 */
var options = { //server: { socketOptions: { keepAlive: 300000, connectTimeoutMS: 30000 } },
                //replset: { socketOptions: { keepAlive: 300000, connectTimeoutMS : 30000 } },
                useNewUrlParser: true };

var mongodbUri = 'mongodb://raul.morais:buldog07@ds018258.mlab.com:18258/db_finance';
module.exports = mongoose.connect(mongodbUri, options);

mongoose.Error.messages.general.required = "O atributo '{PATH}' é obrigatório"
mongoose.Error.messages.Number.min = "O '{VALUE} informado é menor que o mínimo de '{MIN}'."
mongoose.Error.messages.Number.max = "O '{VALUE} informado é maior que o máximo de '{MAX}'."
mongoose.Error.messages.String.enum = "O '{VALUE} informado não é válido para o atribudo '{PATH}'."
/*
var conn = mongoose.connection;

conn.on('error', console.error.bind(console, 'connection error:'));

conn.once('open', function() {
  // Wait for the database connection to establish, then start the app.
  module.exports = conn
});*/
//module.exports = mongoose.connect('mongodb://raul.morais:buldog07@ds018258.mlab.com:18258/db_finance')
//module.exports = mongoose.connect('mongodb://raulmmorais:060281rm@ds018258.mlab.com:18258/db_finance')
