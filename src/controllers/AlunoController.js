import tblAluno from "../models/tblAluno";

class AlunoController {
    async index(req, res) {
        try {
            const todosAlunos = await tblAluno.findAll();
            return res.json(todosAlunos);
        } catch (e) {
            return res.json(null);
        }
    }

    async create(req, res) {
        try {
            const novoAluno = await tblAluno.create(req.body);
            const {id, nome, nome_user, email} = novoAluno;
            return res.json({id, nome, nome_user, email});
        } catch (e) {
            return res.status(400).json({
                errors: e.errors.map((err) => err.message)
            });
        }
    }

    async show(req, res) {
        try {
            // const {id} = req.params;
            // const aluno = await tblAluno.findByPk(id); OU
            const aluno = await tblAluno.findByPk(req.params.id);
            const {id, nome, nome_user} = aluno;

            return res.json({id, nome, nome_user});
        } catch (e) {
            return res.json(null);
        }
    }

    async update(req, res) {
        try {
            const aluno = await tblAluno.findByPk(req.userId);

            if(!aluno) {
                return res.status(400).json({
                    errors: ["Usuário não existe."]
                });
            }

            const alunoAtualizado = await aluno.update(req.body);
            const {id, nome, nome_user} = alunoAtualizado;

            return res.json({id, nome, nome_user});
        } catch (e) {
            return res.status(400).json({
                errors: e.errors.map((err) => err.message)
            });
        }
    }

    async delete(req, res) {
        try {
            const aluno = await tblAluno.findByPk(req.userId);

            if(!aluno) {
                return res.status(400).json({
                    errors: ["Usuário não existe."]
                });
            }

            await aluno.destroy();

            return res.json(aluno);
        } catch (e) {
            return res.status(400).json({
                errors: e.errors.map((err) => err.message)
            });
        }
    }
}

export default new AlunoController();