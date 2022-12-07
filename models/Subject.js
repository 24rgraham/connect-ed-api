const { Model, DataTypes } = require("sequelize");
const sequelize = require("../config/connection");

class Subject extends Model { }

Subject.init(
    {
        name: {
            type: DataTypes.STRING,
            allowNull:false,
        }
    },
    {
        sequelize,
    }
);

module.exports = Subject;