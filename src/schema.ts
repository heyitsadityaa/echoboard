import { object, string } from "zod";

export const signUpSchema = object({
  email: string({ required_error: "Email is required" }).email("Invalid email"),
  password: string({ required_error: "pasword is required" })
    .min(8, "Minimum length 8 required")
    .max(32, "Max length 32"),
});
export const signInSchema = object({
  email: string({ required_error: "Email is required" }).email("Invalid email"),
  password: string({ required_error: "password is required" }),
});
