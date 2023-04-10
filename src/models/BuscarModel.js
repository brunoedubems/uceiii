const mongoose = require('mongoose');

//metodos estáticos
const AgricultoresModel = mongoose.model('agricultores', AgricultoresSchema);

AgricultoresModel.buscaAgricultores = async function() { // busca os agricultores todos
    const agricultores = await AgricultoresModel.find() //pode filtrar qualquer contato
    .sort({ criadoEM: -1 });  //1 PARA ORDEM CRESCENTE -- 2 PARA DECRESCENTE
    return agricultores;
    }
    
//Da pagina buscar 
AgricultoresModel.buscaPorId = async function(id) {
    if(typeof id !== 'string') return;
  const agricultores = await AgricultoresModel.findById(id);
  return agricultores;
  }
  

  AgricultoresModel.delete = async function(id) {
    if(typeof id !== 'string') return;
  const agricultores = await AgricultoresModel.findOneAndDelete({_id: id});
  return agricultores;
  }
  
  
  