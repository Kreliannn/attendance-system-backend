import { TeacherController } from "../controller/teacher.controller";
import { Router } from "express";

const route = Router();

route.post("/", TeacherController.createController);
route.get("/", TeacherController.getAllController);
route.get("/:id", TeacherController.getByIdController);
route.put("/:id", TeacherController.updateController);
route.delete("/:id", TeacherController.deleteController);

export default route;
