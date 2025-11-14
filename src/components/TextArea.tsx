import React, { useState, useEffect, useRef, FormEvent } from "react";

interface CommentTextareaProps {
  loading: boolean;
  initialText?: string;
  onSubmit: (text: string) => Promise<void> | void;
  isEditing?: boolean;
}

const CommentTextarea: React.FC<CommentTextareaProps> = ({
  loading,
  initialText = "",
  onSubmit,
  isEditing = false,
}) => {
  const [text, setText] = useState(initialText);
  const textareaRef = useRef<HTMLTextAreaElement | null>(null);

  // Autofocus and scroll into view when editing
  useEffect(() => {
    if (isEditing && textareaRef.current) {
      textareaRef.current.focus();
      textareaRef.current.scrollIntoView({ behavior: "smooth", block: "center" });
    }
  }, [isEditing]);

  // Update textarea content when switching edit targets
  useEffect(() => {
    setText(initialText);
  }, [initialText]);

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    if (!text.trim()) return;
    await onSubmit(text);
    if (!isEditing) setText(""); // clear only for new comments
  };

  return (
    <form onSubmit={handleSubmit} className="p-4 border-t bg-white">
      <textarea
        ref={textareaRef}
        value={text}
        onChange={(e) => setText(e.target.value)}
        placeholder={isEditing ? "Edit your comment..." : "Write a comment..."}
        rows={3}
        className="w-full border rounded-md p-2 text-sm focus:ring-2 focus:ring-[#00A58E] outline-none resize-none transition-all duration-200"
      />
      <div className="flex justify-end mt-2 gap-2">
        <button
          type="submit"
          disabled={loading}
          className={`px-4 py-2 rounded-md text-white ${
            loading
              ? "bg-[#00A58E]/70 cursor-not-allowed"
              : "bg-[#00A58E] hover:bg-[#008f7b]"
          } transition`}
        >
          {loading ? "Sending..." : isEditing ? "Update" : "Send"}
        </button>
      </div>
    </form>
  );
};

export default CommentTextarea;
