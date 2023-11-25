import { Model, Schema, model } from 'mongoose';
import { IAddress, IOrder, IUser } from './user.interface';
import { hashPassword } from '../../utils';

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

interface UserModel extends Model<IUser> {
  // get user document by id or email
  // eslint-disable-next-line no-unused-vars
  getUserIfExists(key: number | string): Promise<IUser | null>;
}

const userSchema = new Schema<IUser, UserModel>({
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

userSchema.statics.getUserIfExists = async function (key: string | number) {
  let query;

  if (typeof key === 'number') {
    query = { userId: key };
  } else {
    query = { username: key };
  }

  return await User.findOne(query);
};

userSchema.pre('save', async function () {
  if (this.password) {
    this.password = await hashPassword(this.password);
  }
});

export const User = model<IUser, UserModel>('User', userSchema);
