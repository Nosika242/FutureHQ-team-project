
import * as React from "react";
import { DateTime } from "../utilis/DateTime";
import usePostContext from "../../hooks/usePostContext";
import type { Post } from "../../types";

interface PostViewCardProps {
  post: Post | null;
}

export function PostViewCard({ post }: PostViewCardProps): React.JSX.Element | null {
  const { user } = usePostContext();
  if (!post) return null; 

  return (
    <div className="border-b border-[#E8EDF1] pb-6 p-4">
      <div className="flex items-center gap-2 mb-2 ">
        <img
          src={post.image || user?.avatar || "/assets/profile-default.png"}
          alt={post.title}
          className="w-14 h-14 rounded-full object-cover"
        />
        <div>
          <h4 className="text-md font-semibold text-gray-800">
            {post.author?.fullname || "Unknown Author"}
          </h4>
          <p className="text-sm text-[#697D95]">
            {DateTime(post.created_at)}
          </p>
        </div>
      </div>

      <h4 className="text-base font-bold text-[#4F5E71] mb-1">{post.title}</h4>
      <p className="text-base text-[#4F5E71] ">{post.text}</p>
    </div>
  );
}
