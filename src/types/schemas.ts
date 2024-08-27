import { z } from "zod";

export const loginSchema = z.object({
  email: z.string().trim().min(1, { message: "Email required!" }),
  // .email({ message: "Invalid email!" }),
  password: z
    .string()
    .trim()
    .min(1, { message: "Password required!" })
    .min(8, { message: "Password must have at least 8 characters!" }),
});

export const checkoutSchema = z.object({
  email: z.string().email({ message: "Invalid email address" }),
  firstName: z.string().min(1, { message: "First Name is required" }),
  lastName: z.string().min(1, { message: "Last Name is required" }),
  address: z.string().min(1, { message: "Address is required" }),
  apartment: z.string().optional(),
  city: z.string().min(1, { message: "City is required" }),
  postalCode: z.string().optional(),
});
