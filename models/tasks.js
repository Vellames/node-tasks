module.exports = (sequelize, DataType) => {
    const Tasks = sequelize.define("Tasks", {
        id: {
            type: DataType.INTEGER.UNSIGNED,
            primaryKey: true,
            autoIncrement: true,
            validate : {
                notEmpty: {
                    "msg" : "Id can not be null"
                }
            }
        },
        title: {
            type: DataType.STRING(100),
            allowNull: false,
            validate: {
                notEmpty: {
                    "msg" : "Title can not be null"
                },
                len: {
                    "args" : [1,100],
                    "msg" : "The title must have between 1 and 100 letters"
                }
            }
        },
        done: {
            type: DataType.BOOLEAN,
            allowNull: false,
            defaultValue: false
        }
    }, {
        classMethods: {
            associate: (models) => {
                Tasks.belongsTo(models.Users);
            }
        }
    });

    return Tasks;
};