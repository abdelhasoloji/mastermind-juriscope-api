import jwt from "jsonwebtoken";

export function verifySupabaseJwt(authHeader?: string) {
  if (!authHeader?.startsWith("Bearer ")) {
    throw new Error("Missing Authorization header");
  }

  const token = authHeader.replace("Bearer ", "");

  const payload = jwt.verify(
    token,
    process.env.SUPABASE_JWT_SECRET as string
  ) as any;

  return payload.sub as string;
}
