import z from "zod";

const userSchema = z.object({
  name: z.string(),
  email: z.string(),
  profile: z.string().nullable().optional(),
});

export type User = z.infer<typeof userSchema>;
