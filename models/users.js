import bcrypt from "bcrypt-nodejs";

module.exports = (sequelize, DataType) => {
    const Users = sequelize.define("Users", {
        id: {
            type: DataType.INTEGER.UNSIGNED,
            primaryKey: true,
            autoIncrement: true,
            validate : {
                notEmpty: {
                    "msg": "Id can not be null"
                }
            }
        },
        name: {
            type: DataType.STRING(100),
            allowNull: false,
            validate: {
                notEmpty: {
                    "msg": "Name can not be null"
                },
                len: {
                    "args" : [1 , 100],
                    "msg" : "The name must have between 1 and 100 letters"
                }
            }
        },
        password: {
            type: DataType.STRING,
            allowNull: false,
            validate: {
                notEmpty: {
                    "msg": "Password can not be null"
                },
                len: {
                    "args" : [6, 40],
                    "msg": "The password must have between 6 and 40 letters"
                },
            }
        },
        email: {
            type: DataType.STRING(100),
            unique: true,
            allowNull: false,
            validate: {
                notEmpty: {
                    "msg": "Email can not be null"
                },
                isEmail: {
                    "msg": "Invalid email"
                },
                len : {
                    "msg": "The email must have between 1 and 100 letters"
                }
            }
        }
    }, {
        hooks : {
            beforeCreate: user => {
                user.password = bcrypt.hashSync(user.password);
            }
        },
        classMethods: {
            associate: (models) => {
                Users.hasMany(models.Tasks);
            },
            verifyPassword: (encodedPassword, password) => {
                return bcrypt.compareSync(password, encodedPassword)
            }
        }
    });

    return Users;
};