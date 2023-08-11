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

            const {originalname, filename} = req.file;
            const {aluno_id} = req.body;

            const arquivo = await tblFoto.create({originalname, filename, aluno_id});

            return res.json(req.file);
        });
    }
}

export default new FotoController();