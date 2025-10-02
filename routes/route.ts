import { Router } from "express";
import studentRoute from "./student.route"
import attendanceRoute from "./attendance.route"
import teacherRoute from "./teacher.route"
import smsMessageRoute from "./smsMessage.route"

const routes = Router()

routes.use("/student", studentRoute)
routes.use("/attendance", attendanceRoute)
routes.use("/teacher", teacherRoute)
routes.use("/smsMessage", smsMessageRoute)

export default routes