const mongoose = require('mongoose');

const AgricultoresModel = mongoose.model('agricultores', AgricultoresSchema);

Agricultores.buscaTotalAgricultores = async function() {
  const total = await AgricultoresModel.countDocuments();
  return total;
}
 
module.exports = Home;
