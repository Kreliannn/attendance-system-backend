import StudentDB from "../model/student.model";
import { studentInterface, insertStudentInterface } from "../types/student.type.js";

export class Student {

  static async create(data : insertStudentInterface) {
    return await StudentDB.create(data);
  }

  static async getAll() {
    return await StudentDB.find();
  }

  static async getById(id : string) {
    return await StudentDB.findById(id);
  }

  static async update(id : string, data : studentInterface) {
    return await StudentDB.findByIdAndUpdate(id, data , { new: true });
  }

  static async delete(id : string) {
    return await StudentDB.findByIdAndDelete(id);
  }
}
