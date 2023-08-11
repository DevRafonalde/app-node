import multer from "multer";
import multerConfig from "../config/multerConfig";
import tblFoto from "../models/tblFoto";

const upload = multer(multerConfig).single("arquivo");

class FotoController {
    async store(req, res) {
        return upload(req, res, async (error) => {
            if(error) {
                return res.status(400).json({
                    errors: [error.code],
                });
            }

            try {
                const {originalname, filename} = req.file;
                const {aluno_id} = req.body;

                const arquivo = await tblFoto.create({originalname, filename, aluno_id});
                return res.json(arquivo);
            } catch (e) {
                return res.status(400).json({
                    errors: ["Aluno não existe"], // pode ser outro, mas aqui eu assumo q é esse e fodase
                });
            }
        });
    }
}

export default new FotoController();