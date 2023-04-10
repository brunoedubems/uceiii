const Agricultores = require('../models/CadastrarModel');

exports.home = async (req, res) => {
  try {
    const agricultores = await Agricultores.buscaAgricultores();
    const totalAgricultores =  await agricultores.length;
    res.render("home", { totalAgricultores });
  } catch (error) {
    console.log(error);
  }
};

