import { StudentController } from "../controller/student.controller";
import { Router } from "express";

const route = Router();

route.post("/", StudentController.createController);
route.get("/", StudentController.getAllController);
route.get("/:id", StudentController.getByIdController);
route.put("/:id", StudentController.updateController);
route.delete("/:id", StudentController.deleteController);

export default route;

