import { NextResponse } from "next/server";
import { getServerSession } from "next-auth/next";
import { authOptions } from "@/app/api/auth/[...nextauth]/route";
import { db } from "@/lib/db";
import { posts } from "@/lib/db/schema";
import { nanoid } from "nanoid";

export async function GET(
  req: Request,
  { params }: { params: { propertyId: string } }
) {
  try {
    const session = await getServerSession(authOptions);
    const { propertyId } = params;

    const propertyPosts = await db.query.posts.findMany({
      where: (posts, { eq }) => eq(posts.propertyId, propertyId),
      with: {
        author: true,
        likes: true,
        comments: true,
      },
      orderBy: (posts, { desc }) => [desc(posts.createdAt)],
    });

    const postsWithCounts = propertyPosts.map((post) => ({
      ...post,
      _count: {
        likes: post.likes.length,
        comments: post.comments.length,
      },
      liked: session ? post.likes.some((like) => like.userId === session.user.id) : false,
    }));

    return NextResponse.json(postsWithCounts);
  } catch (error) {
    console.error("Error fetching posts:", error);
    return new NextResponse("Internal error", { status: 500 });
  }
}

export async function POST(
  req: Request,
  { params }: { params: { propertyId: string } }
) {
  try {
    const session = await getServerSession(authOptions);
    if (!session) {
      return new NextResponse("Unauthorized", { status: 401 });
    }

    const { propertyId } = params;
    const { content } = await req.json();

    const post = await db.insert(posts).values({
      id: nanoid(),
      content,
      authorId: session.user.id,
      propertyId,
    }).returning();

    return NextResponse.json(post[0]);
  } catch (error) {
    console.error("Error creating post:", error);
    return new NextResponse("Internal error", { status: 500 });
  }
}