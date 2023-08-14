import {resolve} from "path";
import dotenv from "dotenv";
import express from "express";
import cors from "cors";
import helmet from "helmet";
import "./database";
import alunoRoutes from "./routes/alunoRoutes";
import homeRoutes from "./routes/homeRoutes";
import tokenRoutes from "./routes/tokenRoutes";
import usuarioRoutes from "./routes/usuarioRoutes";
import fotoRoutes from "./routes/fotoRoutes";

dotenv.config();

const whiteList = [
    "http://localhost:3000",
];

const corsOptions = {
    origin(origin, callback) {
        if(whiteList.indexOf(origin) !== -1 || !origin) {
            callback(null, true);
        } else {
            callback(new Error("Não autorizado pelo CORS"));
        }
    },
};

class App {
    constructor() {
        this.app = express();
        this.middlewares();
        this.routes();
    }

    middlewares() {
        this.app.use(cors(corsOptions));
        this.app.use(helmet());
        this.app.use(express.urlencoded({extended: true}));
        this.app.use(express.json());
        this.app.use(express.static(resolve(__dirname, "uploads")));
    }

    routes() {
        this.app.use("/", homeRoutes);
        this.app.use("/usuarios", usuarioRoutes);
        this.app.use("/tokens", tokenRoutes);
        this.app.use("/alunos", alunoRoutes);
        this.app.use("/fotos", fotoRoutes);
    }
}

export default new App().app;