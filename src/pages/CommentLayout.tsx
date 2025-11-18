import React from "react";
import CommentSection from "../components/Comments/CommentSection";
// import Close from "../assets/images/close.png";

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
