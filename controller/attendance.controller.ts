import { Response, Request } from "express";
import { Attendance } from "../services/attendance.service";
import { attendanceInterface, insertAttendanceInterface } from "../types/attendance.type";

export class AttendanceController {
 
  static createController = async (request: Request, response: Response) => {
    try {
      const attendance: insertAttendanceInterface = request.body.attendance;
      const newAttendance = await Attendance.create(attendance);
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
      if (!attendace) return response.status(404).json({ error: "attendace not found" });
      response.json(attendace);
    } catch (error) {
      response.status(500).json({ error: "Failed to fetch attendace" });
    }
  };

  static updateController = async (request: Request, response: Response) => {
    try {
      const { id } = request.params;
      const attendanceData: attendanceInterface = request.body.attendance;
      const updatedAttendance = await Attendance.update(id, attendanceData);
      if (!updatedAttendance) return response.status(404).json({ error: "attendace not found" });
      response.json(updatedAttendance);
    } catch (error) {
      response.status(500).json({ error: "Failed to update attendace" });
    }
  };

  static deleteController = async (request: Request, response: Response) => {
    try {
      const { id } = request.params;
      const deletedStudent = await Attendance.delete(id);
      if (!deletedStudent) return response.status(404).json({ error: "attendace not found" });
      response.json({ message: "attendace deleted successfully" });
    } catch (error) {
      response.status(500).json({ error: "Failed to delete attendace" });
    }
  };
}
