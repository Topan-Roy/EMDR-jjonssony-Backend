import { z } from 'zod';

export const updateProfileSchema = z.object({
  body: z.object({
    fullName: z
      .string({ required_error: 'Full name is required' })
      .min(2, 'Full name must be at least 2 characters')
      .max(61, 'Full name cannot exceed 61 characters')
      .regex(/^[a-zA-Z\s]+$/, 'Full name can only contain letters and spaces')
      .trim(),
    phoneNumber: z
      .string()
      .trim()
      .regex(/^\+?[1-9]\d{6,14}$/, 'Invalid phone number format. Example: +8801712345678')
      .optional(),
  }),
});
