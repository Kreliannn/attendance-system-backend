import { Response, Request } from "express";
import { Teacher } from "../services/teacher.service";
import { teacherInterface, insertTeacherInterface } from "../types/teacher.type";
import { getChartData , getPiechartData} from "../utils/customFunc";
import { Attendance } from "../services/attendance.service";
import { Student } from "../services/student.service";


export class TeacherController {
 
  static createController = async (request: Request, response: Response) => {
    try {
      const teacher: insertTeacherInterface = request.body;

      const checkIfExist = await Teacher.getAll()

      if(checkIfExist.length != 0){
        response.status(500).json({ error: "account exist" });
        return
      }

      const newTeacher = await Teacher.create(teacher);
      response.status(201).json(newTeacher);
    } catch (error) {
      response.status(500).json({ error: "Failed to create Teacher" });
    }
  };

  static getAllController = async (request: Request, response: Response) => {
    try {
      const teacher = await Teacher.getAll();
      response.json(teacher);
    } catch (error) {
      response.status(500).json({ error: "Failed to fetch teacher" });
    }
  };

  static getByIdController = async (request: Request, response: Response) => {
    try {
      const { id } = request.params;
      const teacher = await Teacher.getById(id);
      response.json(teacher);
    } catch (error) {
      response.status(500).json({ error: "Failed to fetch teacher" });
    }
  };

  static updateController = async (request: Request, response: Response) => {
    try {
      const { id } = request.params;
      const teacherData: teacherInterface = request.body;
      const updatedTeacher = await Teacher.update(id, teacherData);  
      response.json(updatedTeacher);
    } catch (error) {
      response.status(500).json({ error: "Failed to update student" });
    }
  };

  static deleteController = async (request: Request, response: Response) => {
    try {
      const { id } = request.params;
      await Teacher.delete(id);
      response.json({ message: "teacher deleted successfully" });
    } catch (error) {
      response.status(500).json({ error: "Failed to delete teacher" });
    }
  };



  static loginController = async (request: Request, response: Response) => {
    try {
      const { username, password } = request.body;
      const teacher = await Teacher.login(username, password);
      if(teacher) response.send(teacher);
      else response.status(500).send("not dfound");
    } catch (error) {
      response.status(500).json({ error: "Failed to fetch teacher" });
    }
  };


  static getDashboardDataController = async (request: Request, response: Response) => {
        //@ts-ignore
        const chartData = getChartData(await Attendance.getAll())
        //@ts-ignore
        const attendanceStatus = getPiechartData(await Attendance.getToday())

        const totalStudent = (await Student.getAll()).length

        const totalPresent = attendanceStatus.present
        const totalAbsent = attendanceStatus.absent

        const pieChartData = [
            { status: "present", count: totalPresent , fill: "#22c55e" },
            { status: "absent", count: totalAbsent, fill: "#ef4444" },
        ]

        response.send({
            totalStudent,
            totalPresent,
            totalAbsent,
            chartData,
            pieChartData
        })
  };
}
