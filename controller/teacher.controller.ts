import { Response, Request } from "express";
import { Teacher } from "../services/teacher.service";
import { teacherInterface, insertTeacherInterface } from "../types/teacher.type";

export class TeacherController {
 
  static createController = async (request: Request, response: Response) => {
    try {
      const teacher: insertTeacherInterface = request.body;
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
}
