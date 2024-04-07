import z from "zod";

export const userSchema = z.object({
  id: z.number(),
  username: z.string(),
  email: z.string(),
  role_type: z.string(),
  profilePic: z.string(),
  access: z.string().nullable().optional(),
});

export const slotSchema = z.object({
  id: z.number(),
  status: z.string(),
  price: z.number(),
  address: z.string(),
  description: z.string(),
  type: z.string(),
  picture: z.string(),
  rating: z.number(),
});
export const slotsSchema = z.array(slotSchema);

export const secretSchema = z.object({
  access: z.string(),
  refresh: z.string(),
});

export const bookingSchema = z.object({
  booking_id: z.number(),
  duration_minutes: z.number(),
  total_price: z.number(),
  payment_url: z.string(),
});

export const bookingSlotSchema = z.object({
  start_time: z.string(),
  end_time: z.string(),
});
export const bookingSlotsSchema = z.array(bookingSlotSchema);

const rateSchema = z.object({
  booking_id: z.number(),
  rating: z.number(),
});

export const bookedSlotSchema = z.object({
  id: z.number(),
  slot_id: z.number(),
  parking_address: z.string(),
  parking_coordinate: z.string().nullable(),
  vehicle_type: z.string(),
  start_time: z.string(),
  end_time: z.string(),
  duration_minutes: z.number(),
  total_price: z.number(),
  booked: z.boolean(),
  is_paid: z.boolean(),
  status: z.string(),
  rating: z.number().nullable().optional(),
});
export const bookedSlotsSchema = z.array(bookedSlotSchema);

export type User = z.infer<typeof userSchema>;
export type Slot = z.infer<typeof slotSchema>;
export type Secret = z.infer<typeof secretSchema>;
export type Booking = z.infer<typeof bookingSchema>;
export type BookingSlot = z.infer<typeof bookingSlotSchema>;
export type BookingSlots = z.infer<typeof bookingSlotsSchema>;
export type Rate = z.infer<typeof rateSchema>;
export type BookedSlot = z.infer<typeof bookedSlotSchema>;
