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
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from "zod";

interface IFormInput {
  username: string;
  date: Date;
}

const schema = z.object({
  username: z.string({ message: "Username cannot be empty" }).min(1, "Username cannot be empty"),
  date: z.date({ message: "Date cannot be empty" }),
});
console.log(schema.safeParse({ username: "", date: new Date() }));
export type schemaType = z.infer<typeof schema>;

function Test() {
  const form = useForm<schemaType>({
    resolver: zodResolver(schema),   // 仅此一行！
  });

  const onSubmit = (data: IFormInput) => {
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
          />

          <Button type="submit">Submit</Button>
        </form>
      </Form>
    </>
  );
}

export default Test;
