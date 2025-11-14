
import { createContext, useState } from "react";
import usePostApi from "../hooks/usePostApi";
import type { Post, User } from "../types";
import type { ReactNode } from "react";

export interface PostContextType {
  user: User | null;
  searchQuery: string;
  setSearchQueryState: (query: string) => void;
  replyPanelOpen: boolean;
  selectedPost: Post | null;
  openReplyPanel: (post: Post) => void;
  closeReplyPanel: () => void;
  posts: Post[];
  loading: boolean;
  error: string | null;
  fetchPosts: () => Promise<void>;
  fetchPostById: (id: number) => Promise<Post | null>;
  reactToPost: (articleId: number) => Promise<void>;
  fetchCommentCount: (articleId: number) => Promise<number>;
  updatePosts: React.Dispatch<React.SetStateAction<Post[]>>;
  selectPost: React.Dispatch<React.SetStateAction<Post | null>>;
  setUser: React.Dispatch<React.SetStateAction<User | null>>;
}

// Default placeholder context
const defaultContext: PostContextType = {
   user: null,
  setUser: () => {},
  searchQuery: "",
  setSearchQueryState: () => {},
  replyPanelOpen: false,
  selectedPost: null,
  openReplyPanel: () => {},
  closeReplyPanel: () => {},
  posts: [],
  loading: false,
  error: null,
  fetchPosts: async () => {},
  fetchPostById: async () => null,
  reactToPost: async () => {},
  fetchCommentCount: async () => 0,
  updatePosts: () => {},
  selectPost: () => {},
};

export const PostContext = createContext<PostContextType>(defaultContext);
interface PostProviderProps {
  children: ReactNode;
}

export function PostProvider({ children }: PostProviderProps) {
  const {
    posts,
    selectedPost: hookSelectedPost,
    selectPost,
    updatePosts,
    loading,
    error,
    fetchPosts,
    fetchPostById,
    reactToPost,
    fetchCommentCount,
  } = usePostApi();

  const [replyPanelOpen, setReplyPanelOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [user, setUser] = useState<User | null>(null);

  const setSearchQueryState = (query: string) => setSearchQuery(query);

  const openReplyPanel = (post: Post) => {
    selectPost(post);
    setReplyPanelOpen(true);
  };

  const closeReplyPanel = () => {
    setReplyPanelOpen(false);
    selectPost(null);
  };

  const contextValue: PostContextType = {
     user,
    setUser,
    searchQuery,
    setSearchQueryState,
    replyPanelOpen,
    selectedPost: hookSelectedPost,
    openReplyPanel,
    closeReplyPanel,
    posts,
    loading,
    error,
    fetchPosts,
    fetchPostById,
    reactToPost,
    fetchCommentCount,
    updatePosts,
    selectPost,
  };

  return (
    <PostContext.Provider value={contextValue}>
      {children}
    </PostContext.Provider>
  );
}