export interface Message {
  id: string;
  role: 'user' | 'assistant';
  content: string;
  timestamp: string;
}

export interface ChatRequest {
  message: string;
  history?: { role: string; content: string }[];
}

export interface ChatResponse {
  reply: string;
}

export interface BrainFile {
  clinic: {
    name: string;
    doctor: string;
    specialty: string;
    phone: string;
    fax: string;
    tagline: string;
  };
  locations: {
    name: string;
    address: string;
    status: string;
    directions: string;
  }[];
  hours: Record<string, string>;
  services: {
    name: string;
    description: string;
    [key: string]: any;
  }[];
  staff: { name: string; role: string }[];
  forms: { name: string; type: string }[];
  policies: {
    no_medical_advice: string;
    privacy: string;
    sms: string;
  };
}
