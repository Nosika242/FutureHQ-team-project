import { MessageSquare, ChevronRight } from "lucide-react";
import { useState, useEffect } from "react";
import usePostContext from "../../hooks/usePostContext";
import type { Post } from "../../types";
import EditPost from "../PostNextActions/EditPost";
import DeletePost from "../PostNextActions/DeletePost";

interface PostActionProps {
  post: Post;
  handleViewReplies: (post: Post) => void;
}

export default function PostAction({
  post,
  handleViewReplies,
}: PostActionProps) {
  const { fetchCommentCount } = usePostContext();
  const [commentCount, setCommentCount] = useState<number>(0);

  useEffect(() => {
    const loadCommentCount = async () => {
      try {
        const count = await fetchCommentCount(post.id);
        setCommentCount(count);
      } catch (error) {
        console.error("Failed to fetch comment count:", error);
      }
    };
    loadCommentCount();
  }, [post.id, fetchCommentCount]);

  return (
    <div className="flex items-center justify-between gap-2 text-sm pt-2 w-full flex-nowrap">
      <button
        onClick={() => handleViewReplies(post)}
        className="flex items-center gap-1 text-blue-600 hover:text-blue-800 transition-colors font-semibold"
        aria-label={`View ${commentCount} replies`}
      >
        <MessageSquare size={14} className="hover:bg-[#9fe6dc]" />
        <span className="text-xs sm:text-sm">{commentCount} Replies</span>
      </button>

      <div className="flex items-center gap-3 flex-nowrap">
        <DeletePost post={post} />
        <EditPost post={post} />

        <button
          onClick={() => handleViewReplies(post)}
          className="hover:underline text-[#4F5E71] font-medium text-sm hover:text-gray-600 hover:bg-[#9fe6dc] px-2 sm:px-3 py-1 rounded-lg transition-colors flex items-center gap-1"
        >
          View Replies
          <ChevronRight size={16} />
        </button>
      </div>
    </div>
  );
}
