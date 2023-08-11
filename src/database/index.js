import Sequelize from "sequelize";
import databaseConfig from "../config/database";
import tblAluno from "../models/tblAluno";
import tblUsuario from "../models/tblUsuario";
import tblFoto from "../models/tblFoto";

const models = [tblAluno, tblUsuario, tblFoto];

const connection = new Sequelize(databaseConfig);

models.forEach((model) => model.init(connection));
models.forEach((model) => model.associate && model.associate(connection.models));