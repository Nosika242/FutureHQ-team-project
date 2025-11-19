import { useState, useCallback, useEffect } from "react";
import axiosInstance from "../services/axiosInstance";
import type { ApiError } from "../services/axiosInstance";
import type { Post, ArticleListResponse } from "../types";

interface UsePostsReturn {
  posts: Post[];
  selectedPost: Post | null;
  loading: boolean;
  error: string | null;
  fetchPosts: () => Promise<void>;
  fetchPostById: (id: number) => Promise<Post | null>;
  reactToPost: (articleId: number) => Promise<void>;
  fetchCommentCount: (articleId: number) => Promise<number>;
  updatePosts: React.Dispatch<React.SetStateAction<Post[]>>;
  selectPost: React.Dispatch<React.SetStateAction<Post | null>>;
}

export default function usePostApi(): UsePostsReturn {
  const [posts, setPosts] = useState<Post[]>([]);
  const [selectedPost, setSelectedPost] = useState<Post | null>(null);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (error) {
      const timer = setTimeout(() => setError(null), 4000);
      return () => clearTimeout(timer);
    }
  }, [error]);

  const fetchPosts = useCallback(async () => {
    setLoading(true);
    setError(null);
    try {
      console.log("Calling API...");
      const res = await axiosInstance.get<ArticleListResponse>("/articles/");
      const postsWithDefaultReaction = res.data.results.map((post) => ({
        ...post,
        has_reacted: post.has_reacted ?? false,
      }));

      setPosts(postsWithDefaultReaction || []);
    } catch (err) {
      const error = err as ApiError;
      setError(error.message);
    } finally {
      setLoading(false);
    }
  }, []);

  const fetchPostById = useCallback(
    async (id: number): Promise<Post | null> => {
      setLoading(true);
      setError(null);
      try {
        const res = await axiosInstance.get<Post>(`/articles/${id}`);
        setSelectedPost(res.data);
        return res.data;
      } catch (err) {
        const error = err as ApiError;
        setError(error.message);
        return null;
      } finally {
        setLoading(false);
      }
    },
    []
  );

  const reactToPost = useCallback(async (articleId: number): Promise<void> => {
    try {
      await axiosInstance.post(`/articles/${articleId}/reaction`, {
        article: articleId,
      });
      setPosts((prev) =>
        prev.map((a) =>
          a.id === articleId
            ? {
                ...a,
                has_reacted: !a.has_reacted,
                reaction: a.has_reacted
                  ? Math.max(0, a.reaction - 1)
                  : a.reaction + 1,
              }
            : a
        )
      );
    } catch (err) {
      const error = err as ApiError;
      setError(error.message);
    }
  }, []);

  const fetchCommentCount = useCallback(
    async (articleId: number): Promise<number> => {
      try {
        const response = await axiosInstance.get(
          `/articles/${articleId}/comments/`
        );
        return response.data.count || 0;
      } catch (err) {
        const error = err as ApiError;
        setError(error.message);
        return 0;
      }
    },
    []
  );

  useEffect(() => {
    fetchPosts();
  }, [fetchPosts]);

  return {
    posts,
    selectedPost,
    loading,
    error,
    fetchPosts,
    fetchPostById,
    reactToPost,
    fetchCommentCount,
    updatePosts: setPosts,
    selectPost: setSelectedPost,
  };
}
