const Login = require('../models/LoginModel');

//buscar sessão e direciona para a view home

exports.index = (req, res) => {
    if(req.session.user) return res.render('home');
    return res.render('login');
  };
  
exports.indexCadastrar = (req, res) => {
    return res.render('loginCadastrar');
  };
  
 exports.registerLogin = async function(req, res) {
    try {
        const login = new Login(req.body);
        await login.register(); // registra e valida os campos

        if(login.errors.length > 0) {
            req.flash('errors', login.errors);
            req.session.save(function() {
                    return res.redirect('/loginCadastrar');
            });
            return;
        }
        //quando o usuario for criado com sucesso
        req.flash('success', 'Seu usuário foi criado com sucesso.');
        req.session.save(function() {
           return res.redirect('/loginCadastrar');
        });
        //return res.send(login.errors);
    } catch(e) {
        console.log(e);
        return res.render('404');
    }
};

exports.login = async function(req, res) {
        try {
            const login = new Login(req.body); // usando a classe de login
            await login.login(); // registra e valida os campos para fazer o login
        
            if(login.errors.length > 0) { // se tiver erro aparece as msg
                req.flash('errors', login.errors);
                req.session.save(function() {
                        return res.redirect('/login/index');
                });
                return;
            }
            //quando o usuario for criado com sucesso [deletar depois, ou criar uma rota]
            req.flash('success', 'Você entrou no sistema.');
            req.session.user = login.user; 
            req.session.save(function() {
               return res.redirect('/');
            });
            //return res.send(login.errors);
        } catch(e) {
            console.log(e);
            return res.render('404');
        }
        };
        
        exports.logout = function(req, res) {
          req.session.destroy();
          res.redirect('/');
        };
        
        