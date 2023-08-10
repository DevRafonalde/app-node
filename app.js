import dotenv from 'dotenv';
import express from "express";
import "./src/database";
import alunoRoutes from './src/routes/alunoRoutes';
import homeRoutes from './src/routes/homeRoutes';
import tokenRoutes from './src/routes/tokenRoutes';
import usuarioRoutes from './src/routes/usuarioRoutes';
dotenv.config();

class App {
    constructor() {
        this.app = express();
        this.middlewares();
        this.routes();
    }

    middlewares() {
        this.app.use(express.urlencoded({extended: true}));
        this.app.use(express.json())
    }

    routes() {
        this.app.use("/", homeRoutes);
        this.app.use("/usuarios", usuarioRoutes);
        this.app.use("/tokens", tokenRoutes);
        this.app.use("/alunos", alunoRoutes);
    }
}

export default new App() .app;