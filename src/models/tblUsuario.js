import bcryptjs from "bcryptjs";
import Sequelize, { Model } from "sequelize";

export default class tblUsuario extends Model {
    static init(sequelize) {
        super.init({
            nome: {
                type: Sequelize.STRING,
                defaultValue: '',
                validate: {
                    len: {
                        args: [3, 255],
                        msg: 'O Nome deve ter entre 3 e 255 caracteres'
                    }
                }
            },
            email: {
                type: Sequelize.STRING,
                defaultValue: '',
                unique: {
                    msg: "E-Mail já existe",
                },
                validate: {
                    isEmail: {
                        msg: 'E-Mail inválido'
                    }
                }
            },
            nome_user: {
                type: Sequelize.STRING,
                defaultValue: '',
                unique: {
                    msg: "Nome de Usuário já existe",
                },
                validate: {
                    len: {
                        args: [3, 255],
                        msg: 'O Nome de Usuário deve ter entre 3 e 255 caracteres'
                    }
                }
            },
            password_hash: {
                type: Sequelize.STRING,
                defaultValue: '',
            },
            password: {
                type: Sequelize.VIRTUAL,
                defaultValue: '',
                validate: {
                    len: {
                        args: [6, 50],
                        msg: 'A senha precisa ter entre 6 e 50 caracteres'
                    }
                }
            },
        }, {
            sequelize,
        });

        this.addHook('beforeSave', async (usuario) => {
            if(usuario.password) {
                usuario.password_hash = await bcryptjs.hash(usuario.password, 8);
            }
        });

        return this;
    }

    isSenhaValida(senha) {
        return bcryptjs.compare(senha, this.password_hash)
    }
}