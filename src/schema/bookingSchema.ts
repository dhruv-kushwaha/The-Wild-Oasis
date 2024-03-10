import z from "zod";

export const BookingSchema = z.object({
  id: z.number(),
  createdAt: z.date().or(z.string()),

  startDate: z.date().or(z.string()),
  endDate: z.date().or(z.string()),
  numNights: z.number(),
  numGuests: z.number(),
  status: z.enum(["checkedIn", "unconfirmed", "checkedOut"]),
  totalPrice: z.number(),
  cabin: z.object({
    name: z.string(),
  }),
  guest: z.object({
    fullName: z.string(),
    email: z.string().email(),
  }),
});

export type TBookingType = z.infer<typeof BookingSchema>;
export type TBookingTypeArray = TBookingType[];
