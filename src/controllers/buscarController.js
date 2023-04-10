const Agricultores = require('../models/CadastrarModel');

exports.index = async (req, res) => {
    const totalAgricultores = await Agricultores.buscaAgricultores();
    res.render('buscar',{totalAgricultores});
  };

  exports.delete = async (req, res) => {
    if(!req.params.id) return res.render('404');
    
    const Agricultores = await Agricultores.delete(req.params.id);
    if(!Agricultores) return res.render('404');
 
    req.flash('success', 'Informações apagada com sucesso');
    req.session.save(() => res.redirect('/buscar'));
    return;
 };