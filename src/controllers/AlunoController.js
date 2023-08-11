import tblAluno from "../models/tblAluno";
import tblFoto from "../models/tblFoto";

class AlunoController {
    async index(req, res) {
        try {
            const todosAlunos = await tblAluno.findAll({
                attributes: ["id", "nome", "sobrenome", "email", "idade", "peso", "altura"],
                order: [["id", "DESC"], [tblFoto, "id", "DESC"]],
                include: {
                    model: tblFoto,
                    attributes: ["url", "originalname", "filename"],
                },
            });
            return res.json(todosAlunos);
        } catch (e) {
            return res.json(null);
        }
    }

    async create(req, res) {
        try {
            const novoAluno = await tblAluno.create(req.body);
            return res.json(novoAluno);
        } catch (e) {
            return res.status(400).json({
                errors: e.errors.map((err) => err.message),
            });
        }
    }

    async show(req, res) {
        try {
            const {id} = req.params;

            if(!id) {
                return res.status(400).json({
                    errors: ["Faltando ID"],
                });
            }

            const aluno = await tblAluno.findByPk(id, {
                attributes: ["id", "nome", "sobrenome", "email", "idade", "peso", "altura"],
                order: [["id", "DESC"], [tblFoto, "id", "DESC"]],
                include: {
                    model: tblFoto,
                    attributes: ["url", "originalname", "filename"],
                },
            });

            if(!aluno) {
                return res.status(400).json({
                    errors: ["Aluno não encontrado"],
                });
            }

            return res.json(aluno);
        } catch (e) {
            return res.json(null);
        }
    }

    async update(req, res) {
        try {
            const {id} = req.params;

            if(!id) {
                return res.status(400).json({
                    errors: ["Faltando ID"],
                });
            }

            const aluno = await tblAluno.findByPk(id);

            if(!aluno) {
                return res.status(400).json({
                    errors: ["Aluno não encontrado"],
                });
            }

            const alunoAtualizado = await aluno.update(req.body);

            return res.json(alunoAtualizado);
        } catch (e) {
            return res.status(400).json({
                errors: e.errors.map((err) => err.message),
            });
        }
    }

    async delete(req, res) {
        try {
            const {id} = req.params;

            if(!id) {
                return res.status(400).json({
                    errors: ["Faltando ID"],
                });
            }

            const aluno = await tblAluno.findByPk(id);

            if(!aluno) {
                return res.status(400).json({
                    errors: ["Aluno não encontrado"],
                });
            }

            await aluno.destroy();

            return res.json({
                apagado: true,
            });
        } catch (e) {
            return res.status(400).json({
                errors: e.errors.map((err) => err.message),
            });
        }
    }
}

export default new AlunoController();