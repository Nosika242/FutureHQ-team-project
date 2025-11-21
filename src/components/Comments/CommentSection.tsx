
"use client";
import React, { useState } from "react";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import CommentCard from "./CommentCard";
import CommentTextarea from "./TextArea";

interface Comment {
  id: number;
  text: string;
  user: { id: number; fullname: string; avatar: string };
  created_at: string;
}

interface Props {
  articleId: number;
}

const CommentSection: React.FC<Props> = ({ articleId }) => {
  const queryClient = useQueryClient();

  const [editingId, setEditingId] = useState<number | null>(null);
  const [editingText, setEditingText] = useState("");

  // Fetch Comments
  const { data: comments = [] } = useQuery<Comment[]>({
    queryKey: ["comments", articleId],
    queryFn: async () => {
      const res = await fetch(
        `https://titusukpono.pythonanywhere.com/articles/${articleId}/comments/`
      );
      const data = await res.json();
      return Array.isArray(data) ? data : data.results || [];
    },
  });

  // Add new comment
  const addMutation = useMutation({
    mutationFn: async (text: string) => {
      const res = await fetch(
        `https://titusukpono.pythonanywhere.com/articles/${articleId}/comments/`,
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ text }),
        }
      );
      return res.json();
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["comments", articleId] });
    },
  });

  // Edit comment
  const editMutation = useMutation({
    mutationFn: async ({ id, text }: { id: number; text: string }) => {
      const res = await fetch(
        `https://titusukpono.pythonanywhere.com/articles/${articleId}/comments/${id}/`,
        {
          method: "PATCH",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ text }),
        }
      );
      return res.json();
    },
    onSuccess: () => {
      setEditingId(null);
      setEditingText("");
      queryClient.invalidateQueries({ queryKey: ["comments", articleId] });
    },
  });

  // Delete comment
  const deleteMutation = useMutation({
    mutationFn: async (id: number) => {
      await fetch(
        `https://titusukpono.pythonanywhere.com/articles/${articleId}/comments/${id}/`,
        { method: "DELETE" }
      );
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["comments", articleId] });
    },
  });

  // Submit (Add or Edit)
  const handleSubmit = async (text: string) => {
    if (editingId !== null) {
      return editMutation.mutateAsync({ id: editingId, text });
    }
    return addMutation.mutateAsync(text);
  };

  // Start editing
  const handleEdit = (comment: Comment) => {
    setEditingId(comment.id);
    setEditingText(comment.text);
  };

  // Delete handler
  const handleDelete = (id: number) => {
    deleteMutation.mutate(id);
  };

  return (
    <div className="w-full flex flex-col bg-white h-full">
      <h2 className="font-semibold text-sm mb-4">
        Comments ({comments.length})
      </h2>

      <div>
        {comments.map((comment) => (
          <CommentCard
            key={comment.id}
            comment={comment}
            articleId={articleId}
            onEdit={() => handleEdit(comment)}
            onDelete={() => handleDelete(comment.id)}
          />
        ))}
      </div>

      <div className="sticky bottom-0 bg-white">
        <CommentTextarea
          loading={addMutation.isPending || editMutation.isPending}
          isEditing={editingId !== null}
          initialText={editingText}
          onSubmit={handleSubmit}
        />
      </div>
    </div>
  );
};

export default CommentSection;
