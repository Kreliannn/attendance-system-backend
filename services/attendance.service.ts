import AttendanceDB from "../model/attendance.model";
import { attendanceInterface, insertAttendanceInterface } from "../types/attendance.type";

export class Attendance {

  static async create(data : insertAttendanceInterface) {
    return await AttendanceDB.create(data);
  }

  static async getAll() {
    return await AttendanceDB.find();
  }

  static async getById(id : string) {
    return await AttendanceDB.findById(id);
  }

  static async update(id : string, data : attendanceInterface) {
    return await AttendanceDB.findByIdAndUpdate(id, data , { new: true });
  }

  static async delete(id : string) {
    return await AttendanceDB.findByIdAndDelete(id);
  }
}
