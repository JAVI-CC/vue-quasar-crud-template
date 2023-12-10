export interface Message {
  message: string;
}

export interface MessageErrors {
  [key: string]: string[];
}

export interface NotificationPusher {
  tipo: string;
  value: boolean | string | number;
}