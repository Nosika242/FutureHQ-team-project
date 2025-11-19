import React from "react";
import CommentDropdown from "./CommentDropdown";
import Avatar from "../../assets/images/Avatar.png"

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
    <div className="p-1 mb-2">
      <div className="flex justify-between ">
        <div className="flex items-center gap-3 ">
          <img
            src={comment.user.avatar || Avatar}
            alt="user avatar"
          />
            <h3 className="font-bold text-black text-sm">{comment.user.fullname} </h3>
          
        </div>
        <div>
          <CommentDropdown
            onEdit={() => onEdit(comment.id)}
            onDelete={() => onDelete(comment.id)}
          />
          
        </div>
      </div>
      <div>
        <h2 className="text-xs text-[#4F5E71] font-medium py-4 ">
          {comment.text}
        </h2>
      </div>
      <h2 className="text-xs text-[#4A617C] font-medium" > {new Date(comment.created_at).toLocaleString()}</h2>
    </div>
  );
};

export default CommentCard;
