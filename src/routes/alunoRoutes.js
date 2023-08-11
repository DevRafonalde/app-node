import {Router} from "express";
import alunoController from "../controllers/AlunoController";
import loginRequired from "../middlewares/loginRequired";

const router = new Router();

router.get("/", loginRequired, alunoController.index);
router.get("/show/:id", loginRequired, alunoController.show);
router.post("/create", loginRequired, alunoController.create);
router.put("/update/:id", loginRequired, alunoController.update);
router.delete("/delete/:id", loginRequired, alunoController.delete);

export default router;

/*
index -> lista todos os alunos -> GET
store/create -> cria um novo aluno -> POST
delete -> apaga um aluno -> DELETE
show -> mostra um aluno -> GET
update -> atualiza um aluno -> PATCH ou PUT
*/