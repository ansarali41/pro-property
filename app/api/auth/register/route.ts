import { hash } from "bcryptjs";
import { NextResponse } from "next/server";
import { db } from "@/lib/db";
import { users } from "@/lib/db/schema";
import { z } from "zod";
import { nanoid } from "nanoid";

const registerSchema = z.object({
  name: z.string().min(2),
  email: z.string().email(),
  password: z.string().min(8),
  role: z.enum(["OWNER", "TENANT"]),
});

export async function POST(req: Request) {
  try {
    const json = await req.json();
    const body = registerSchema.parse(json);

    const exists = await db.query.users.findFirst({
      where: eq(users.email, body.email),
    });

    if (exists) {
      return new NextResponse("User already exists", { status: 400 });
    }

    const hashedPassword = await hash(body.password, 10);

    const user = await db.insert(users).values({
      id: nanoid(),
      name: body.name,
      email: body.email,
      password: hashedPassword,
      role: body.role,
    }).returning();

    const { password: _, ...result } = user[0];
    return NextResponse.json(result);
  } catch (error) {
    if (error instanceof z.ZodError) {
      return new NextResponse("Invalid request data", { status: 422 });
    }

    return new NextResponse("Internal error", { status: 500 });
  }
}