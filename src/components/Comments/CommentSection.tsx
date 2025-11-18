import React, { useState, useEffect } from "react";
import CommentCard from "./CommentCard";
import CommentTextarea from "./TextArea";
import axios from "axios";

interface Comment {
  id: number;
  text: string;
  user: { id: number; fullname: string; avatar: string };
  created_at: string;
}

interface Props {
  articleId: number;
  onClose?: () => void;
}

const CommentSection: React.FC<Props> = ({ articleId }) => {
  const [comments, setComments] = useState<Comment[]>([]);
  const [loading, setLoading] = useState(false);
  const [editingCommentId, setEditingCommentId] = useState<number | null>(null);
  const [editingCommentText, setEditingCommentText] = useState("");

  // Fetch comments
  const fetchComments = async () => {
    try {
      const res = await axios.get(
        `https://titusukpono.pythonanywhere.com/articles/${articleId}/comments/`
      );
      const data = res.data;
      setComments(Array.isArray(data) ? data : data.results || []);
    } catch (error) {
      console.error("Error fetching comments:", error);
    }
  };

  useEffect(() => {
    fetchComments();
  }, [articleId]);

  // Handle new or edited comment submission
  const handleSubmit = async (text: string) => {
    if (!text.trim()) return;
    setLoading(true);
    try {
      const url = editingCommentId
        ? `https://titusukpono.pythonanywhere.com/articles/${articleId}/comments/${editingCommentId}/`
        : `https://titusukpono.pythonanywhere.com/articles/${articleId}/comments/`;

      const method = editingCommentId ? "PATCH" : "POST";

      const res = await axios({
        url,
        method,
        headers: { "Content-Type": "application/json" },
        data: { text },
      });

      const newComment = res.data;

      if (editingCommentId) {
        setComments((prev) =>
          prev.map((c) => (c.id === editingCommentId ? newComment : c))
        );
      } else {
        setComments((prev) => [newComment, ...prev]);
      }

      // Reset editing
      setEditingCommentId(null);
      setEditingCommentText("");
    } catch (error) {
      console.error("Error submitting comment:", error);
    } finally {
      setLoading(false);
    }
  };

  // Set edit mode
  const handleEdit = (commentId: number) => {
    const comment = comments.find((c) => c.id === commentId);
    if (!comment) return;
    setEditingCommentId(commentId);
    setEditingCommentText(comment.text);
  };

  // Delete comment
  const handleDelete = async (commentId: number) => {
    try {
      await axios.delete(
        `https://titusukpono.pythonanywhere.com/articles/${articleId}/comments/${commentId}/`
      );
      setComments((prev) => prev.filter((c) => c.id !== commentId));
    } catch (error) {
      console.error("Error deleting comment:", error);
    }
  };

  return (
    <div className="w-full md:w-[400px] bg-white border-l h-full flex flex-col">
      {/* Header */}
      <div className="p-4 border-b flex justify-between items-center">
        <h2 className="font-semibold text-gray-800 text-lg">
          Comments ({comments.length})
        </h2>
      </div>

      {/* Comments List */}
      <div className="flex-1 overflow-y-auto p-4 space-y-4">
        {comments.length === 0 ? (
          <p className="text-gray-400 text-sm text-center">
            No comments yet. Be the first to comment!
          </p>
        ) : (
          comments.map((comment) => (
            <CommentCard
              key={comment.id}
              comment={comment}
              articleId={articleId}
              onEdit={() => handleEdit(comment.id)}
              onDelete={() => handleDelete(comment.id)}
            />
          ))
        )}
      </div>

      {/* Comment Textarea */}
      <CommentTextarea
        loading={loading}
        isEditing={!!editingCommentId}
        initialText={editingCommentText}
        onSubmit={handleSubmit}
      />
    </div>
  );
};

export default CommentSection;
