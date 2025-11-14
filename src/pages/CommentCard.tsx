import React from "react";
import CommentDropdown from "../components/CommentDropdown";

interface CommentUser {
  id: number;
  fullname: string;
  avatar: string;
}

interface Comment {
  id: number;
  text: string;
  user: CommentUser;
  created_at: string;
}

interface Props {
  comment: Comment;
  articleId: number;
  onEdit: (comment: Comment) => void;
  onDelete: (id: number) => void;
}
const CommentCard: React.FC<Props> = ({
  comment,
  articleId,
  onEdit,
  onDelete,
}) => {
  return (
    <div>
      <div>
        <div>
          <img
            src={
              comment.user.avatar ||
              "./../assets/images/Avatar profile photo.png"
            }
            alt="user avatar"
          />
          <div>
            <h3>{comment.user.fullname} </h3>
          </div>
        </div>
        <div>
          <CommentDropdown
            onEdit={() => onEdit(comment)}
            onDelete={() => onDelete(comment.id)}
          />
        </div>
      </div>
      <div>
        <h2>{comment.text}</h2>
      </div>
      <h2>{comment.created_at}</h2>
    </div>
  );
};

export default CommentCard;
