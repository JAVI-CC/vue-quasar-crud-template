export interface Message {
  message: string;
}

export interface MessageErrors {
  [key: string]: string[];
}

export interface NotificationPusher {
  type: string;
  value: boolean | string | number;
}