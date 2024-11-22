import { NextResponse } from "next/server";
import { getServerSession } from "next-auth/next";
import { authOptions } from "@/app/api/auth/[...nextauth]/route";
import { db } from "@/lib/db";
import { comments } from "@/lib/db/schema";
import { nanoid } from "nanoid";

export async function GET(
  req: Request,
  { params }: { params: { postId: string } }
) {
  try {
    const { postId } = params;

    const postComments = await db.query.comments.findMany({
      where: (comments, { eq }) => eq(comments.postId, postId),
      with: {
        author: true,
      },
      orderBy: (comments, { desc }) => [desc(comments.createdAt)],
    });

    return NextResponse.json(postComments);
  } catch (error) {
    console.error("Error fetching comments:", error);
    return new NextResponse("Internal error", { status: 500 });
  }
}

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
    const { content } = await req.json();

    const comment = await db.insert(comments).values({
      id: nanoid(),
      content,
      postId,
      authorId: session.user.id,
    }).returning();

    return NextResponse.json(comment[0]);
  } catch (error) {
    console.error("Error creating comment:", error);
    return new NextResponse("Internal error", { status: 500 });
  }
}