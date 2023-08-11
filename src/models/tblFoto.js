import Sequelize, {Model} from "sequelize";
import appConfig from "../config/appConfig";

export default class tblFoto extends Model {
    static init(sequelize) {
        super.init({
            originalname: {
                type: Sequelize.STRING,
                allowNull: false,
                validate: {
                    notEmpty: {
                        msg: "Campo não pode ficar vazio",
                    },
                },
            },
            filename: {
                type: Sequelize.STRING,
                allowNull: false,
                validate: {
                    notEmpty: {
                        msg: "Campo não pode ficar vazio",
                    },
                },
            },
            url: {
                type: Sequelize.VIRTUAL,
                get() {
                    return `${appConfig.url}/images/${this.getDataValue("filename")}`;
                },
            },
        }, {
            sequelize,
            tableName: "tbl_Fotos",
        });
        return this;
    }
}