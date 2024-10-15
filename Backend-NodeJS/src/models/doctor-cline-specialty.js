"use strict";
const { Model } = require("sequelize");

module.exports = (sequelize, DataTypes) => {
  class Doctor_Clinic_Specialty extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }

  // Sửa lỗi cú pháp tên model và đồng bộ tên trường
  Doctor_Clinic_Specialty.init(
    {
      doctorId: DataTypes.INTEGER,
      clinicId: DataTypes.INTEGER, // Sửa từ ClineId thành clinicId
      specialtyId: DataTypes.STRING,
    },
    {
      sequelize,
      modelName: "Doctor_Clinic_Specialty",
    }
  );

  return Doctor_Clinic_Specialty;
};
