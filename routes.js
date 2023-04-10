const express = require('express');
const route = express.Router();

const loginController = require('./src/controllers/loginController');
const CadastrarController = require('./src/controllers/cadastrarController');
const BuscarController = require('./src/controllers/buscarController');
const HomeController = require('./src/controllers/homeController');
const { loginRequired } = require('./src/middlewares/middleware');


// Rotas de login
route.get('/login/index', loginController.index);
route.post('/login/login', loginController.login);
route.get('/login/logout', loginController.logout);

route.get('/loginCadastrar',loginRequired, loginController.indexCadastrar); // cadastrar LOGIN
route.post('/loginCadastrar',loginRequired, loginController.registerLogin);

// Rotas da home
route.get('/',loginRequired, HomeController.home);

//registra associação ou usuario
route.get('/cadastrar', loginRequired, CadastrarController.index); //colocar na pagina cadastrar
route.post('/cadastrar', loginRequired, CadastrarController.register); // cadastra a 1 vez

route.get('/cadastrar/:id', loginRequired, CadastrarController.editIndex); // rota  do editar com o ID
route.post('/:id', loginRequired, CadastrarController.edit); // rota para editar

//buscar
route.get('/buscar', loginRequired, BuscarController.index);
route.get('/buscar/:id', loginRequired, CadastrarController.delete);





module.exports = route;
