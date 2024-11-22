import { redirect } from "next/navigation";
import { db } from "@/lib/db";
import { RegisterForm } from "@/components/auth/register-form";

export default async function InvitationRegisterPage({
  params,
}: {
  params: { token: string };
}) {
  // Verify invitation token
  const invitation = await db.execute(
    `SELECT * FROM invitations 
     WHERE token = $1 
     AND expires_at > NOW() 
     AND accepted = false`,
    [params.token]
  );

  if (!invitation.rows[0]) {
    redirect("/register");
  }

  return (
    <div className="container flex h-screen w-screen flex-col items-center justify-center">
      <div className="mx-auto flex w-full flex-col justify-center space-y-6 sm:w-[350px]">
        <div className="flex flex-col space-y-2 text-center">
          <h1 className="text-2xl font-semibold tracking-tight">
            Complete your registration
          </h1>
          <p className="text-sm text-muted-foreground">
            Create your account to access the property management system
          </p>
        </div>
        <RegisterForm invitationToken={params.token} />
      </div>
    </div>
  );
}