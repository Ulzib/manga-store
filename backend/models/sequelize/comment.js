import { DataTypes } from "sequelize";

export default function (sequelize) {
  return sequelize.define(
    "comment",
    {
      id: {
        autoIncrement: true,
        type: DataTypes.INTEGER.UNSIGNED,
        allowNull: false,
        primaryKey: true,
      },
      user_id: {
        type: DataTypes.INTEGER.UNSIGNED,
        allowNull: false,
        defaultValue: 0,
        references: {
          model: "user",
          key: "id",
        },
      },
      book_id: {
        type: DataTypes.INTEGER.UNSIGNED,
        allowNull: false,
        defaultValue: 0,
        references: {
          model: "book",
          key: "id",
        },
      },
      comment: {
        type: DataTypes.STRING(450),
        allowNull: false,
        validate: {
          isEmail: {
            msg: "Заавал имэйл оруулна уу",
          },
          notContains: {
            args: ["zail"],
            msg: "энд хориотой үг байна",
          },
          // min: {
          //   args: [20],
          //   msg: "Хамгийн багадаа 20 байх ёстой.",
          // },
        },
        defaultValue: "",
        //default utga butsaadgiig uur blgj bolovsruulh
        get() {
          let comment = this.getDataValue("comment").toLowerCase();
          return comment.charAt(0).toUpperCase() + comment.slice(1);
        },
        //set utga uurchildg
        set(value) {
          this.setDataValue("comment", value.replace("sda", "***"));
        },
      },
    },
    {
      tableName: "comment",
      timestamps: true,
    }
  );
}
