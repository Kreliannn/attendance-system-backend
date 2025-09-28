import { Router } from "express";
import studentRoute from "./student.route"
import attendanceRoute from "./attendance.route"


const routes = Router()

routes.use("/student", studentRoute)
routes.use("/attendance", attendanceRoute)

export default routes