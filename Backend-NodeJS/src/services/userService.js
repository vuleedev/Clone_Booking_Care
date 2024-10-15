import { raw } from "body-parser";
import db from "../models/index";
import bcrypt, { hash } from "bcryptjs";

let handleUserLogin = (email, password) => {
  return new Promise(async (resolve, reject) => {
    try {
      let UserData = {};
      let isExist = await checkUserEmail(email);
      if (isExist) {
        let user = await db.User.findOne({
          where: { email: email },
          attributes: ["email", "roleId", "password"],
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

module.exports = {
  handleUserLogin: handleUserLogin,
};
