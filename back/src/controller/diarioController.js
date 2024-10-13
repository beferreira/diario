import { autenticar, gerarjwt } from '../utils/jwt.js';

import * as db from '../repository/diarioRepository.js';


import { Router } from "express";
const endpoints = Router();

endpoints.post('/registro', async (req, resp) => {
    try {
        let info = req.body;
        let id = await db.cadastrarLogin(info);

        resp.send({
            novoId: id
        })
    }
    catch (err) {
        resp.status(400).send({
            erro: err.message
        })
    }
})

endpoints.post('/logar', async (req, resp) => {
    try {
        let info = req.body;
        let resposta = await db.logar(info);

        if (resposta == null) {
            resp.send({ erro: "Usuário não encontrado" })
        } else {
            let token = gerarjwt(resposta);
            resp.send({
                "token": token
            })
        }
    }
    catch (err) {
        resp.status(400).send({
            erro: err.message
        })
    }
})

endpoints.post('/inserir-informacoes', autenticar, async (req, resp) => {
    try {
        let informacoes = req.body;
        let idUsuario = req.user.id_usuario;
        
        let id = await db.inserirNoDiario(informacoes, idUsuario);

        resp.send({
            novoId: id
        })
    }
    catch (err) {
        resp.status(400).send({
            erro: err.message
        })
    }
})

endpoints.get('/consulta', autenticar, async (req, resp) => {
    try {
        let idUsuario = req.user.id_usuario;
        
        let registros = await db.consultarDiario(idUsuario);
        resp.send(registros);
    }
    catch (err) {
        resp.status(400).send({
            erro: err.message
        })
    }
})

endpoints.put('/editar-informacoes', autenticar, async (req, resp) => {
    try {
        let informacoes = req.body;
        
        let id = await db.editarDiario(informacoes);

        if(id >= 1){
            resp.send({mensagem: "editada"})
        }else{
            resp.send({mensagem: "erro"})        }
    }
    catch (err) {
        resp.status(400).send({
            erro: err.message
        })
    }
})

endpoints.delete('/excluir/:id', autenticar, async (req, resp) => {
    try {
        let id = req.params.id;

        let linhasAfetadas = await db.excluirDiario(id);

        if(linhasAfetadas >= 1){
            resp.send({mensagem: "removida"})
        }else{
            resp.send({mensagem: "erro"})        }

       
    }
    catch (err) {
        resp.status(400).send({
            erro: err.message
        })
    }
})

export default endpoints;