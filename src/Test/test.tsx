import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";

import CreateForm from "@/lib/createForm";

interface IFormInput {
  username: string;
  // date: Date;
  gender: "male" | "female";
  country: "china" | "usa" | "uk" | "france";
  city: "beijing" | "shanghai" | "guangzhou" | "shenzhen";
}
import { testFormConfig } from "./testFormConfig";
import { formConfigToZodSchema } from "@/lib/FormConfigToZod";

const schema = formConfigToZodSchema(testFormConfig);

function Test() {
  const submitForm = (data: IFormInput) => {
    console.log(data);
  };
  return (
    <>
      <CreateForm
        schema={schema}
        formConfig={testFormConfig}
        submitForm={submitForm}
      />
    </>
  );
}

export default Test;
