import Sequelize from "sequelize";
import databaseConfig from "../config/database";
import tblAluno from "../models/tblAluno";
import tblUsuario from "../models/tblUsuario";

const models = [tblAluno, tblUsuario];

const connection = new Sequelize(databaseConfig);

models.forEach((model) => model.init(connection));