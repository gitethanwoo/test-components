export type Status = {
  value: string
  label: string
}

export const statuses: Status[] = [
  { value: "prospective_mom", label: "Prospective Mom" },
  { value: "waiting_pre_assessment", label: "Waiting for Pre-Assessment" },
  { value: "waiting_to_be_paired", label: "Waiting to be Paired" },
  { value: "paired_with_advocate", label: "Paired with Advocate" },
  { value: "group_classes", label: "Group Classes" },
  { value: "completed", label: "Completed" },
  { value: "false_start", label: "False Start" },
  { value: "paused", label: "Paused" },
  { value: "discharged", label: "Discharged" },
  { value: "served_wo_program", label: "Served w/o Program Engagement" }
];

export const initialData = [
  { id: 1, name: "Ava Kassing", status: "false_start", zip: "33064", referralDate: "02/28/23", agency: "Child Protective Services" },
  { id: 2, name: "Dianna Kastner", status: "prospective_mom", zip: "33069", referralDate: "1/31/14", agency: "Hope Women's Center" },
  { id: 3, name: "Olivia Jules", status: "waiting_pre_assessment", zip: "33319", referralDate: "7/11/19", agency: "Childnet" },
  { id: 4, name: "Emma Johnson", status: "waiting_to_be_paired", zip: "33069", referralDate: "5/19/12", agency: "His Caring Place" },
  { id: 5, name: "Anne Smith", status: "discharged", zip: "33068", referralDate: "1/28/17", agency: "Child Protective Services" },
];

export type StatusColor = {
  [key: string]: string;
};

export const statusColors: StatusColor = {
  false_start: "bg-gray-50",
  prospective_mom: "bg-blue-50",
  waiting_pre_assessment: "bg-yellow-50",
  waiting_to_be_paired: "bg-red-50",
  paired_with_advocate: "bg-green-50",
  paused: "bg-gray-50",
  discharged: "bg-gray-50",
  completed: "bg-gray-50",
  served_wo_program: "bg-pink-50",
  group_classes: "bg-indigo-50",
};