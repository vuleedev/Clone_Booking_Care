import express from "express";
import homeController from "../controllers/homeController";
import userController from "../controllers/userController";

let router = express.Router();

let initWebRoutes = (app) => {
  router.get("/", homeController.getHomePage);
  router.get("/crud", homeController.getCRUD);
  router.post("/post-crud", homeController.postCRUD);
  router.get("/get-crud", homeController.displayGetCRUD);
  router.get("/edit-crud", homeController.getEditCRUD);
  router.post("/put-crud", homeController.putCRUD);
  router.get("/delete-crud", homeController.deleteCRUD);

  //auth_router
  router.post("/api/login", userController.handleLogin);
  //end_auth_router

  //user_router
  router.get("/api/get-all-user", userController.handleGetAllUsers);
  router.post("/api/create-new-user", userController.handleCreateNewUser);
  router.put("/api/update-user", userController.handleEditNewUser);
  router.delete("/api/delete-user", userController.handleDeleteUser);
  //end_user_router

  //all_code_router
  router.get("/api/all-code", userController.getAllCode);
  //end_all_code_router

  return app.use("/", router);
};

module.exports = initWebRoutes;
