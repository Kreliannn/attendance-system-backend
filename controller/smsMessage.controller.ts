import { Response, Request } from "express";
import { SmsMessage } from "../services/smsMessage.service";

export class SmsMessageController {
 
  static getAllController = async (request: Request, response: Response) => {
    try {
      const smsMessages = await SmsMessage.getAll();
      response.json(smsMessages);
    } catch (error) {
      response.status(500).json({ error: "Failed to fetch sms message" });
    }
  };



}
