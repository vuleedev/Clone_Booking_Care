"use strict";

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.bulkInsert(
      "Users",
      [
        {
          email: "admin@gmail.com",
          password: "hashed_password_here",
          firstName: "John",
          lastName: "Doe",
          address: "123 Main St",
          gender: 1,
          typeRole: "ROLE",
          roleId: "R1",
          createdAt: new Date(),
          updatedAt: new Date(),
        },
      ],
      {}
    );
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.bulkDelete("Users", null, {});
  },
};
