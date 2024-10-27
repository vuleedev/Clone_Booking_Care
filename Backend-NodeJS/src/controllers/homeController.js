import db from "../models/index";
import crudService from "../services/crudService";

let getHomePage = async (req, res) => {
  try {
    let data = await db.User.findAll();
    console.log("------------------");

    console.log(data);

    return res.render("homepage.ejs", {
      data: JSON.stringify(data),
    });
  } catch (error) {
    console.log(error);
  }
};

let getCRUD = async (req, res) => {
  return res.render("crudpage.ejs");
};

let postCRUD = async (req, res) => {
  let result = await crudService.createNewUser(req.body);
  console.log(result);
  return res.send("post crud from server");
};

let displayGetCRUD = async (req, res) => {
  let result = await crudService.getAllUser();
  return res.render("displaypage.ejs", { users: result });
};

let getEditCRUD = async (req, res) => {
  const id = req.query.id;
  if (id) {
    const userData = await crudService.getUserById(id);

    if (userData) {
      return res.render("editcrud.ejs", { user: userData });
    }
    return res.send("Found a user");
  } else {
    return res.send("Not found user id");
  }
};

let putCRUD = async (req, res) => {
  let data = req.body;
  const result = await crudService.updateUser(data);
  return res.send("Update Success");
};

let deleteCRUD = async (req, res) => {
  let id = req.query.id;
  if (id) {
    await crudService.deleteUserById(id);
    return res.send("Delete user success");
  }
  {
    return res.send("Not found user id");
  }
};

module.exports = {
  getHomePage: getHomePage,
  getCRUD: getCRUD,
  postCRUD: postCRUD,
  displayGetCRUD: displayGetCRUD,
  getEditCRUD: getEditCRUD,
  putCRUD: putCRUD,
  deleteCRUD: deleteCRUD,
};
