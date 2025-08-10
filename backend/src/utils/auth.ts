import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

const ADMIN_PASSWORD_HASH = process.env.ADMIN_PASSWORD_HASH!;
const JWT_SECRET = process.env.JWT_SECRET!;
const JWT_EXPIRATION = process.env.JWT_EXPIRATION || "1h";


export async function verifyAdminPassword(password: string): Promise<boolean> {
  const hash = process.env.ADMIN_PASSWORD_HASH;
  if (!hash) throw new Error("ADMIN_PASSWORD_HASH env variable is not set");
  return bcrypt.compare(password, hash);
}



export async function generateJWT(): Promise<string> {
  const secret = process.env.JWT_SECRET;
  if (!secret) throw new Error("JWT_SECRET env variable is not set");

  return new Promise((resolve, reject) => {
    jwt.sign(
      { isAdmin: true },
      secret,
      { expiresIn: process.env.JWT_EXPIRATION as any || "1h" },
      (err, token) => {
        if (err || !token) reject(err);
        else resolve(token);
      }
    );
  });
}


export function verifyJWT(token: string): { isAdmin: boolean } | null {
  try {
    return jwt.verify(token, JWT_SECRET) as { isAdmin: boolean };
  } catch (error) {
    return null;
  }
}
