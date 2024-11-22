import { getServerSession } from "next-auth/next";
import { authOptions } from "@/app/api/auth/[...nextauth]/route";
import { redirect } from "next/navigation";
import { db } from "@/lib/db";
import { CommunityFeed } from "@/components/community/community-feed";
import { CreatePost } from "@/components/community/create-post";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

export default async function DashboardCommunityPage() {
  const session = await getServerSession(authOptions);

  if (!session) {
    redirect("/login");
  }

  // Get the user's associated property ID
  let propertyId: string | null = null;

  if (session.user.role === "OWNER") {
    const property = await db.query.properties.findFirst({
      where: (properties, { eq }) => eq(properties.ownerId, session.user.id),
    });
    propertyId = property?.id || null;
  } else if (session.user.role === "TENANT") {
    const property = await db.query.properties.findFirst({
      where: (properties, { eq }) => eq(properties.tenantId, session.user.id),
    });
    propertyId = property?.id || null;
  }

  if (!propertyId) {
    return (
      <div className="container py-8">
        <h1 className="text-3xl font-bold mb-4">Community</h1>
        <p className="text-muted-foreground">
          No property associated with your account.
        </p>
      </div>
    );
  }

  return (
    <div className="container space-y-6">
      <h1 className="text-3xl font-bold">Community</h1>
      
      <Card>
        <CardHeader>
          <CardTitle>Create a Post</CardTitle>
        </CardHeader>
        <CardContent>
          <CreatePost propertyId={propertyId} />
        </CardContent>
      </Card>

      <CommunityFeed propertyId={propertyId} />
    </div>
  );
}