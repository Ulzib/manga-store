import { DataTypes } from "sequelize";

export default function (sequelize) {
  return sequelize.define(
    "book",
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
      price: {
        type: DataTypes.INTEGER.UNSIGNED,
        allowNull: false,
        defaultValue: 0,
      },
      create_date: {
        type: DataTypes.DATE,
        allowNull: true,
      },
    },
    {
      tableName: "book",
      timestamps: false,
    }
  );
}
