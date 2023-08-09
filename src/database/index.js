import Sequelize from "sequelize";
import databaseConfig from "../config/database";
import tblAluno from "../models/tbl_Aluno";

const models = [tblAluno];

const connection = new Sequelize(databaseConfig);

models.forEach((model) => model.init(connection));