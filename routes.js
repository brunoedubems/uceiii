const express = require('express');
const route = express.Router();

const homeController = require('./src/controllers/homeController');
const loginController = require('./src/controllers/loginController');
const agricultoresController = require('./src/controllers/agricultoresController');
const BuscarController = require('./src/controllers/buscarController');
const { loginRequired } = require('./src/middlewares/middleware');

// Rotas da home
route.get('/', homeController.login);

// Rotas de login
route.get('/login/index', loginController.index);
route.post('/login/login', loginController.login);
route.get('/login/logout', loginController.logout);

//registra associação ou usuario
route.get('/cadastrar', loginRequired, agricultoresController.index);
route.post('/cadastrar/register', loginRequired, agricultoresController.register);

//buscar
route.get('/buscar', loginRequired, BuscarController.buscar);
route.get('/cadastrar/index/:id', loginRequired, agricultoresController.editIndex);
route.post('/cadastrar/edit/:id', loginRequired, agricultoresController.edit);
route.get('/agricultores/delete/:id', loginRequired, agricultoresController.delete);


//registra usuarios
route.post('/login/register', loginController.register); // registra usuario



module.exports = route;
