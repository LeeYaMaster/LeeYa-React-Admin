import { Button } from "@/components/ui/button";

import {
  FormField,
  FormItem,
  FormControl,
  FormMessage,
  FormLabel,
  Form,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import type { UseFormReturn } from "react-hook-form";
import type { schemaType } from "./createForm";
import type { IFormField } from "@/Test/testFormConfig";

function CreateFormView({
  form,
  fields,
  handleFormSubmit,
}: {
  form: UseFormReturn<schemaType>;
  fields: IFormField[];
  handleFormSubmit: (data: schemaType) => void;
}) {
  console.log(form);

  const watchedValues = form.watch();

  const createFieldsView = () => {
    return (
      <>
        {fields.map((fieldItem) => {
          switch (fieldItem.type) {
            case "input":
              return createInputField(form, fieldItem);
            case "radio":
              return createRadioField(form, fieldItem);
            case "select":
              return createSelectField(form, fieldItem);
          }
        })}
      </>
    );
  };

  const createInputField = (
    form: UseFormReturn<schemaType>,
    fieldItem: IFormField
  ) => {
    return (
      <FormField
        control={form.control}
        name={fieldItem.name}
        render={({ field }) => (
          <FormItem>
            <FormLabel>{fieldItem.label}</FormLabel>
            <FormControl>
              <Input {...field} />
            </FormControl>
            <FormMessage />
          </FormItem>
        )}
      />
    );
  };

  const createRadioField = (
    form: UseFormReturn<schemaType>,
    fieldItem: IFormField
  ) => {
    return (
      <FormField
        control={form.control}
        name={fieldItem.name}
        render={({ field }) => (
          <FormItem>
            <FormLabel>{fieldItem.label}</FormLabel>
            <FormControl>
              <RadioGroup onValueChange={field.onChange} value={field.value}>
                {fieldItem.options?.map((option) => (
                  <FormItem
                    key={option.value}
                    className="flex items-center space-x-2"
                  >
                    <RadioGroupItem
                      value={option.value}
                      id={`${fieldItem.name}-${option.value}`}
                    />
                    <FormLabel
                      htmlFor={`${fieldItem.name}-${option.value}`}
                      className="!m-0 !cursor-pointer"
                    >
                      {option.label}
                    </FormLabel>
                  </FormItem>
                ))}
              </RadioGroup>
            </FormControl>
            <FormMessage />
          </FormItem>
        )}
      />
    );
  };

  const createSelectField = (
    form: UseFormReturn<schemaType>,
    fieldItem: IFormField
  ) => {
    return (
      <>
        {fieldItem.when?.(watchedValues) && (
          <FormField
            control={form.control}
            name={fieldItem.name}
            render={({ field }) => (
              <FormItem>
                <FormLabel>{fieldItem.label}</FormLabel>
                <FormControl>
                  <Select value={field.value} onValueChange={field.onChange}>
                    <SelectTrigger>
                      <SelectValue
                        placeholder={fieldItem.placeholder ?? "Select a value"}
                      />
                    </SelectTrigger>
                    <SelectContent>
                      {fieldItem.options?.map((option) => (
                        <SelectItem value={option.value}>
                          {option.label}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        )}
      </>
    );
  };

  const onSubmit = (data: schemaType) => {
    handleFormSubmit(data);
  };

  return (
    <>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
          {createFieldsView()}
          <Button type="submit">Submit</Button>
        </form>
      </Form>
    </>
  );
}

export default CreateFormView;
