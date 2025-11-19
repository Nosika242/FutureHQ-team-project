import React, { useState } from "react";
import axios from "axios";

interface Comment {
  id: number;
  content: string;
}

interface Props {
  articleId: number;
  comment: Comment;
  onEditComplete: (updated: Comment) => void;
  onClose: () => void;
}

const CommentEdit: React.FC<Props> = ({
  articleId,
  comment,
  onEditComplete,
  onClose,
}) => {
  const [newText, setNewText] = useState(comment.content);
  const [loading, setLoading] = useState(false);

  const handleEdit = async () => {
    if (!newText.trim()) return;
    setLoading(true);
    try {
      const res = await axios.patch(
        `https://titusukpono.pythonanywhere.com/articles/${articleId}/comments/${comment.id}/`,
        { content: newText }
      );
      onEditComplete(res.data);
      onClose();
    } catch (error) {
      console.error("Error editing comment:", error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-30 flex justify-center items-center z-50">
      <div className="bg-white p-5 rounded-lg w-[90%] max-w-md shadow-md">
        <h3 className="font-semibold text-gray-700 mb-2">Edit Comment</h3>
        <textarea
          value={newText}
          onChange={(e) => setNewText(e.target.value)}
          rows={3}
          className="w-full border rounded-md p-2 text-sm focus:ring-2 focus:ring-[#00A58E] outline-none"
        />
        <div className="flex justify-end gap-3 mt-3">
          <button
            onClick={onClose}
            className="text-gray-500 px-3 py-1 rounded-md hover:bg-gray-100"
          >
            Cancel
          </button>
          <button
            onClick={handleEdit}
            disabled={loading}
            className="bg-[#00A58E] text-white px-4 py-1 rounded-md disabled:opacity-60"
          >
            {loading ? "Saving..." : "Save"}
          </button>
        </div>
      </div>
    </div>
  );
};

export default CommentEdit;
