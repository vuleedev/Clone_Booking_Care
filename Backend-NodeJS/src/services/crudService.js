import bcrypt from "bcryptjs";
import db from "../models/index";
import { where } from "sequelize";
import { raw } from "body-parser";

const salt = bcrypt.genSaltSync(10);

let createNewUser = async (data) => {
  return new Promise(async (resolve, reject) => {
    try {
      let hashPassword = hashUserPassword(data.password);
      await db.User.create({
        email: data.email,
        password: hashPassword,
        firstName: data.firstName,
        lastName: data.lastName,
        address: data.address,
        phoneNumber: data.phoneNumber,
        gender: data.gender === "1" ? true : false,
        roleId: data.role,
      });
      resolve("Created new user successfully");
    } catch (error) {
      reject(error);
    }
  });
};

let hashUserPassword = (password) => {
  try {
    let hashPassword = bcrypt.hashSync(password, salt);
    return hashPassword;
  } catch (error) {
    throw new Error("Error hashing password");
  }
};

let getAllUser = async () => {
  return new Promise(async (resolve, reject) => {
    try {
      let users = db.User.findAll({
        raw: true,
      });
      resolve(users);
    } catch (error) {
      reject(error);
    }
  });
};

let getUserById = async (id) => {
  return new Promise(async (resolve, reject) => {
    try {
      const user = await db.User.findOne({
        where: { id: id },
        raw: true,
      });
      if (user) {
        resolve(user);
      } else {
        resolve({});
      }
    } catch (error) {
      reject(error);
    }
  });
};

let updateUser = async (userData) => {
  return new Promise(async (resolve, reject) => {
    try {
      let userExist = await db.User.findOne({
        where: { id: userData.id },
      });

      if (userExist) {
        await db.User.update(
          {
            email: userData.email,
            firstName: userData.firstName,
            lastName: userData.lastName,
            address: userData.address,
            phoneNumber: userData.phoneNumber,
            gender: userData.gender === "1" ? true : false,
            roleId: userData.roleId,
          },
          {
            where: { id: userData.id },
          }
        );

        resolve("User updated successfully");
      } else {
        reject("User not found");
      }
    } catch (error) {
      reject(error);
    }
  });
};

let deleteUserById = (id) => {
  return new Promise(async (resolve, reject) => {
    try {
      let user = await db.User.findOne({
        where: { id: id },
      });
      if (user) {
        await user.destroy();
      }
      resolve();
    } catch (error) {
      reject(error);
    }
  });
};

module.exports = {
  createNewUser: createNewUser,
  getAllUser: getAllUser,
  getUserById: getUserById,
  updateUser: updateUser,
  deleteUserById: deleteUserById,
};
