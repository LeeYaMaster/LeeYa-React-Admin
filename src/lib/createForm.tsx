import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";

import type { IFormField } from "@/Test/testFormConfig";
import CreateFormView from "./createFormView";

export type schemaType = z.infer<typeof schema>;
function CreateForm({
  schema,
  formConfig,
  submitForm,
}: {
  schema: z.Schema;
  formConfig: IFormField[];
  submitForm: (data: any) => void;
}) {
  

  const form = useForm<schemaType>({
    resolver: zodResolver(schema),
  });
  const onSubmit = (data: schemaType) => {
    const filteredData: Record<string, any> = {};
    formConfig.forEach((field) => {
      if (!field.when || field.when(data)) {
        filteredData[field.name as keyof schemaType] =
          data[field.name as keyof schemaType];
      }
    });
    data = filteredData as schemaType;
    // console.log(data);
    submitForm(data);
  };

  return (
    <>
      <CreateFormView
        form={form}
        fields={formConfig}
        handleFormSubmit={onSubmit}
      />
    </>
  );
}
export default CreateForm;
