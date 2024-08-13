export type Field = {
  name: string;
  label: string;
  type: 'text' | 'email' | 'tel' | 'date' | 'select';
  placeholder: string;
  options?: { value: string; label: string }[];
};

export interface Report {
  id: number;
  client: string;
  advocate: string;
  date: string;
  course: string;
  lessonCompleted: string;
  sessionType: string;
  sessionNotes: string;
  immediateNeeds: string;
  concerns: string;
  recommendations: string;
  nextSessionDate: string;
}

export interface Notification {
  id: number;
  client: string;
  need: string;
  isRead: boolean;
}

export interface MomAwaitingIntake {
  id: number;
  name: string;
  dob: string;
  referralType: 'self' | 'agency';
  agencyName?: string;
  housing_status: string;
  is_mom_pregnant: string;
  employment_status: string;
  number_of_children: number;
  financial_situation: string;
  known_child_welfare_involvement: {
    assigned_case_manager: boolean;
    children_out_of_home_placement: boolean;
    open_investigation: boolean;
    domestic_violence: boolean;
    mental_health: boolean;
    substance_abuse: boolean;
    lack_of_social_support: boolean;
  };
  other_needs_or_crises: string;
}