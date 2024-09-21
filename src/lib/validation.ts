import z from 'zod'

const requiredString = z.string().trim().min(1,"Required");
const today = new Date();
today.setHours(0, 0, 0, 0);

export const signUpSchema = z.object({
    email : requiredString.email("Invalid Email Address"),
    username:requiredString.regex(
        /^[a-zA-Z0-9_-]+$/,
        "Only letters, numbers, - and _ allowed",
    ).max(7),
    password:requiredString.min(10,"Must be at least 10 characters")
})

export type SignUpValues = z.infer<typeof signUpSchema>;

export const loginSchema= z.object({
    username:requiredString,
    password:requiredString.min(10,"Must be at least 10 characters")
})

export type LoginValues = z.infer<typeof loginSchema>;

export const createTaskSchema= z.object({
    title:requiredString,
    description:requiredString,
    deadline:z.coerce.date().refine(
        (date) => date >= today,
        { message: "Deadline must be today or in the future" }
      )
 })
    
export type createTaskValues = z.infer<typeof createTaskSchema>;
