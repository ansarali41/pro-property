import { NextResponse } from "next/server";
import { getServerSession } from "next-auth/next";
import { authOptions } from "@/app/api/auth/[...nextauth]/route";
import { db } from "@/lib/db";
import { likes } from "@/lib/db/schema";
import { nanoid } from "nanoid";
import { and, eq } from "drizzle-orm";

export async function POST(
  req: Request,
  { params }: { params: { postId: string } }
) {
  try {
    const session = await getServerSession(authOptions);
    if (!session) {
      return new NextResponse("Unauthorized", { status: 401 });
    }

    const { postId } = params;

    const like = await db.insert(likes).values({
      id: nanoid(),
      postId,
      userId: session.user.id,
    }).returning();

    return NextResponse.json(like[0]);
  } catch (error) {
    console.error("Error creating like:", error);
    return new NextResponse("Internal error", { status: 500 });
  }
}

export async function DELETE(
  req: Request,
  { params }: { params: { postId: string } }
) {
  try {
    const session = await getServerSession(authOptions);
    if (!session) {
      return new NextResponse("Unauthorized", { status: 401 });
    }

    const { postId } = params;

    await db.delete(likes).where(
      and(
        eq(likes.postId, postId),
        eq(likes.userId, session.user.id)
      )
    );

    return new NextResponse(null, { status: 204 });
  } catch (error) {
    console.error("Error deleting like:", error);
    return new NextResponse("Internal error", { status: 500 });
  }
}