import { z } from "zod";

// Contact form schema
export const contactSchema = z.object({
  name: z
    .string()
    .min(2, "Name must be at least 2 characters")
    .max(200, "Name is too long")
    .regex(/^[a-zA-Z\s\-'.]+$/, "Name contains invalid characters"),
  email: z
    .string()
    .email("Please enter a valid email address")
    .max(200, "Email is too long"),
  phone: z
    .string()
    .optional()
    .refine(
      (val) => !val || /^(\+254|0)[17]\d{8}$/.test(val.replace(/\s/g, "")),
      "Phone must be a valid Kenyan number (07XX XXX XXX)"
    ),
  subject: z.string().min(1, "Please select a subject"),
  message: z
    .string()
    .min(10, "Message must be at least 10 characters")
    .max(5000, "Message is too long")
    .refine(
      (val) => !/<script|javascript:|onerror=/i.test(val),
      "Message contains invalid content"
    ),
});

// Help request schema
export const helpRequestSchema = z.object({
  name: z.string().max(200, "Name is too long").optional().or(z.literal("")),
  age: z
    .string()
    .min(1, "Please enter your age")
    .refine((val) => {
      const num = parseInt(val);
      return !isNaN(num) && num >= 13 && num <= 100;
    }, "Age must be between 13 and 100"),
  substance: z.string().min(1, "Please select a substance"),
  urgency: z.enum(["emergency", "urgent", "moderate"]),
  phone: z
    .string()
    .min(1, "Phone number is required")
    .refine(
      (val) => /^(\+254|0)[17]\d{8}$/.test(val.replace(/\s/g, "")),
      "Phone must be a valid Kenyan number (07XX XXX XXX)"
    ),
  location: z.string().max(200, "Location is too long").optional().or(z.literal("")),
  consent: z.literal(true, {
    errorMap: () => ({ message: "You must consent to submit" }),
  }),
});

// Donation schema
export const donationSchema = z.object({
  amount: z
    .number()
    .min(50, "Minimum donation is KSh 50")
    .max(10000000, "Amount is too large"),
  frequency: z.enum(["one-time", "monthly"]),
  purpose: z.enum(["general", "food", "medicine", "outreach"]),
  donorName: z
    .string()
    .min(2, "Name must be at least 2 characters")
    .max(200, "Name is too long"),
  donorEmail: z.string().email("Please enter a valid email address"),
  donorPhone: z
    .string()
    .optional()
    .refine(
      (val) => !val || /^(\+254|0)[17]\d{8}$/.test(val.replace(/\s/g, "")),
      "Phone must be a valid Kenyan number"
    ),
});
