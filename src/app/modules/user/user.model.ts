import { Schema, model } from 'mongoose';
import { IAddress, IOrder, IUser } from './user.interface';

const addressSchema = new Schema<IAddress>({
  street: { type: String, required: true },
  city: { type: String, required: true },
  country: { type: String, required: true },
});

const orderSchema = new Schema<IOrder>({
  productName: { type: String, required: true },
  price: { type: Number, required: true },
  quantity: { type: Number, required: true },
});

const userSchema = new Schema<IUser>({
  userId: {
    type: Number,
    required: [true, 'this is required'],
    unique: true,
  },
  username: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  fullName: {
    firstName: { type: String, required: true },
    lastName: { type: String, required: true },
  },
  age: { type: Number },
  email: { type: String, required: true },
  isActive: { type: Boolean, required: true },
  hobbies: { type: [String] },
  address: addressSchema,
  orders: {
    type: [orderSchema],
  },
});

export const User = model<IUser>('User', userSchema);
