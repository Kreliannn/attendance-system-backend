import { SmsMessageController } from "../controller/smsMessage.controller";
import { Router } from "express";

const route = Router()
;
route.get("/", SmsMessageController.getAllController);

export default route;