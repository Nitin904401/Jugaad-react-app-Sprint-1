import jwt from "jsonwebtoken";

const getJWTSecret = () => {
  const secret = process.env.JWT_SECRET;
  if (!secret) {
    throw new Error("JWT_SECRET not defined");
  }
  return secret;
};

export const signToken = (payload: { id: string; role: string }) => {
  return jwt.sign(payload, getJWTSecret(), { expiresIn: "7d" });
};

export const verifyToken = (token: string) => {
  return jwt.verify(token, getJWTSecret());
};
