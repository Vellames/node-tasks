import bcrypt from "bcrypt-nodejs";

module.exports = (sequelize, DataType) => {
    const Users = sequelize.define("Users", {
        id: {
            type: DataType.INTEGER,
            primaryKey: true,
            autoIncrement: true
        },
        name: {
            type: DataType.STRING,
            allowNull: false,
            validate: {
                notEmpty: true
            }
        },
        password: {
            type: DataType.STRING,
            allowNull: false,
            validate: {
                notEmpty: true
            }
        },
        email: {
            type: DataType.STRING,
            unique: true,
            allowNull: false,
            validate: {
                notEmpty: true
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