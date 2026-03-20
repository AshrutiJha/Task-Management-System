import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

const JWT_SECRET = process.env.JWT_SECRET!;

// REGISTER
export const registerUser = async (data: any) => {
  const { email, password } = data;

  // check user exists
  const existing = await prisma.user.findUnique({ where: { email } });
  if (existing) throw new Error("User already exists");

  // hash password
  const hashedPassword = await bcrypt.hash(password, 10);

  // create user
  const user = await prisma.user.create({
    data: {
      email,
      password: hashedPassword,
    },
  });

  return { message: "User registered successfully" };
};

// LOGIN
export const loginUser = async (data: any) => {
  const { email, password } = data;

  const user = await prisma.user.findUnique({ where: { email } });
  if (!user) throw new Error("Invalid credentials");

  const isMatch = await bcrypt.compare(password, user.password);
  if (!isMatch) throw new Error("Invalid credentials");

  // generate token
  const accessToken = jwt.sign(
  { userId: user.id },
  JWT_SECRET,
  { expiresIn: "15m" }
);

const refreshToken = jwt.sign(
  { userId: user.id },
  JWT_SECRET,
  { expiresIn: "7d" }
);

return { accessToken, refreshToken };
};

export const refreshTokenService = (token: string) => {
  try {
    const decoded: any = jwt.verify(token, JWT_SECRET);

    const newAccessToken = jwt.sign(
      { userId: decoded.userId },
      JWT_SECRET,
      { expiresIn: "15m" }
    );

    return { accessToken: newAccessToken };
  } catch {
    throw new Error("Invalid refresh token");
  }
};
