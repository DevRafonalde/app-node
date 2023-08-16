import tblUsuario from "../models/tblUsuario";

class UsuarioController {
    async index(req, res) {
        try {
            console.log("Id do Usuário", req.userId);
            console.log("Nome de Usuário", req.userNomeUser);
            const todosUsuarios = await tblUsuario.findAll({attributes: ["id", "nome", "nome_user"]});
            return res.json(todosUsuarios);
        } catch (e) {
            return res.json(null);
        }
    }

    async create(req, res) {
        try {
            const novoUsuario = await tblUsuario.create(req.body);
            const {
                id, nome, nome_user, email,
            } = novoUsuario;
            return res.json({
                id, nome, nome_user, email,
            });
        } catch (e) {
            return res.status(400).json({
                errors: e.errors.map((err) => err.message),
            });
        }
    }

    async show(req, res) {
        try {
            // const {id} = req.params;
            // const usuario = await tblUsuario.findByPk(id); OU
            const usuario = await tblUsuario.findByPk(req.params.id);
            const {id, nome, nome_user} = usuario;

            return res.json({id, nome, nome_user});
        } catch (e) {
            return res.json(null);
        }
    }

    async update(req, res) {
        try {
            const usuario = await tblUsuario.findByPk(req.userId);

            if(!usuario) {
                return res.status(400).json({
                    errors: ["Usuário não existe."],
                });
            }

            const usuarioAtualizado = await usuario.update(req.body);
            const {id, nome, nome_user} = usuarioAtualizado;

            return res.json({id, nome, nome_user});
        } catch (e) {
            return res.status(400).json({
                errors: e.errors.map((err) => err.message),
            });
        }
    }

    async delete(req, res) {
        try {
            const usuario = await tblUsuario.findByPk(req.userId);

            if(!usuario) {
                return res.status(400).json({
                    errors: ["Usuário não existe."],
                });
            }

            await usuario.destroy();

            return res.json(usuario);
        } catch (e) {
            return res.status(400).json({
                errors: e.errors.map((err) => err.message),
            });
        }
    }
}

export default new UsuarioController();