// Contact Form Types
export interface ContactFormData {
  name: string;
  email: string;
  message: string;
}

export interface ContactFormStatus {
  type: "success" | "error" | null;
  message: string;
}
