export type FieldOption = {
  label: string;
  value: string;
};

export type FieldConfig<T> = {
  name: keyof T;
  type: "text" | "email" | "password" | "checkbox" | "select";
  label: string;
  required?: boolean;
  validation?: RegExp;
  minLength?: number;
  options?: { label: string; value: string }[];
};
