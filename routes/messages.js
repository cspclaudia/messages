var express = require('express');
var router = express.Router();
var Message = require('../models/message');
var User = require('../models/user');
const jwt = require('jsonwebtoken');

router.patch('/:id', function (req, res, next) {
    var token = req.params.id
    var decoded = jwt.decode(token);
    var message = new Message({
        content: req.body.content,
        user: decoded.id
    });
    User.findById(decoded.id, function(err, resultUserRecuperado){
        if(err){
            return res.status(500).json({
                myErrorTitle: 'Um erro aconteceu na hora de buscar o usuário pelo ID.',
                myError: err
            });
        }
        message.save(resultUserRecuperado, function(err, result){
            if(err){
                return res.status(500).json({
                    myErrorTitle: 'Um erro aconteceu na hora de salvar a mensagem.',
                    myError: err
                });
            }
            resultUserRecuperado.messages.push(result._id);
            resultUserRecuperado.save();
            res.status(201).json({
                myMsgSucess: "Mensagem salva com sucesso",
                objMessageSave: result,
                userRecuperado: resultUserRecuperado
            });
        });
    });
});

router.get('/', function (req, res, next){
    Message.find().populate('user').exec(function(err, result) {
        if(err){
            return res.status(500).json({
                myErrorTitle: 'Um erro aconteceu na hora de buscar a mensagem.',
                myError: err
            });
        }
        res.status(200).json({
            myMsgSucess: "Mensagem recuperada com sucesso",
            objSMessageSRecuperadaS: result
        });
    });
});

router.patch('/edit/:id', function(req, res, next){
    Message.findById(req.params.id, function(err, resultMsgRecuperada){
        if(err){
            return res.status(500).json({
                myErrorTitle: 'Um erro aconteceu na hora de buscar a msg pelo ID',
                myError: err
            });
        }
        if(!resultMsgRecuperada){
            return res.status(500).json({
                myErrorTitle: 'Não encontrou a mensagem',
                myError: {info: "Não encontrou a mensagem com i ID: " + req.params.id}
            });
        }
        resultMsgRecuperada.content = req.body.content;
        resultMsgRecuperada.save(function(err, resultMsgAlterada){
            if(err){
                return res.status(500).json({
                    myErrorTitle: 'Um erro aconteceu na hora de atualizar a msg',
                    myError: err
                });
            }
            res.status(200).json({
                myMsgSucess: "Mensagem atualizada com sucesso",
                objMessageAtualizado: resultMsgAlterada
            });
        });
    });
});

router.delete('/:id', function(req, res, next){
    Message.findById(req.params.id, function(err, resultMsgRecuperada){
        if(err){
            return res.status(500).json({
                myErrorTitle: 'Um erro aconteceu na hora de buscar a msg pelo ID p/ deletar',
                myError: err
            });
        }
        if(!resultMsgRecuperada){
            return res.status(500).json({
                myErrorTitle: 'Não encontrou a mensagem para deletar',
                myError: {info: "Não encontrou a mensagem para deletar com o ID: " + req.params.id}
            });
        }
        
        User.findById(resultMsgRecuperada.user, function(err, resultUserRecuperado){
            if(err){
                return res.status(500).json({
                    myErrorTitle: 'Um erro aconteceu na hora de buscar o usuário pelo ID.',
                    myError: err
                });
            }
            resultUserRecuperado.messages.remove(resultMsgRecuperada._id);
            resultUserRecuperado.save();

        });

        resultMsgRecuperada.remove(function(err, resultMsgDeletada){
            if(err){
                return res.status(500).json({
                    myErrorTitle: 'Um erro aconteceu na hora de deletar a mgs',
                    myError: err
                });
            }
            res.status(200).json({
                myMsgSucess: 'Mensagem deletada com sucesso',
                objMessageApagada: resultMsgDeletada
            });
        });
    });
});

module.exports = router;
