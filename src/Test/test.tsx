import { Button } from "@/components/ui/button";
import {
  FormField,
  FormItem,
  FormControl,
  FormDescription,
  FormMessage,
  FormLabel,
  Form,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import CreateForm from "@/lib/createForm";

interface IFormInput {
  username: string;
  // date: Date;
  gender: "male" | "female";
  country: "china" | "usa" | "uk" | "france";
  city: "beijing" | "shanghai" | "guangzhou" | "shenzhen";
}

const schema = z
  .object({
    username: z
      .string({ message: "Username cannot be empty" })
      .min(1, "Username cannot be empty"),
    // date: z.date({ message: "Date cannot be empty" }),
    gender: z.enum(["male", "female"], { message: "Please select a gender" }),
    country: z.enum(["china", "usa", "uk", "france"]).optional(),
    city: z.enum(["beijing", "shanghai", "guangzhou", "shenzhen"]).optional(),
  })
  .superRefine((data, ctx) => {
    console.log(data);

    if (data.gender === "male" && !data.country) {
      ctx.addIssue({
        code: "custom",
        message: "If gender is 'male', country is required.",
        path: ["country"],
      });
    }

    if (data.country === "china" && !data.city) {
      ctx.addIssue({
        code: "custom",
        message: "If country is 'china', city is required.",
        path: ["city"],
      });
    }
  });

// console.log(schema.safeParse({ username: "", date: new Date() }));
export type schemaType = z.infer<typeof schema>;

function Test() {
  const form = useForm<schemaType>({
    resolver: zodResolver(schema)
    // defaultValues: {
    //   username: "",
    //   gender: undefined,
    //   country: undefined,
    //   city: undefined,
    // },
  });

  const onSubmit = (data: IFormInput) => {
    // 如果gender不是male，data删掉country的值
    if (data.gender !== "male") {
      // 由于提交时data是一个对象，为了避免副作用，建议浅拷贝
      const { country, ...rest } = data;
      data = rest as IFormInput;
    }
    // 如果country不是china，data删掉city的值
    if (data.country !== "china") {
      // 由于提交时data是一个对象，为了避免副作用，建议浅拷贝
      const { city, ...rest } = data;
      data = rest as IFormInput;
    }

    console.log(data);
  };

  return (
    <>
        <CreateForm />
 
    </>
  );
}

export default Test;
