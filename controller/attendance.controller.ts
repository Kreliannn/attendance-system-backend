import { Response, Request } from "express";
import { Attendance } from "../services/attendance.service";
import { attendanceInterface, insertAttendanceInterface } from "../types/attendance.type";

export class AttendanceController {
 
  static createController = async (request: Request, response: Response) => {
    try {
      const attendance: insertAttendanceInterface = request.body.attendance;
      const sendSms : boolean = request.body.sendSms;
      
      const findAttendance = await Attendance.checkIfExist(attendance.student, attendance.date)

      if(findAttendance) await Attendance.delete(findAttendance._id.toString())

      const newAttendance = await Attendance.create(attendance);

      if(sendSms){
        console.log("sms sent")
      }

      response.status(201).json(newAttendance);
    } catch (error) {
      response.status(500).json({ error: "Failed to create attendace" });
    }
  };

  static getAllController = async (request: Request, response: Response) => {
    try {
      const attendance = await Attendance.getAll();
      response.json(attendance);
    } catch (error) {
      response.status(500).json({ error: "Failed to fetch attendace" });
    }
  };

  static getByIdController = async (request: Request, response: Response) => {
    try {
      const { id } = request.params;
      const attendace = await Attendance.getById(id);
      response.json(attendace);
    } catch (error) {
      response.status(500).json({ error: "Failed to fetch attendace" });
    }
  };

  static updateController = async (request: Request, response: Response) => {
    try {
      const { id } = request.params;
      const attendanceData: attendanceInterface = request.body;
      const updatedAttendance = await Attendance.update(id, attendanceData);
      response.json(updatedAttendance);
    } catch (error) {
      response.status(500).json({ error: "Failed to update attendace" });
    }
  };

  static deleteController = async (request: Request, response: Response) => {
    try {
      const { id } = request.params;
      const deletedStudent = await Attendance.delete(id);
      response.json({ message: "attendace deleted successfully" });
    } catch (error) {
      response.status(500).json({ error: "Failed to delete attendace" });
    }
  };


  static getTodayController = async (request: Request, response: Response) => {
    const attendance = await Attendance.getToday();
    response.json(attendance);
  };
}
