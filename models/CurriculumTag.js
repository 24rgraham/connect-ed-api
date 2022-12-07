const { Model, DataTypes } = require("sequelize");
const sequelize = require("../config/connection");

class CurriculumTag extends Model { }

CurriculumTag.init(
    {
    },
    {
        sequelize,
    }
);

module.exports = CurriculumTag;