import { NextResponse } from "next/server";
import { getServerSession } from "next-auth/next";
import { authOptions } from "@/app/api/auth/[...nextauth]/route";
import { db } from "@/lib/db";
import { nanoid } from "nanoid";
import { sendEmail } from "@/lib/email";

export async function POST(req: Request) {
  try {
    const session = await getServerSession(authOptions);
    if (!session || session.user.role !== "OWNER") {
      return new NextResponse("Unauthorized", { status: 401 });
    }

    const { email, role, propertyId } = await req.json();
    const invitationToken = nanoid();

    // Create invitation record
    await db.execute(
      `INSERT INTO invitations (id, email, role, property_id, token, expires_at)
       VALUES ($1, $2, $3, $4, $5, NOW() + INTERVAL '7 days')`,
      [nanoid(), email, role, propertyId, invitationToken]
    );

    // Send invitation email
    await sendEmail({
      to: email,
      subject: "Invitation to PropertyPro",
      template: "invitation",
      variables: {
        inviteLink: `${process.env.NEXT_PUBLIC_APP_URL}/register?token=${invitationToken}`,
        role: role.toLowerCase(),
        expiresIn: "7 days"
      }
    });

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("Error creating invitation:", error);
    return new NextResponse("Internal error", { status: 500 });
  }
}