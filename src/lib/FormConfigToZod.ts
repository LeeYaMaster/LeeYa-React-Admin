import { z } from "zod";

// 将 IFormField[] 转换为 Zod Schema 的方法
export function formConfigToZodSchema(formConfig: IFormField[]) {
  // 第一步：创建基础对象 schema
  const baseSchema: Record<string, any> = {};

  formConfig.forEach((field) => {
    switch (field.type) {
      case "input":
        if (field.required) {
          baseSchema[field.name] = z
            .string({ message: `${field.label} cannot be empty` })
            .min(1, `${field.label} cannot be empty`);
        } else {
          baseSchema[field.name] = z.string().optional();
        }
        break;

      case "radio":
        if (field.options) {
          const values = field.options.map((opt) => opt.value) as [
            string,
            ...string[]
          ];
          baseSchema[field.name] = z.enum(values, {
            message: `Please select a ${field.label.toLowerCase()}`,
          });
        }
        break;

      case "select":
        if (field.options) {
          const values = field.options.map((opt) => opt.value) as [
            string,
            ...string[]
          ];
          // 根据 when 条件决定是否为可选
          if (field.when) {
            baseSchema[field.name] = z.enum(values).optional();
          } else {
            baseSchema[field.name] = z.enum(values, {
              message: `Please select a ${field.label.toLowerCase()}`,
            });
          }
        }
        break;
    }
  });

  // 第二步：创建基础 Zod 对象
  let schema = z.object(baseSchema);

  // 第三步：添加 superRefine 验证规则
  schema = schema.superRefine((data, ctx) => {
    formConfig.forEach((field) => {
      // 处理 validateRules
      if (field.validateRules) {
        field.validateRules.forEach((rule) => {
          if (rule.when(data)) {
            ctx.addIssue({
              code: "custom",
              message: rule.message,
              path: [field.name],
            });
          }
        });
      }
    });
  });

  return schema;
}

// const schema = z
//   .object({
//     username: z
//       .string({ message: "Username cannot be empty" })
//       .min(1, "Username cannot be empty"),
//     // date: z.date({ message: "Date cannot be empty" }),
//     gender: z.enum(["male", "female"], { message: "Please select a gender" }),
//     country: z.enum(["china", "usa", "uk", "france"]).optional(),
//     city: z.enum(["beijing", "shanghai", "guangzhou", "shenzhen"]).optional(),
//   })
//   .superRefine((data, ctx) => {
//     if (data.gender === "male" && !data.country) {
//       ctx.addIssue({
//         code: "custom",
//         message: "If gender is 'male', country is required.",
//         path: ["country"],
//       });
//     }
//     if (data.country === "china" && !data.city) {
//       ctx.addIssue({
//         code: "custom",
//         message: "If country is 'china', city is required.",
//         path: ["city"],
//       });
//     }
//   });
