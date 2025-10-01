import TeacherDB from "../model/teacher.model";
import { teacherInterface, insertTeacherInterface } from "../types/teacher.type";

export class Teacher {

  static async create(data : insertTeacherInterface) {
    return await TeacherDB.create(data);
  }

  static async getAll() {
    return await TeacherDB.find();
  }
  
  static async getById(id : string) {
    return await TeacherDB.findById(id);
  }

  static async update(id : string, data : teacherInterface) {
    return await TeacherDB.findByIdAndUpdate(id, data , { new: true });
  }

  static async delete(id : string) {
    return await TeacherDB.findByIdAndDelete(id);
  }


}
