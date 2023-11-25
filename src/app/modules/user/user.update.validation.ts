import { z } from 'zod';

const addressValidationSchema = z
  .object({
    street: z.string().min(1),
    city: z.string().min(1),
    country: z.string().min(1),
  })
  .optional();

const userUpdateValidationSchema = z.object({
  userId: z.number().optional(),
  username: z.string().optional(),
  password: z.string().optional(),
  fullName: z
    .object({
      firstName: z.string().min(1),
      lastName: z.string().min(1),
    })
    .optional(),
  age: z.number().optional(),
  email: z.string().email().optional(),
  isActive: z.boolean().optional(),
  hobbies: z.string().array().optional(),

  address: addressValidationSchema,
});

export default userUpdateValidationSchema;
