const { Model, DataTypes } = require("sequelize");
const sequelize = require("../config/connection");

class Status extends Model { }

Status.init(
    {
        in_progress: {
            type: DataTypes.BOOLEAN,
        },
        saved_for_later: {
            type: DataTypes.BOOLEAN,
        },
        starred: {
            type: DataTypes.BOOLEAN,
        },
        completed: {
            type: DataTypes.BOOLEAN,
        },
    },
    {
        sequelize,
    }
);

module.exports = Status;