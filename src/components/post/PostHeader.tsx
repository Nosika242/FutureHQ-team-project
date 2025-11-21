import { Heart, Share2, Reply } from "lucide-react";
import type { Post } from "../../types";
import usePostContext from "../../hooks/usePostContext";

interface PostHeaderProps {
  post: Post;
  isLiked: boolean;
  likeCount: number;
  handleLikeToggle: () => void;
  DateTime: (dateString: string) => string;
}

export default function PostHeader({
  isLiked,
  likeCount,
  post,
  handleLikeToggle,
  DateTime,
}: PostHeaderProps) {
  const { user } = usePostContext();

  const author = post.author || {
    fullname: user?.fullname,
    username: user?.username,
    avatar: user?.avatar || "/assets/profile-default.png",
  };

  return (
    <div className="flex justify-between items-start mb-4">
      <div className="flex items-center gap-2">
        <img
          src={author.avatar || "/assets/profile-default.png"}
          alt={author.fullname || author.username || "User"}
          className="w-10 h-10 md:w-14 md:h-14 rounded-full object-cover"
        />

        <div>
          <h4 className="font-semibold text-[#000000] text-sm sm:text-base">
            {author.fullname || author.username || "Unknown Author"}
          </h4>
          <p className="text-sm text-[#697D95]">
            {DateTime(post.created_at || "")}
          </p>
        </div>
      </div>

      <div className="flex sm:justify-end items-center gap-3 flex-wrap text-gray-500 pt-1">
        <button
          onClick={handleLikeToggle}
          className={`flex items-center gap-1 cursor-pointer transition-colors ${
            isLiked ? "text-green-500" : "text-gray-500"
          } hover:text-green-500`}
        >
          <Heart
            size={20}
            className={isLiked ? "fill-[#00A58E] text-[#00A58E]" : ""}
          />
          <span className="text-xs sm:text-sm text-[#00A58E] hover:text-[#7ccec3]">
            {likeCount} Reactions
          </span>
        </button>

        {/* Reply Button */}
        <button
          aria-label="Reply"
          className="p-1 rounded-full hover:bg-gray-100 transition-colors lg:block hidden"
        >
          <Reply size={20} className="cursor-pointer hover:text-[#00A58E]" />
        </button>

        {/* Share Button */}
        <button
          aria-label="Share"
          className="p-1 rounded-full text-gray-400 hover:bg-gray-100 hover:text-emerald-500 transition-colors hidden lg:block"
        >
          <Share2 size={18} />
        </button>
      </div>
    </div>
  );
}
