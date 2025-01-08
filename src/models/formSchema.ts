import * as z from "zod";

export const formSchema = z.object({
  productTitle: z.string().trim().min(2, {
    message: "Product title is required, must have at least 2 characters",
  }),
  description: z.string(),
  productStatus: z.union([z.string(), z.null(), z.undefined()]),
  productBulletsPoints: z.array(z.object({ bulletPoint: z.string() })),
});

export type FormData = z.infer<typeof formSchema>;
