import jwt from "jsonwebtoken";
import tblUsuario from "../models/tblUsuario";

export default async (req, res, next) => {
    const {authorization} = req.headers;

    if(!authorization) {
        return res.status(401).json({
            errors: ["É necessário fazer o login"],
        });
    }

    const [texto, token] = authorization.split(" ");

    try {
        const dados = jwt.verify(token, process.env.TOKEN_SECRET);
        const {id, nome_user} = dados;

        const user = await tblUsuario.findOne({
            where: {
                id,
                nome_user,
            },
        });

        if(!user) {
            return res.status(401).json({
                errors: ["Usuário inválido"],
            });
        }

        req.userId = id;
        req.userNomeUser = nome_user;
        return next();
    } catch (error) {
        return res.status(401).json({
            errors: ["Token expirado ou inválido"],
        });
    }
};