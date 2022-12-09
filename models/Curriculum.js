const { Model, DataTypes } = require("sequelize");
const sequelize = require("../config/connection");

class Curriculum extends Model { }

Curriculum.init(
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

module.exports = Curriculum;