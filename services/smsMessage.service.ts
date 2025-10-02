import SmsMessageDB from "../model/smsMessage.model";
import { smsMessageInterface, insertSmsMessageInterface } from "../types/smsMessage.type";

export class SmsMessage {

  static async create(data : insertSmsMessageInterface) {
    return await SmsMessageDB.create(data);
  }

  static async getAll() {
    return await SmsMessageDB.find().populate("student");
  }

  static async getById(id : string) {
    return await SmsMessageDB.findById(id).populate("student");
  }

  static async update(id : string, data : smsMessageInterface) {
    return await SmsMessageDB.findByIdAndUpdate(id, data , { new: true });
  }

  static async delete(id : string) {
    return await SmsMessageDB.findByIdAndDelete(id);
  }

  static async getToday() {
    const date = new Date();
    const today = date.toISOString().split("T")[0]; 
    return await SmsMessageDB.find({ date : today }).populate("student");
  }
}
