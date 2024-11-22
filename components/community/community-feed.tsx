"use client";

import { useQuery } from "@tanstack/react-query";
import { Post } from "@/components/community/post";
import { Skeleton } from "@/components/ui/skeleton";

interface CommunityFeedProps {
  propertyId: string;
}

export function CommunityFeed({ propertyId }: CommunityFeedProps) {
  const { data: posts, isLoading } = useQuery({
    queryKey: ["posts", propertyId],
    queryFn: async () => {
      const response = await fetch(`/api/properties/${propertyId}/posts`);
      if (!response.ok) throw new Error("Failed to fetch posts");
      return response.json();
    },
  });

  if (isLoading) {
    return (
      <div className="space-y-4">
        {[...Array(3)].map((_, i) => (
          <div key={i} className="space-y-3">
            <div className="flex items-center space-x-4">
              <Skeleton className="h-12 w-12 rounded-full" />
              <div className="space-y-2">
                <Skeleton className="h-4 w-[250px]" />
                <Skeleton className="h-4 w-[200px]" />
              </div>
            </div>
            <Skeleton className="h-24 w-full" />
          </div>
        ))}
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {posts?.map((post: any) => (
        <Post key={post.id} post={post} />
      ))}
    </div>
  );
}