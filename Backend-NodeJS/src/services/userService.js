import db from "../models/index";
import bcrypt, { hash } from "bcryptjs";

const salt = bcrypt.genSaltSync(10);

let handleUserLogin = (email, password) => {
  return new Promise(async (resolve, reject) => {
    try {
      let UserData = {};
      let isExist = await checkUserEmail(email);
      if (isExist) {
        let user = await db.User.findOne({
          where: { email: email },
          attributes: ["email", "roleId", "password", "firstName", "lastName"],
          raw: true,
        });
        if (user) {
          let check = await bcrypt.compareSync(password, user.password);
          if (check) {
            UserData.errorCode = 0;
            UserData.errMessage = "Ok";
            delete user.password;
            UserData.user = user;
          } else {
            UserData.errorCode = 3;
            UserData.errMessage = "Wrong password";
          }
        } else {
          UserData.errorCode = 2;
          UserData.errMessage = `User's not found`;
        }
      } else {
        UserData.errorCode = 1;
        UserData.errMessage = `Your's email isn't exist in your system. Plz try other email!`;
        resolve(UserData);
      }
      resolve(UserData);
    } catch (error) {
      reject(error);
    }
  });
};

let checkUserEmail = (email) => {
  return new Promise(async (resolve, reject) => {
    try {
      let user = await db.User.findOne({
        where: { email: email },
      });
      if (!user) {
        resolve(false);
      } else {
        resolve(true);
      }
    } catch (error) {
      reject(error);
    }
  });
};

let getAllUser = (userId) => {
  return new Promise(async (resolve, reject) => {
    try {
      let users = "";
      if (userId === "ALL") {
        users = await db.User.findAll({
          attributes: {
            exclude: ["password"],
          },
        });
      }
      if (userId && userId !== "ALL") {
        users = await db.User.findOne({
          where: { id: userId },
          attributes: {
            exclude: ["password"],
          },
        });
      }
      resolve(users);
    } catch (error) {
      reject(error);
    }
  });
};

let createNewUser = async (data) => {
  return new Promise(async (resolve, reject) => {
    try {
      let checkEmail = await checkUserEmail(data.email);
      if (checkEmail) {
        resolve({
          errorCode: 1,
          errorMessage: "Your email is already in used. Plz try another email!",
        });
      } else {
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
        resolve({
          errorCode: 0,
          errorMessage: "OK",
        });
      }
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

let deleteUser = (id) => {
  return new Promise(async (resolve, reject) => {
    let user = await db.User.findOne({
      where: { id: id },
    });
    if (!user) {
      resolve({
        errorCode: 2,
        errorMessage: `The user isn't exist`,
      });
    }
    await db.User.destroy({
      where: { id: id },
    });

    resolve({
      errorCode: 0,
      message: "The user is delete",
    });
  });
};

let updateUser = (data) => {
  return new Promise(async (resolve, reject) => {
    try {
      if (!data.id) {
        return resolve({
          errorCode: 2,
          errMessage: "Missing required parameters",
        });
      }

      console.log("Updating user with ID:", data.id);

      let user = await db.User.findOne({
        where: { id: data.id },
        raw: false,
      });

      if (user) {
        user.firstName = data.firstName;
        user.lastName = data.lastName;
        user.address = data.address;
        user.phoneNumber = data.phoneNumber;

        await user.save();

        resolve({
          errorCode: 0,
          message: "Update user succeeds",
        });
      } else {
        resolve({
          errorCode: 1,
          message: "User not found!",
        });
      }
    } catch (error) {
      console.error("Error in updateUser:", error);
      reject(error);
    }
  });
};

let getAllCodeService = (typeInput) => {
  return new Promise(async (resolve, reject) => {
    try {
      if (!typeInput) {
        resolve({
          errorCode: 1,
          errMessage: "Missing required parameter",
        });
      } else {
        let res = {};
        let allCode = await db.Allcode.findAll({ where: { type: typeInput } });
        res.errorCode = 0;
        res.data = allCode;
        resolve(res);
      }
    } catch (error) {
      reject(error);
    }
  });
};

module.exports = {
  handleUserLogin: handleUserLogin,
  getAllUser: getAllUser,
  createNewUser: createNewUser,
  deleteUser: deleteUser,
  updateUser: updateUser,
  getAllCodeService: getAllCodeService,
};
