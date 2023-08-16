import jwt from "jsonwebtoken";
import tblUsuario from "../models/tblUsuario";

class TokenController {
    async create(req, res) {
        const {nome_user = "", password = ""} = req.body;

        if(!nome_user || !password) {
            return res.status(401).json({
                errors: ["Credenciais inválidas"],
            });
        }
        const usuario = await tblUsuario.findOne({
            where: {nome_user},
        });

        if(!usuario) {
            return res.status(401).json({
                errors: ["Usuário não existe"],
            });
        }

        if(!(await usuario.isSenhaValida(password))) {
            return res.status(401).json({
                errors: ["Senha inválida"],
            });
        }

        const {id, email} = usuario;
        const token = jwt.sign({
            id,
            nome_user,
        }, process.env.TOKEN_SECRET, {
            expiresIn: process.env.TOKEN_EXPIRATION,
        });

        return res.json({
            token,
            usuario: {
                nome: usuario.nome, id, nome_user, email,
            },
        });
    }
}

export default new TokenController();