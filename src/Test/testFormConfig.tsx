export interface IFormField {
  name: string;
  label: string;
  type: "input" | "radio" | "select";
  options?: { label: string; value: string }[];
  placeholder?: string;
}
export const testFormConfig: IFormField[] = [
  {
    name: "username",
    label: "Username",
    placeholder: "shadcn",
    type: "input",
  },
  {
    name: "gender",
    label: "Gender",
    type: "radio",
    options: [
      { label: "Male", value: "male" },
      { label: "Female", value: "female" },
    ],
  },
  {
    name: "country",
    label: "Country",
    type: "select",
    options: [
      { label: "China", value: "china" },
      { label: "USA", value: "usa" },
      { label: "UK", value: "uk" },
      { label: "France", value: "france" },
    ],
  },
  {
    name: "city",
    label: "City",
    type: "select",
    options: [
      { label: "Beijing", value: "beijing" },
      { label: "Shanghai", value: "shanghai" },
      { label: "Guangzhou", value: "guangzhou" },
      { label: "Shenzhen", value: "shenzhen" },
    ],
  },
];
