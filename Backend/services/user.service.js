import { UserModel } from "../models/user.model.js";

export const createUser = async ({ firstName, lastName, email, password }) => {
  if (!firstName || !lastName || !email || !password) {
    throw new Error("All fields are required");
  }
  const user = UserModel.create({
    fullName: {
      firstName,
      lastName,
    },
    email,
    password: await UserModel.hashPassword(password),
  });
  return user;
};
