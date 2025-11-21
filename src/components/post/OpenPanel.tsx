import usePostContext from "../../hooks/usePostContext";
import { PostViewCard } from "./PostViewCard";
import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import type { Post } from "../../types";
import { OpenPanelHeader } from "./OpenPanelHeader";
import CommentSection from "../Comments/CommentSection";

export default function OpenPanel() {
  const { id } = useParams<{ id: string }>();
  const {
    selectedPost,
    fetchPostById,
    loading: contextLoading,
    error: contextError,
  } = usePostContext();
  const [fullArticle, setFullArticle] = useState<Post | null>(null);

  useEffect(() => {
    if (!id) return;
    const postId = parseInt(id, 10);
    if (isNaN(postId)) return;
    const loadFullArticle = async () => {
      setFullArticle(null);
      const data = await fetchPostById(postId);
      if (data) {
        setFullArticle(data);
      }
    };
    loadFullArticle();
    return () => setFullArticle(null);
  }, [id, fetchPostById]);

  const postToDisplay = fullArticle || selectedPost;

  if (contextLoading) {
    return (
      <div className="p-8 text-center text-gray-500">Loading article...</div>
    );
  }

  if (contextError) {
    return (
      <div className="p-8 text-center text-red-500">Error: {contextError}</div>
    );
  }

  if (!postToDisplay) {
    return (
      <div className="p-8 text-center text-gray-500">
        No article selected or found.
      </div>
    );
  }

  return (
    <div className="w-full bg-white h-full  flex flex-col shadow-2xl z-50 transition-transform duration-300 border-l border-[#F5F7F9]">
      <OpenPanelHeader />

      <div className="flex-1 overflow-y-auto space-y-4">
        
        <PostViewCard post={postToDisplay} />
      
        <CommentSection articleId={postToDisplay.id} />
      </div>
    </div>
  );
}

