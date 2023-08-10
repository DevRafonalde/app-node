import { Router } from "express";
import usuarioController from "../controllers/UsuarioController";
import loginRequired from "../middlewares/loginRequired";

const router = new Router();

router.get("/", loginRequired, usuarioController.index);
router.post("/create", usuarioController.create);
router.get("/show/:id", usuarioController.show);
router.put("/update/:id", usuarioController.update);
router.delete("/delete/:id", usuarioController.delete);

export default router;

/*
index -> lista todos os usuários -> GET
store/create -> cria um novo usuário -> POST
delete -> apaga um usuário -> DELETE
show -> mostra um usuário -> GET
update -> atualiza um usuário -> PATCH ou PUT
*/