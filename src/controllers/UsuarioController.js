import tblUsuario from "../models/tblUsuario";

class UsuarioController {
    async index(req, res) {
        try {
            console.log("Id do Usuário", req.userId);
            console.log("Nome de Usuário", req.userNomeUser);
            const todosUsuarios = await tblUsuario.findAll();
            return res.json(todosUsuarios);
        } catch (e) {
            return res.json(null);
        }
    }

    async create(req, res) {
        try {
            const novoUsuario = await tblUsuario.create(req.body);
            return res.json(novoUsuario);
        } catch (e) {
            return res.status(400).json({
                errors: e.errors.map((err) => err.message)
            });
        }
    }

    async show(req, res) {
        try {
            // const {id} = req.params;
            // const usuario = await tblUsuario.findByPk(id); OU
            const usuario = await tblUsuario.findByPk(req.params.id);
            return res.json(usuario);
        } catch (e) {
            return res.json(null);
        }
    }

    async update(req, res) {
        try {

            if(!req.params.id) {
                return res.status(400).json({
                    errors: ["Id não enviado."]
                });
            }

            const usuario = await tblUsuario.findByPk(req.params.id);

            if(!usuario) {
                return res.status(400).json({
                    errors: ["Usuário não existe."]
                });
            }

            const usuarioAtualizado = await usuario.update(req.body);

            return res.json(usuarioAtualizado);
        } catch (e) {
            return res.status(400).json({
                errors: e.errors.map((err) => err.message)
            });
        }
    }

    async delete(req, res) {
        try {

            if(!req.params.id) {
                return res.status(400).json({
                    errors: ["Id não enviado."]
                });
            }

            const usuario = await tblUsuario.findByPk(req.params.id);

            if(!usuario) {
                return res.status(400).json({
                    errors: ["Usuário não existe."]
                });
            }

            await usuario.destroy();

            return res.json(usuario);
        } catch (e) {
            return res.status(400).json({
                errors: e.errors.map((err) => err.message)
            });
        }
    }
}

export default new UsuarioController();