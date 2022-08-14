const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const scrapperSchema = new Schema({
  nombre:  String,
  descripcion: String
});

// aca creamos el modelo
const scrapping = mongoose.model('scrapping', scrapperSchema);

module.exports = scrapping;