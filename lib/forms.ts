export interface FormItem {
  title: string;
  description: string;
  file: string;
  badge: string;
}

export const formsList: FormItem[] = [
  {
    title: "New Patient Questionnaire 2025",
    description: "Required for all first-time patients. Comprehensive medical history, current medication list, and emergency contact details.",
    file: "/forms/New Patient Questionnaire 2025.pdf",
    badge: "New Patients",
  },
  {
    title: "Semaglutide / BPC-157 Consent Form",
    description: "Medical disclosure and informed consent agreement required for peptide weight loss therapy.",
    file: "/forms/Semaglutide_BPC-157 Consent Form.pdf",
    badge: "Required Consent",
  },
  {
    title: "Semaglutide — Weight Loss Tracker",
    description: "Track your weekly subcutaneous dosage, body weight log, and symptom notes.",
    file: "/forms/SEMAGLUTIDE - WEIGHTLOSS TRACKER.pdf",
    badge: "Weight Program",
  },
  {
    title: "My Progress Tracker",
    description: "General health, blood pressure readings, and daily habit tracker for adult wellness.",
    file: "/forms/Imperial Care Internal Medicine_My Progress Tr.pdf",
    badge: "Wellness",
  }
];
