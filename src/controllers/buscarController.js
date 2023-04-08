const agricultores = require('../models/AgricultoresModel');
exports.buscar = (req, res) => {
    res.render('buscar',{
        agricultores: {}
    });
};
