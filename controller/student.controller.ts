import { Response, Request } from "express";
import { Student } from "../services/student.service";
import { insertStudentInterface, studentInterface } from "../types/student.type";

export class StudentController {
 
  static createController = async (request: Request, response: Response) => {
    try {
      const student: insertStudentInterface = request.body.student;
      const newStudent = await Student.create(student);
      response.status(201).json(newStudent);
    } catch (error) {
      response.status(500).json({ error: "Failed to create student" });
    }
  };

  static getAllController = async (request: Request, response: Response) => {
    try {
      const students = await Student.getAll();
      response.json(students);
    } catch (error) {
      response.status(500).json({ error: "Failed to fetch students" });
    }
  };

  static getByIdController = async (request: Request, response: Response) => {
    try {
      const { id } = request.params;
      const student = await Student.getById(id);
      if (!student) return response.status(404).json({ error: "Student not found" });
      response.json(student);
    } catch (error) {
      response.status(500).json({ error: "Failed to fetch student" });
    }
  };

  static updateController = async (request: Request, response: Response) => {
    try {
      const { id } = request.params;
      const studentData: studentInterface = request.body.student;
      const updatedStudent = await Student.update(id, studentData);
      if (!updatedStudent) return response.status(404).json({ error: "Student not found" });
      response.json(updatedStudent);
    } catch (error) {
      response.status(500).json({ error: "Failed to update student" });
    }
  };

  static deleteController = async (request: Request, response: Response) => {
    try {
      const { id } = request.params;
      const deletedStudent = await Student.delete(id);
      if (!deletedStudent) return response.status(404).json({ error: "Student not found" });
      response.json({ message: "Student deleted successfully" });
    } catch (error) {
      response.status(500).json({ error: "Failed to delete student" });
    }
  };
}
