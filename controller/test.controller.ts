import { Response, Request } from "express";
import { Test } from "../services/test.service";


export class TestController {
  
  static get = async (request : Request , response : Response) => {
    response.send("hello")
  }

}
