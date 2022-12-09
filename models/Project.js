const { Model, DataTypes } = require("sequelize");
const bcrypt = require("bcrypt");
const sequelize = require("../config/connection");

class Project extends Model {
  checkPassword(loginPw) {
    return bcrypt.compareSync(loginPw, this.password);
  }
}

Project.init(
  {
    title: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    image: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    grade_lvl: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    est_time: {
        // when creating a project, user will select from a dropdown 
        // menu that will then enter a corresponding integer into this field.
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    overview_desc: {
      type: DataTypes.TEXT,
      allowNull: false,
    },
    directions: {
      type: DataTypes.TEXT,
      allowNull: false,
    },
    materials: {
      type: DataTypes.TEXT,
      allowNull:false,
    },
    resources: {
      type: DataTypes.TEXT,
    },
  },
  {
    sequelize,
  }
);

module.exports = Project;
