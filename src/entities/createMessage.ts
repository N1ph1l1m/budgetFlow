
export type typeMessage = "off" | "error" | "success";
export type typeSetIsMessage = (value: typeMessage) => void;
export type typeSetTextMessage = (value: string) => void;

interface ICreateMessage {
  typeMessage: typeMessage;
  message: string;
  setIsMessage: typeSetIsMessage;
  setTextMessage: typeSetTextMessage;
}

export  default function createMessage({
  typeMessage,
  message,
  setIsMessage,
  setTextMessage,
}: ICreateMessage) {
  setIsMessage(typeMessage);
  setTextMessage(message);
}
