"use client";

import { useState } from "react";
import { useSession } from "next-auth/react";
import { formatDistanceToNow } from "date-fns";
import { Heart, MessageCircle, MoreVertical } from "lucide-react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardFooter, CardHeader } from "@/components/ui/card";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Comments } from "@/components/community/comments";
import { useToast } from "@/components/ui/use-toast";

interface PostProps {
  post: {
    id: string;
    content: string;
    author: {
      id: string;
      name: string;
      image?: string;
    };
    createdAt: string;
    _count: {
      likes: number;
      comments: number;
    };
    liked: boolean;
  };
}

export function Post({ post }: PostProps) {
  const { data: session } = useSession();
  const [showComments, setShowComments] = useState(false);
  const [likeCount, setLikeCount] = useState(post._count.likes);
  const [isLiked, setIsLiked] = useState(post.liked);
  const { toast } = useToast();

  const handleLike = async () => {
    if (!session) {
      toast({
        title: "Please sign in",
        description: "You need to be signed in to like posts",
      });
      return;
    }

    try {
      const response = await fetch(`/api/posts/${post.id}/like`, {
        method: isLiked ? "DELETE" : "POST",
      });

      if (!response.ok) throw new Error();

      setIsLiked(!isLiked);
      setLikeCount(isLiked ? likeCount - 1 : likeCount + 1);
    } catch (error) {
      toast({
        variant: "destructive",
        title: "Error",
        description: "Failed to update like",
      });
    }
  };

  const handleDelete = async () => {
    try {
      const response = await fetch(`/api/posts/${post.id}`, {
        method: "DELETE",
      });

      if (!response.ok) throw new Error();

      toast({
        title: "Success",
        description: "Post deleted successfully",
      });
    } catch (error) {
      toast({
        variant: "destructive",
        title: "Error",
        description: "Failed to delete post",
      });
    }
  };

  return (
    <Card>
      <CardHeader className="flex flex-row items-start justify-between space-y-0">
        <div className="flex items-center space-x-4">
          <Avatar>
            <AvatarImage src={post.author.image} />
            <AvatarFallback>
              {post.author.name?.charAt(0).toUpperCase()}
            </AvatarFallback>
          </Avatar>
          <div>
            <p className="font-semibold">{post.author.name}</p>
            <p className="text-sm text-muted-foreground">
              {formatDistanceToNow(new Date(post.createdAt), { addSuffix: true })}
            </p>
          </div>
        </div>
        {session?.user?.id === post.author.id && (
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" size="icon">
                <MoreVertical className="h-4 w-4" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              <DropdownMenuItem onClick={handleDelete} className="text-red-600">
                Delete
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        )}
      </CardHeader>
      <CardContent>
        <p className="whitespace-pre-wrap">{post.content}</p>
      </CardContent>
      <CardFooter className="flex justify-between">
        <div className="flex space-x-4">
          <Button
            variant="ghost"
            size="sm"
            className="space-x-2"
            onClick={handleLike}
          >
            <Heart
              className={`h-4 w-4 ${isLiked ? "fill-red-500 text-red-500" : ""}`}
            />
            <span>{likeCount}</span>
          </Button>
          <Button
            variant="ghost"
            size="sm"
            className="space-x-2"
            onClick={() => setShowComments(!showComments)}
          >
            <MessageCircle className="h-4 w-4" />
            <span>{post._count.comments}</span>
          </Button>
        </div>
      </CardFooter>
      {showComments && <Comments postId={post.id} />}
    </Card>
  );
}