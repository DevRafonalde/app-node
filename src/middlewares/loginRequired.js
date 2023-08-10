import jwt from 'jsonwebtoken';
export default(req, res, next) => {
    const {authorization} = req.headers;

    if(!authorization) {
        return res.status(401).json({
            errors: ["É necessário fazer o login"],
        });
    }

    const [texto, token] = authorization.split(' ');

    try {
        const dados = jwt.verify(token, process.env.TOKEN_SECRET);
        const {id, nome_user} = dados;
        req.userId = id;
        req.userNomeUser = nome_user;
        return next();
    } catch (error) {
        return res.status(401).json({
            errors: ["Token expirado ou inválido"],
        });
    }
};