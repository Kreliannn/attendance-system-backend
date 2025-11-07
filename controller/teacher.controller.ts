import { Response, Request } from "express";
import { Teacher } from "../services/teacher.service";
import { teacherInterface, insertTeacherInterface } from "../types/teacher.type";
import { getChartData , getPiechartData} from "../utils/customFunc";
import { Attendance } from "../services/attendance.service";
import { Student } from "../services/student.service";
import nodemailer from "nodemailer"

export class TeacherController {
 
  static createController = async (request: Request, response: Response) => {
    try {
      const teacher: insertTeacherInterface = request.body;


      /*

      const checkIfExist = await Teacher.getAll()

      if(checkIfExist.length != 0){
        response.status(500).json({ error: "account exist" });
        return
      } */

      const newTeacher = await Teacher.create(teacher);
      response.status(201).json(newTeacher);
    } catch (error) {
      console.log(error)
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

  static forgotPasswordController = async (request: Request, response: Response) => {

    const transporter = nodemailer.createTransport({
        service: 'gmail', // Using Gmail's SMTP service
        auth: {
          user: 'krelianquimson@gmail.com',
          pass: 'rjbs zeby bdhk lwri',
        },
    });

    try {
      const { email } = request.body;
      const teacher = await Teacher.getByEmail(email);

      if(!teacher){
        response.status(500).json({ error: "teacher to found" });
        return
      }

      const pin = Math.floor(1000 + Math.random() * 9000);

      const mailOptions = {
        from: '"defemnhs" <no-reply@defemnhs.com>',
        to: email,
        subject: 'Verification Code',
        text: `Your verification PIN is ${pin}.`,
        html: `
          <div style="font-family: Arial, sans-serif; text-align:center; color:#111;">
            <h2>Verification Code</h2>
            <p>Use the PIN below to continue:</p>
            <div style="font-size:28px; font-weight:bold; letter-spacing:6px; margin:20px 0; color:#2563eb;">
              ${pin}
            </div>
            <p style="color:#666; font-size:12px;">If you didn’t request this, ignore this email.</p>
          </div>
        `
      };


      transporter.sendMail(mailOptions, (error, info) => {
          if (error) {
            console.log('Error:', error);
          } else {
            console.log('Email sent:', info.response);
          }
      });

      await Teacher.updatePin(teacher._id.toString() , pin.toString())

      response.send({
        email : email,
        pin : pin
      })
      
    } catch (error) {
      response.status(500).json({ error: "Failed to send varification" });
    }
  };




  static UpdatePasswordController = async (request: Request, response: Response) => {
    try {
      const { email, password } = request.body;
      const teacher = await Teacher.getByEmail(email);

      if(!teacher){
        response.status(500).json({ error: "teacher to found" });
        return
      }

      await Teacher.updatePassword(teacher._id.toString(), password)
      await Teacher.updatePin(teacher._id.toString(), "")

      response.send("success")
      
    } catch (error) {
      response.status(500).json({ error: "Failed to send varification" });
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
