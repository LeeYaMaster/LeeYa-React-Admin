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
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
          <FormField
            control={form.control}
            name="username"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Username</FormLabel>
                <FormControl>
                  <Input
                    placeholder="shadcn"
                    {...field}
                    value={field.value ?? ""}
                  />
                </FormControl>

                <FormDescription>
                  This is your public display name.
                </FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />
          {/* <FormField
            control={form.control}
            name="date"
            render={({ field }) => {
              // if (!field.value) {
              //   field.onChange(dayjs().toDate());
              // }
              return (
                <>
                  <FormLabel>Date</FormLabel>
                  <DatePickerCombo field={field} />
                  <FormMessage />
                </>
              );
            }}
          /> */}
          <FormField
            control={form.control}
            name="gender"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Gender</FormLabel>
                <FormControl>
                  <div className="flex space-x-4">
                    <RadioGroup
                      onValueChange={field.onChange}
                      value={field.value}
                    >
                      <FormControl>
                        <RadioGroupItem value="male" id="gender-male" />
                      </FormControl>
                      <FormLabel htmlFor="gender-male">Male</FormLabel>

                      <FormControl>
                        <RadioGroupItem value="female" id="gender-female" />
                      </FormControl>
                      <FormLabel htmlFor="gender-female">Female</FormLabel>
                    </RadioGroup>
                  </div>
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          {form.watch("gender") === "male" && (
            <FormField
              control={form.control}
              name="country"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Country</FormLabel>
                  <FormControl>
                    <Select value={field.value} onValueChange={field.onChange}>
                      <SelectTrigger>
                        <SelectValue placeholder="Select a country" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="china">China</SelectItem>
                        <SelectItem value="usa">USA</SelectItem>
                        <SelectItem value="uk">UK</SelectItem>
                        <SelectItem value="france">France</SelectItem>
                      </SelectContent>
                    </Select>
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          )}
          {form.watch("country") === "china" && form.watch("gender") === "male" && (
            <FormField
              control={form.control}
              name="city"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>City</FormLabel>
                  <FormControl>
                    <Select value={field.value} onValueChange={field.onChange}>
                      <SelectTrigger>
                        <SelectValue placeholder="选择城市" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="beijing">北京</SelectItem>
                        <SelectItem value="shanghai">上海</SelectItem>
                        <SelectItem value="guangzhou">广州</SelectItem>
                        <SelectItem value="shenzhen">深圳</SelectItem>
                      </SelectContent>
                    </Select>
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          )}
          <Button type="submit">Submit</Button>
        </form>
      </Form>
    </>
  );
}

export default Test;
