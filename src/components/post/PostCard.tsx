import { useState, useEffect } from "react";
import { DateTime } from "../utilis/DateTime";
import PostHeader from "./PostHeader";
import PostAction from "./PostAction";
import usePostContext from "../../hooks/usePostContext";
import type { Post } from "../../types";

interface PostCardProps {
  post: Post;
  onLikeToggle: (id: number) => Promise<void>;
}

export default function PostCard({ post, onLikeToggle }: PostCardProps) {
  const { openReplyPanel } = usePostContext();

  const [isLiked, setIsLiked] = useState(post.has_reacted || false);
  const [likeCount, setLikeCount] = useState(post.reaction || 0);

  useEffect(() => {
    setIsLiked(post.has_reacted || false);
    setLikeCount(post.reaction || 0);
  }, [post.has_reacted, post.reaction]);

  const handleOpenReplies = () => {
    openReplyPanel(post);
  };

  const handleLikeToggle = async () => {
    const newLikedState = !isLiked;
    setIsLiked(newLikedState);
    setLikeCount((prev) => (newLikedState ? prev + 1 : Math.max(0, prev - 1)));
    try {
      await onLikeToggle(post.id);
    } catch (err) {
      console.error("Like failed:", err);
      setIsLiked(!newLikedState);
      setLikeCount((prev) =>
        newLikedState ? Math.max(0, prev - 1) : prev + 1
      );
    }
  };

  return (
    <div className="bg-white rounded-lg p-6 shadow-sm border border-[#E8EDF1] hover:shadow-md transition-all duration-300">
      <PostHeader
        post={post}
        isLiked={isLiked}
        likeCount={likeCount}
        handleLikeToggle={handleLikeToggle}
        DateTime={DateTime}
      />

      <div className="mt-3">
        <h3 className="text-lg font-bold text-[#252A31] mb-1">{post.title}</h3>
        <p className="text-lg text-[#4F5E71] mb-4">
          {post.text?.slice(0, 400)}...
        </p>

        {post.image && (
          <img
            src={post.image}
            alt={post.title}
            className="w-full rounded-xl object-cover shadow-sm max-h-[250px]"
          />
        )}
        <PostAction post={post} handleViewReplies={handleOpenReplies} />
      </div>
    </div>
  );
}
