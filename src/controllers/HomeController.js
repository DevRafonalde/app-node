import tblAluno from "../models/tblAluno";

class HomeController {
    async index(req, res) {
        const novoAluno = await tblAluno.create({
            nome: "Rafael",
            sobrenome: "Albuquerque",
            email: "rafael.p.albuquerque@gmail.com",
            idade: 20,
            peso: 70.4,
            altura: 1.72,
        });
        res.json(novoAluno);
    }
}

export default new HomeController();