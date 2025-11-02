import { DataTypes } from "sequelize";

export default function (sequelize) {
  return sequelize.define(
    "user",
    {
      id: {
        autoIncrement: true,
        type: DataTypes.INTEGER.UNSIGNED,
        allowNull: false,
        primaryKey: true,
      },
      name: {
        type: DataTypes.STRING(45),
        allowNull: false,
        defaultValue: "",
      },
      email: {
        type: DataTypes.STRING(45),
        allowNull: false,
        defaultValue: "",
      },
      role: {
        type: DataTypes.STRING(10),
        allowNull: false,
        defaultValue: "",
      },
      password: {
        type: DataTypes.CHAR(45),
        allowNull: false,
        defaultValue: "",
      },
      //virtual talbar(database dr hargdhgui)
      about: {
        type: DataTypes.VIRTUAL,
        get() {
          return `${this.name} - ${this.email} (${this.role})`;
        },
      },
    },
    {
      tableName: "user",
      timestamps: false,
    }
  );
}
