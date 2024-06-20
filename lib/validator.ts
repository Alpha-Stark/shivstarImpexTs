
import { z } from "zod"

export const productFormSchema = z.object({
    name: z.string().min(3, "Title must be at least 3 characters."),
    description: z.string().max(400, "Description must be at less than 400 characters."),
    price: z.string(),
    stock: z.string(),
    photo: z.string(),
    colorFrom: z.string(),
    colorTo: z.string(),
    clarityFrom: z.string(),
    clarityTo: z.string(),
    cut: z.string(),
    carat: z.string(),
    shape: z.string(),
    certificate: z.string(),
})

/* export const eventFormSchema = z.object({
    title: z.string().min(3, "Title must be at least 3 characters."),
    description: z.string().min(3, "Description must be at least 3 characters.").max(400, "Description must be at less than 400 characters."),
    location: z.string().min(3, "Location must be at least 3 characters.").max(400, "Location must be at less than 400 characters."),
    imageUrl: z.string(),
    startDateTime: z.date(),
    endDateTime: z.date(),
    categoryId: z.string(),
    price: z.string(),
    isFree: z.boolean(),
    url: z.string().url(),
}) */