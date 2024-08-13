export type Field = {
  name: string;
  label: string;
  type: 'text' | 'email' | 'tel' | 'date' | 'select';
  placeholder: string;
  options?: { value: string; label: string }[];
};