import axios from "axios";

const API_KEY = "YOUR_SEMAPHORE_API_KEY";

export async function sendSMS(contact: string, message: string) {
  try {
    const response = await axios.post("https://api.semaphore.co/api/v4/messages", {
      apikey: API_KEY,
      number: contact,
      message: message,
      sendername: "SEMAPHORE" 
    });

    return response.data;
  } catch (error) {
    console.error("Failed to send SMS:", error);
    throw error;
  }
}





const CLICKSEND_USERNAME = "YOUR_USERNAME";
const CLICKSEND_API_KEY = "YOUR_API_KEY";


export async function sendClickSendSMS(contact: string, message: string) {
  try {
    const response = await axios.post(
      "https://rest.clicksend.com/v3/sms/send",
      {
        messages: [
          {
            source: "sdk",
            body: message,
            to: contact,
          },
        ],
      },
      {
        auth: {
          username: CLICKSEND_USERNAME,
          password: CLICKSEND_API_KEY,
        },
      }
    );

    return response.data;
  } catch (error) {
    console.error("Failed to send SMS via ClickSend:", error);
    throw error;
  }
}
