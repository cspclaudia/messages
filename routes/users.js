var express = require('express');
var router = express.Router();
var User = require('../models/user');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');

/* const createUserToken = (userId) => {
    return jwt.sign(
        {id: userId},
        'passwordCripto',
        {expiresIn: 60}
    );
}; */

router.post('/', function (req, res, next) {
    var user = new User({
        email: req.body.email,
        password: req.body.password,
        firstName: req.body.firstName,
        lastName: req.body.lastName,
    });
    user.save(function (err, result) {
        if (err) {
            return res.status(500).json({
                myErrorTitle: 'Um erro aconteceu na hora de cadastrar o usuário.',
                myError: err
            });
        }
        res.status(201).json({
            myMsgSucess: "Usuário cadastrado com sucesso",
            objUserSave: result
        });
    });
});

router.post('/signin/', function (req, res, next) {
    var emailF = req.body.email;
    var passwordF = req.body.password;
    User.findOne({ email: emailF }, (err, result) => {
        if (!result)
            return res.status(401).json({ 
                myErroTitle: 'Usuário não encontrado.',
                myError: err 
            });
        bcrypt.compare(passwordF, result.password, (err, same) => {
            if (!same)
                return res.status(400).json({ 
                    myErroTitle: 'Senha inconrreta.',
                    myError: err  
                });
            result.password = undefined;
            return res.status(200).json({
                myMsgSucess: "Login realizado com sucesso",
                objUserSave: result,
                //token: createUserToken(result._id)
                token: jwt.sign({id: result._id}, 'passwordCripto', {expiresIn: 60}),
                time: Date.now("MM/dd/yyyy 'at' h:mma")
            });
        });
    }).select('+password');
});

module.exports = router;
