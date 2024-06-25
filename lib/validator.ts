
import { z } from "zod"

export const productFormSchema = z.object({
    name: z.string().min(3, "Title must be at least 3 characters."),
    description: z.string().max(400, "Description must be at less than 400 characters."),
    price: z.string(),
    photo: z.string(),
    colorFrom: z.string(),
    colorTo: z.string(),
    clarityFrom: z.string(),
    clarityTo: z.string(),
    cut: z.string(),
    fluorescence: z.string(),
    shape: z.string(),
    certificate: z.string(),
})
