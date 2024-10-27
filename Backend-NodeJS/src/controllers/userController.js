import userService from "../services/userService";

let handleLogin = async (req, res) => {
  let email = req.body.email;
  let password = req.body.password;

  if (!email || !password) {
    return res.status(500).json({
      errorCode: 1,
      message: "Missing inputs parameter!",
    });
  }

  let userData = await userService.handleUserLogin(email, password);

  return res.status(200).json({
    errorCode: userData.errorCode,
    message: userData.errMessage,
    user: userData.user ? userData.user : {},
  });
};

let handleGetAllUsers = async (req, res) => {
  let id = req.query.id;

  if (!id) {
    return res.status(500).json({
      errorCode: 1,
      errorMessage: "Missing inputs parameter!",
      users: [],
    });
  }

  let users = await userService.getAllUser(id);
  // console.log(users);
  return res.status(200).json({
    errorCode: 0,
    errorMessage: "OK",
    users,
  });
};

let handleCreateNewUser = async (req, res) => {
  let result = await userService.createNewUser(req.body);
  return res.status(200).json(result);
};

let handleEditNewUser = async (req, res) => {
  let data = req.body;
  let message = await userService.updateUser(data);
  return res.status(200).json(message);
};

let handleDeleteUser = async (req, res) => {
  if (!req.body.id) {
    return res.status(500).json({
      errorCode: 1,
      errorMessage: "Missing inputs parameter!",
      users: [],
    });
  }
  let result = await userService.deleteUser(req.body.id);
  return res.status(200).json(result);
};

let getAllCode = async (req, res) => {
  try {
    let data = await userService.getAllCodeService(req.query.type);
    return res.status(200).json(data);
  } catch (error) {
    console.log("Get all code error: ", error.message);
    return res.status(200).json({
      errorCode: -1,
      errMessage: "error from service",
    });
  }
};

module.exports = {
  handleLogin: handleLogin,
  handleGetAllUsers: handleGetAllUsers,
  handleCreateNewUser: handleCreateNewUser,
  handleEditNewUser: handleEditNewUser,
  handleDeleteUser: handleDeleteUser,
  getAllCode: getAllCode,
};
