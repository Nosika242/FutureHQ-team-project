import React from "react";
import CommentSection from "../components/Comments/CommentSection";

interface CommentLayoutProps {
  articleId: number;
}

const CommentLayout: React.FC<CommentLayoutProps> = ({ articleId }) => {
  return (
    <div className="w-80">
      <CommentSection articleId={29} />
    </div>
  );
};

export default CommentLayout;
