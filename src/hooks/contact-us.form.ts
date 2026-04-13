import { createFormHook } from "@tanstack/react-form";
import { TextInput, Textarea } from "@mantine/core";
import { Button } from "@heroui/react";
import { fieldContext, formContext } from "./contact-us.form-context";
import * as z from "zod";

export const { useAppForm } = createFormHook({
  fieldComponents: {
    TextInput,
    Textarea,
  },
  formComponents: {
    Button,
  },
  fieldContext,
  formContext,
});

export const contactFormSchema = z.object({
  name: z.string().min(2),
  email: z.email(),
  orderNumber: z.string().min(10).max(10).or(z.literal("")),
  description: z.string().min(5),
});
