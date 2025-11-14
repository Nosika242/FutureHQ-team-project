// "use client";
// import React from "react";
// import CommentDropdown from "./CommentDropdown";
// // import Reaction from "./Reactions";

// interface CommentUser {
//   id: number;
//   fullname: string;
//   avatar: string;
// }

// interface Comment {
//   id: number;
//   content: string;
//   user: CommentUser;
//   created_at: string;
// }

// interface Props {
//   comment: Comment;
//   articleId: number;
//   onEdit: (id: number) => void;
//   onDelete: (id: number) => void;
// }

// const CommentCard: React.FC<Props> = ({ comment, articleId, onEdit, onDelete }) => {
//   return (
//     <div className="gap-3 border-b pb-3">
//       <div className="flex items-start gap-3">
//         <img
//           src={comment.user.avatar || "/assets/images/Avatar.png"}
//           alt={comment.user.fullname}
//           className="w-8 h-8 rounded-full object-cover"
//         />
//         <div className="flex-1">
//           <div className="flex justify-between items-start">
//             <div>
//               <h4 className="font-medium text-black">{comment.user.fullname}</h4>
//               <p className="text-xs text-gray-400">{comment.created_at}</p>
//             </div>
//             <div className="flex items-center gap-2">
//               <CommentDropdown onEdit={() => onEdit(comment.id)} onDelete={() => onDelete(comment.id)} />
//               <Reaction />
//             </div>
//           </div>
//           <p className="text-gray-700 mt-1">{comment.content}</p>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default CommentCard;
