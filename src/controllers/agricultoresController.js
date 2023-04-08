const Agricultores = require('../models/AgricultoresModel');
//
exports.index = (req, res) => {
    res.render('cadastrar', {
        agricultores: {}
    });
};

exports.register = async(req, res) => {
    try {
        const agricultores = new Agricultores(req.body);
        await agricultores.register();
        
        if(agricultores.errors.length > 0) {
            req.flash('errors', agricultores.errors);
            req.session.save(() => res.redirect('/cadastrar'));
            return;
        }
    
        req.flash('success', 'Agricultor registrado com sucesso!');
        req.session.save(() => res.redirect(`/cadastrar/index/${agricultores.agricultores._id}`))
        // req.session.save(() => res.redirect(`/cadastrar/index/${agricultores.agricultores._id}`))
        return ;
    } catch(e) {
        console.log(e);
        return res.render('404');
    }  
};

exports.editIndex = async (req, res) => {
   if(!req.params.id) return res.render('404');
   
   const agricultores = await Agricultores.buscaPorId(req.params.id);
   if(!agricultores) return res.render('404');

   res.render('cadastrar', { agricultores });
};

exports.edit = async(req, res) => {
    try {
        if(!req.params.id) return res.render('404'); 
        const agricultores = new Agricultores(req.body);
        await agricultores.edit(req.params.id);
    
        if(agricultores.errors.length > 0) {
            req.flash('errors', agricultores.errors);
            req.session.save(() => res.redirect('/cadastrar'));
            return;
        }
    
        req.flash('success', 'Agricultores editado com sucesso');
        req.session.save(() => res.redirect(`/cadastrar/index/${agricultores.agricultores._id}`));
        return;
    } catch(e) {
        console.log(e);
        return res.render('404');
    } 
}

exports.delete = async (req, res) => {
    if(!req.params.id) return res.render('404');
    
    const agricultores = await Agricultores.delete(req.params.id);
    if(!agricultores) return res.render('404');
 
    req.flash('success', 'Agricultores apagado com sucesso');
    req.session.save(() => res.redirect('back'));
    return;
 };
