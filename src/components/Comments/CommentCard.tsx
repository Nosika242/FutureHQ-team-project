import React from "react";
import CommentDropdown from "./CommentDropdown";
import Avatar from "../../assets/images/Avatar profile photo.png"

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
  onEdit: (id: number) => void;
  onDelete: (id: number) => void;
}
const CommentCard: React.FC<Props> = ({
  comment,
  onEdit,
  onDelete,
}) => {
  return (
    <div className="p-4">
      <div className="flex justify-between">
        <div className="flex ">
          <img
            src={comment.user.avatar || Avatar}
            alt="user avatar"
          />
          <div>
            <h3>{comment.user.fullname} </h3>
          </div>
        </div>
        <div>
          <CommentDropdown
            onEdit={() => onEdit(comment.id)}
            onDelete={() => onDelete(comment.id)}
          />
          
        </div>
      </div>
      <div>
        <h2>
          {comment.text}
        </h2>
      </div>
      <h2> {new Date(comment.created_at).toLocaleString()}</h2>
    </div>
  );
};

export default CommentCard;
