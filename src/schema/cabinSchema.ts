import z from "zod";

// const emptyStringPreprocessor = (value: unknown, field: string) => {
//   if (value === "") {
//     throw new z.ZodError([
//       {
//         message: "This Field is required",
//         code: z.ZodIssueCode.custom,
//         path: [field],
//       },
//     ]);
//   }
//   return value;
// };

export const BasicCreateCabinSchema = z.object({
  name: z.string().min(1, { message: "This field is required" }),

  maxCapacity: z.coerce
    .number()
    .min(1, { message: "Capacity should be greater than 0" })
    .int(),
  regularPrice: z.coerce
    .number()
    .min(1, { message: "Price should be greater than 0" })
    .int(),
  discount: z.coerce
    .number()
    .min(0, { message: "Discount should be greater than or equal to 0" })
    .int(),

  description: z.string().min(1, { message: "This field is required" }),
  image: z.instanceof(FileList).or(z.instanceof(File)).or(z.string()),
});

export const CabinSchema = BasicCreateCabinSchema.merge(
  z.object({
    id: z.number(),
    createdAt: z.date(),
  }),
);

export const CreateCabinSchema = BasicCreateCabinSchema.refine(
  (data) => {
    return data.regularPrice >= data.discount;
  },
  {
    message: "Discount must be less than or equal to the Regular Price",
    path: ["discount"],
  },
);

export type TCreateCabinType = z.infer<typeof CreateCabinSchema>;

export type TCabinType = z.infer<typeof CabinSchema>;

export type UpdateCabinType = {
  id?: number;
  createdAt?: Date;
  name?: string;
  maxCapacity?: number;
  regularPrice?: number;
  discount?: number;
  description?: string;
  image?: string | FileList | File;
};
