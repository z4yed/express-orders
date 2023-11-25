import { z } from 'zod';

const orderStoreValidation = z.object({
  productName: z.string().min(1),
  price: z.number().min(1),
  quantity: z.number().min(1),
});

export default orderStoreValidation;
