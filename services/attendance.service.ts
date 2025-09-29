import AttendanceDB from "../model/attendance.model";
import { attendanceInterface, insertAttendanceInterface } from "../types/attendance.type";

export class Attendance {

  static async create(data : insertAttendanceInterface) {
    return await AttendanceDB.create(data);
  }

  static async getAll() {
    return await AttendanceDB.find().populate("student");
  }
  

  static async getById(id : string) {
    return await AttendanceDB.findById(id).populate("student");
  }

  static async update(id : string, data : attendanceInterface) {
    return await AttendanceDB.findByIdAndUpdate(id, data , { new: true });
  }

  static async delete(id : string) {
    return await AttendanceDB.findByIdAndDelete(id);
  }

  static async checkIfExist(student_id : string, date : string) {
    return await AttendanceDB.findOne({student : student_id, date : date});
  }

  static async getToday() {
    const date = new Date();
    const today = date.toISOString().split("T")[0]; 
    return await AttendanceDB.find({ date : today }).populate("student");
  }
}
