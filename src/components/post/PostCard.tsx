import { useState, useEffect } from "react";
// import { useNavigate } from "react-router-dom";
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
  // const navigate = useNavigate();

  const [isLiked, setIsLiked] = useState(post.has_reacted || false);
  const [likeCount, setLikeCount] = useState(post.reaction || 0);

  useEffect(() => {
    setIsLiked(post.has_reacted || false);
    setLikeCount(post.reaction || 0);
  }, [post.has_reacted, post.reaction]);

  const handleOpenReplies = () => {
    // navigate(`/announcements/${post.id}`);
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
    <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-100 hover:shadow-md transition-all duration-300">
      <PostHeader
        post={post}
        isLiked={isLiked}
        likeCount={likeCount}
        handleLikeToggle={handleLikeToggle}
        DateTime={DateTime}
      />

      <div className="mt-3">
        <PostAction post={post} 
        handleViewReplies={handleOpenReplies}
         />
      </div>
    </div>
  );
}
