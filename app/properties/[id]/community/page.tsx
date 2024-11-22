import { getServerSession } from "next-auth/next";
import { authOptions } from "@/app/api/auth/[...nextauth]/route";
import { CommunityFeed } from "@/components/community/community-feed";
import { CreatePost } from "@/components/community/create-post";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

export default async function PropertyCommunityPage({
  params,
}: {
  params: { id: string };
}) {
  const session = await getServerSession(authOptions);

  return (
    <div className="container py-8 space-y-6">
      <h1 className="text-3xl font-bold">Community</h1>
      
      {session && (
        <Card>
          <CardHeader>
            <CardTitle>Create a Post</CardTitle>
          </CardHeader>
          <CardContent>
            <CreatePost propertyId={params.id} />
          </CardContent>
        </Card>
      )}

      <CommunityFeed propertyId={params.id} />
    </div>
  );
}