import Sequelize, {Model} from "sequelize";

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
        }, {
            sequelize,
            tableName: "tbl_Fotos",
        });
        return this;
    }
}