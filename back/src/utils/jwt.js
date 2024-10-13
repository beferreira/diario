import jwt from 'jsonwebtoken'
let key = 'diarioSegurança'



export function gerarjwt(informacoes) {
    return jwt.sign(informacoes, key)
};



export function autenticacao(req, resp, next) {
    try {
        let token = req.headers['x-access-token'];
        
        if (token === undefined)
            token = req.query['x-access-token']

        let signd = jwt.verify(token, key);
        
        req.user = signd;
        
        next();
        
    } catch (e) {
        resp.status(401).end();
    }
};


export function autenticar(req, resp, next) {
    return autenticacao(req, resp, next);
};