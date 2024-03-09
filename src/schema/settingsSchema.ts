import z from "zod";

export const UpdateSettingsSchema = z.object({
  minBookingLength: z.coerce.number().optional(),
  maxBookingLength: z.coerce.number().optional(),
  maxGuestsPerBooking: z.coerce.number().optional(),
  breakfastPrice: z.coerce.number().optional(),
});

export const SettingsSchema = UpdateSettingsSchema.merge(
  z.object({
    id: z.number(),
    createdAt: z.date(),
  }),
);

export type TUpdateSettingType = z.infer<typeof UpdateSettingsSchema>;
export type TSettingsType = z.infer<typeof SettingsSchema>;
