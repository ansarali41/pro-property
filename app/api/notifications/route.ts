import { NextResponse } from "next/server";
import { getServerSession } from "next-auth/next";
import { authOptions } from "@/app/api/auth/[...nextauth]/route";
import { db } from "@/lib/db";

export async function GET(req: Request) {
  try {
    const session = await getServerSession(authOptions);
    if (!session) {
      return new NextResponse("Unauthorized", { status: 401 });
    }

    const notifications = await db.execute(
      `SELECT * FROM notifications 
       WHERE user_id = $1 
       ORDER BY created_at DESC 
       LIMIT 20`,
      [session.user.id]
    );

    return NextResponse.json(notifications.rows);
  } catch (error) {
    console.error("Error fetching notifications:", error);
    return new NextResponse("Internal error", { status: 500 });
  }
}