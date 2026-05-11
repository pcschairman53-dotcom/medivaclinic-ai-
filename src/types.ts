export interface Message {
  id: string;
  role: 'user' | 'assistant';
  content: string;
  timestamp: Date;
}

export interface AppointmentRequest {
  name: string;
  phone: string;
  problem: string;
  appointmentTime: string;
}

export interface Lead {
  name: string;
  phone: string;
  problem: string;
  timestamp: string;
}
