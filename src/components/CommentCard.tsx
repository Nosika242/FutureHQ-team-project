import React from "react";
import CommentDropdown from "./CommentDropdown";

interface CommentUser {
  id: number;
  fullname: string;
  avatar: string;
}

interface Comment {
  id: number;
  content: string;
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
            {/* <h3>{comment.user.fullname} </h3> */}
            <h3>Ogbonna Mitchel</h3>
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
          {comment.content}
        </h2>
      </div>
      <h2>{comment.created_at}</h2>
    </div>
  );
};

export default CommentCard;
