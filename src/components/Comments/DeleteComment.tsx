import React, { useState } from "react";
import axios from "axios";

interface Props {
  articleId: number;
  commentId: number;
  onDeleteComplete: (id: number) => void;
  onClose: () => void;
}

const CommentDelete: React.FC<Props> = ({
  articleId,
  commentId,
  onDeleteComplete,
  onClose,
}) => {
  const [loading, setLoading] = useState(false);

  const handleDelete = async () => {
    setLoading(true);
    try {
      await axios.delete(
        `https://titusukpono.pythonanywhere.com/articles/${articleId}/comments/${commentId}/`
      );
      onDeleteComplete(commentId);
      onClose();
    } catch (error) {
      console.error("Error deleting comment:", error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-30 flex justify-center items-center z-50">
      <div className="bg-white p-5 rounded-lg w-[90%] max-w-sm shadow-md text-center">
        <p className="text-gray-700 mb-4">
          Are you sure you want to delete this comment?
        </p>
        <div className="flex justify-center gap-3">
          <button
            onClick={onClose}
            className="px-4 py-1 text-gray-600 hover:bg-gray-100 rounded-md"
          >
            Cancel
          </button>
          <button
            onClick={handleDelete}
            disabled={loading}
            className="px-4 py-1 bg-red-500 text-white rounded-md disabled:opacity-60"
          >
            {loading ? "Deleting..." : "Delete"}
          </button>
        </div>
      </div>
    </div>
  );
};

export default CommentDelete;
