import {extname, resolve} from "path";
import multer from "multer";

const aleatorio = () => Math.floor(Math.random() * 10000 + 10000);

export default {
    fileFilter: (req, file, cb) => {
        if(file.mimetype !== "image/png" && file.mimetype !== "image/jpeg" && file.mimetype !== "image/jpg" && file.mimetype !== "application/pdf") {
            return cb(new multer.MulterError("São aceitos apenas arquivo .PNG, .JPEG ou .PDF"));
        }
        return cb(null, true);
    },
    storage: multer.diskStorage({
        destination: (req, file, cb) => {
            cb(null, resolve(__dirname, "..", "..", "uploads"));
        },
        filename: (req, file, cb) => {
            cb(null, `${Date.now()}_${aleatorio()}${extname(file.originalname)}`);
        },
    }),
};