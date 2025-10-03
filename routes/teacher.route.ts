import { TeacherController } from "../controller/teacher.controller";
import { Router } from "express";

const route = Router();

route.post("/", TeacherController.createController);
route.post("/login", TeacherController.loginController);
route.post("/password", TeacherController.forgotPasswordController);
route.put("/password", TeacherController.UpdatePasswordController);
route.get("/", TeacherController.getAllController);
route.get("/dashboard", TeacherController.getDashboardDataController);
route.get("/:id", TeacherController.getByIdController);
route.put("/:id", TeacherController.updateController);
route.delete("/:id", TeacherController.deleteController);

export default route;
