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
import DatePickerCombo from "@/components/myComponents/datePickerCombo";

import { z } from "zod";
import dayjs from "dayjs";

interface IFormInput {
  username: string;
  date: Date;
}
function Test() {
  const form = useForm<IFormInput>();
  const onSubmit = (data: IFormInput) => {

    const schema = z.object({
      username: z.string().min(1, "Username不能为空"),
      date: z.date({ message: "日期不能为空" }),
    });

    const result = schema.safeParse(data);
    if (!result.success) {
      console.log("Form validation failed: " + JSON.stringify(result.error.format(), null, 2));
      return;
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
          <FormField
            control={form.control}
            name="date"
            render={({ field }) => {
              if (!field.value) {
                field.onChange(dayjs().toDate());
              }
              return (
                <DatePickerCombo field={field} />
              );
            }}
          />

          <Button type="submit">Submit</Button>
        </form>
      </Form>
    </>
  );
}

export default Test;
