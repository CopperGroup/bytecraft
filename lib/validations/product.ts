import * as z from "zod";

export const ProductValidation = z.object({
    id: z.string().min(1, { message: "Product requires a custom id." }),
    name: z.string().min(3, { message: "Minimum 3 characters." }),
    price: z.string(),
    priceToShow: z.string(),
    description: z.string().min(3, { message: "Minimum 3 characters." }),
    url: z.string().optional(),
    articleNumber: z.string().optional(),
    quantity: z.string(),
    category: z.array(z.string().min(1, "At least one category is required")),
    vendor: z.string().optional(),
    isAvailable: z.boolean().optional(),
    customParams: z.array(z.object({
        name: z.string().min(1, { message: "Custom parameter name is required." }),
        value: z.string().min(1, { message: "Custom parameter value is required." })
    })).optional()
})