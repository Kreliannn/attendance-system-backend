import { AttendanceController } from "../controller/attendance.controller";
import { Router } from "express";

const route = Router();

route.post("/", AttendanceController.createController);
route.get("/", AttendanceController.getAllController);
route.get("/:id", AttendanceController.getByIdController);
route.put("/:id", AttendanceController.updateController);
route.delete("/:id", AttendanceController.deleteController);

export default route;
