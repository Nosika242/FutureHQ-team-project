
import { MessageSquare, ChevronRight } from "lucide-react";
import { useState } from "react";
import usePostContext from "../../hooks/usePostContext";
import type { Post } from "../../types";

interface   PostActionProps {
  post: Post;
  handleViewReplies: (post: Post) => void;
}
export default function PostAction({ post, handleViewReplies,}: PostActionProps) {
  const { fetchCommentCount } = usePostContext();
  const [commentCount, setCommentCount] = useState<number>(0);

  const handleFetchCommentCount = async () => {
    try {
      const count = await fetchCommentCount(post.id);
      setCommentCount(count);
      handleViewReplies(post);
    } catch (error) {
      console.error("Failed to fetch comment count:", error);
    }
  };

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 items-center gap-3 sm:gap-0 text-sm pt-0 sm:pt-3">
      {/* Replies count */}
      <button
        onClick={handleFetchCommentCount}
        className="flex items-center gap-1 sm:gap-2 text-blue-600 hover:text-blue-800 transition-colors focus:outline-none font-semibold justify-start sm:justify-start"
        aria-label={`View ${commentCount} replies`}
      >
        <MessageSquare size={14} />
        <span className="text-xs sm:text-sm">{commentCount} Replies</span>
      </button>

      <div className="flex flex-wrap sm:flex-nowrap items-center gap-2 sm:gap-3 justify-between sm:justify-end text-gray-500 text-xs sm:text-sm">
        <button
          onClick={handleFetchCommentCount}
          className="hover:underline text-[#4F5E71] font-medium text-sm hover:text-gray-600 hover:bg-[#9fe6dc] px-2 sm:px-3 py-1 rounded-lg transition-colors flex items-center gap-1"
        >
          View Replies
          <ChevronRight size={16} />
        </button>
      </div>
    </div>
  );
}
