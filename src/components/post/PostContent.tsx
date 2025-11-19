
import PostCard from "./PostCard";
import usePostContext from "../../hooks/usePostContext";
import type { Post } from "../../types";

interface PostContentProps {
  posts?: Post[]; 
  post?: Post | null; 
  loading?: boolean;
  error?: string | null;
}

export default function PostContent({posts: postsProp, post, loading: loadingProp, error: errorProp,}: PostContentProps) {
  const {searchQuery, reactToPost, replyPanelOpen, posts: contextPosts,       
    loading: contextLoading,    
    error: contextError, } = usePostContext();

    const finalPosts = postsProp ?? contextPosts;
  const finalLoading = loadingProp ?? contextLoading;
  const finalError = errorProp ?? contextError;

 if (finalLoading) {
    return (
      <p className="text-center mt-5 text-emerald-500">Loading article(s)...</p>
    );
  }

  if (finalError) {
    return <p className="text-center mt-5 text-red-500">{finalError}</p>;
  }
  if (post) {
    return (
      <div className="max-w-4xl mx-auto p-4 sm:p-6">
        <PostCard
          key={post.id}
          post={post}
          onLikeToggle={reactToPost}
        />
      </div>
    );
  }

  //  Article List View (for /announcement)
  const filteredPosts = (finalPosts || []).filter((item) => {
    const query = searchQuery.toLowerCase();
    const titleMatch = item.title.toLowerCase().includes(query);
    const textMatch = item.text?.toLowerCase().includes(query);
    return titleMatch || textMatch;
  });

  if (!filteredPosts.length && searchQuery) {
    return (
      <p className="text-center mt-5 text-blue-400">
        No articles found matching "{searchQuery}".
      </p>
    );
  }

  if (!filteredPosts.length) {
    return <p className="text-center mt-5">No articles found.</p>;
  }

  return (
    <div className="w-full">
      <div className="max-w-9xl mx-auto p-0 sm:p-4 md:p-8">
     
        <div className="space-y-6">
          {filteredPosts.map((item) => (
            <PostCard
              key={item.id}
              post={item}
              onLikeToggle={reactToPost}
            />
          ))}
        </div>
      </div>

      {/* Footer */}
      <div
        className={`relative flex justify-center  transition-all duration-300 ${
          replyPanelOpen ? "md:w-[90%]" : "w-full"
        } mx-auto`}
      >
        <div className="bg-slate-700/90 backdrop-blur-md text-white py-2 px-2 md:p-4 text-center rounded md:rounded-lg shadow-2xl w-full">
          <p className="text-xs sm:text-sm font-medium">
            Only certain people can send messages to this channel
          </p>
        </div>
      </div>
    </div>
  );
}
