import { z } from "zod";

export const formSchema = z.object({
  title: z.string().min(3).max(100),
  description: z.string().min(10).max(500),
  category: z.string().min(3).max(30),
  link: z
    .string()
    .url()
    .refine((url) => /\.(jpg|jpeg|png|gif|webp)$/i.test(url), {
    message: "URL must point to an image",
  }),
    pitch: z.string().min(10),
});