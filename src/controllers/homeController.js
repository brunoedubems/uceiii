const Agricultores = require('../models/AgricultoresModel');

exports.index = async (req, res) => {
  const agricultores = await Agricultores.buscaAgricultores();
  res.render('buscar', { agricultores });
};

exports.login = async (req, res) => {
  const agricultores = await Agricultores.buscaAgricultores();
  res.render('login', { agricultores });
};