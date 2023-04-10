const mongoose = require('mongoose');
const validator = require('validator');

const AgricultoresSchema = new mongoose.Schema({
  cnpjCpf: { type: String, required: true, default: '' }, //true
  nome: { type: String, required: false, default: '' },
  dataDeNascimento: { type: String, required: false, default: '' },
  rg: { type: String, required: false, default: '' },
  endereco: { type: String, required: true, default: '' },
  inscricaoEstadual: { type: String, required: false, default: '' },
  email: { type: String, required: false, default: '' },
  telefone: { type: String, required: true, default: '' },
  cnae: { type: String, required: false, default: '' },
  cnpjMatriz: { type: String, required: false, default: '' },
  nomeFantasia: { type: String, required: false, default: '' },
  nomePresidente: { type: String, required: false, default: ' ' },
  numeroDaPasta: { type: String, required: true, default: '' },
  dataDeVisita: { type: String, required: false, default: '' },
  dataDeAbertura: { type: String, required: false, default: '' },
  dataMandato: { type: String, required: false, default: '' },
  numero: { type: String, required: false, default: '' },
  cep: { type: String, required: false, default: '' },
  criadoEm: { type: Date, default: Date.now }
});

const AgricultoresModel = mongoose.model('agricultores', AgricultoresSchema);

function Agricultores(body) {
this.body = body; 
this.errors = [];
this.agricultores = null;
}

Agricultores.prototype.register = async function() {
  this.valida();
  if(this.errors.length > 0) return;
  this.agricultores = await AgricultoresModel.create(this.body);
};

Agricultores.prototype.valida = function() { // VALIDAÇÃO DO FORMULÁRIO
  this.cleanUp();

//valida cnpj ou cpf
if (!this.body.cnpjCpf) {
  this.errors.push("O campo 'CPF ou CNPJ' é obrigatório.");
} else if (this.body.cnpjCpf.length === 11) { // Valida CPF
  if (!cpfValidate(this.body.cnpjCpf)) {
    this.errors.push("CPF inválido.");
  }
} else if (this.body.cnpjCpf.length === 14) { // Valida CNPJ
  if (!cnpjValidate(this.body.cnpjCpf)) {
    this.errors.push("CNPJ inválido.");
  }
} else {
  this.errors.push("O campo 'CPF ou CNPJ' deve ter 11 ou 14 caracteres.");
}


};

Agricultores.prototype.cleanUp = function() {
  for(const key in this.body) {
    if(typeof this.body[key] !== 'string') {
      this.body[key] = '';
    }
  }

  this.body = {
    cnpjCpf: this.body.cnpjCpf,
    nome: this.body.nome,
    dataDeNascimento: this.body.dataDeNascimento,
    rg: this.body.rg,
    endereco: this.body.endereco,
    numero: this.body.numero,
    inscricaoEstadual: this.body.inscricaoEstadual,
    email: this.body.email,
    telefone: this.body.telefone,
    cnae: this.body.cnae,
    cnpjMatriz: this.body.cnpjMatriz,
    nomeFantasia: this.body.nomeFantasia,
    nomePresidente: this.body.nomePresidente,
    numeroDaPasta: this.body.numeroDaPasta,
    dataDeVisita: this.body.dataDeVisita,
    dataDeAbertura: this.body.dataDeAbertura,
    dataMandato: this.body.dataMandato,
    cep: this.body.cep,
      };
    };

Agricultores.prototype.edit = async function(id){
  if(typeof id !== 'string') return;
  this.valida();
  if(this.errors.length > 0) return;
  this.agricultores = await AgricultoresModel.findByIdAndUpdate(id, this.body, { new: true });
};

//Da pagina buscar 
Agricultores.buscaPorId = async function(id) {
  if(typeof id !== 'string') return;
const agricultores = await AgricultoresModel.findById(id);
return agricultores;
}

Agricultores.buscaAgricultores = async function() { // busca os agricultores todos
const agricultores = await AgricultoresModel.find() //pode filtrar qualquer contato
.sort({ criadoEM: -1 });  //1 PARA ORDEM CRESCENTE -- 2 PARA DECRESCENTE
return agricultores;
}

Agricultores.buscaTotalAgricultores = async function() {
  const total = await AgricultoresModel.countDocuments();
  return total;
}
 
Agricultores.delete = async function(id) {
  if(typeof id !== 'string') return;
const agricultores = await AgricultoresModel.findOneAndDelete({_id: id});
return agricultores;
}


module.exports = Agricultores;
