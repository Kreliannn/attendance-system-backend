import { Router } from "express";
import studentRoute from "./student.route"
import attendanceRoute from "./attendance.route"
import teacherRoute from "./teacher.route"


const routes = Router()

routes.use("/student", studentRoute)
routes.use("/attendance", attendanceRoute)
routes.use("/teacher", teacherRoute)

export default routes