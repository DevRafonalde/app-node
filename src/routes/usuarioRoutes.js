import { Router } from "express";
import usuarioController from "../controllers/UsuarioController";
import loginRequired from "../middlewares/loginRequired";

const router = new Router();

// Não deveriam existir no contexto real de uma aplicação
// router.get("/", usuarioController.index); // Listar Usuários
// router.get("/show/:id", usuarioController.show); // Listar Usuário

router.post("/create", usuarioController.create);
router.put("/update/", loginRequired, usuarioController.update);
router.delete("/delete/", loginRequired, usuarioController.delete);

export default router;

/*
index -> lista todos os usuários -> GET
store/create -> cria um novo usuário -> POST
delete -> apaga um usuário -> DELETE
show -> mostra um usuário -> GET
update -> atualiza um usuário -> PATCH ou PUT
*/