const { Model, DataTypes } = require("sequelize");
const sequelize = require("../config/connection");

class SubjectTag extends Model { }

SubjectTag.init(
    {
    },
    {
        sequelize,
    }
);

module.exports = SubjectTag;