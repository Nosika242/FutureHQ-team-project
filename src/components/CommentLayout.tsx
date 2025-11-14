// import React from 'react'

// import CommentSection from "./CommentSection";
import Close from "../assets/images/close.png";

export default function CommentLayout() {
  return (
    <div className="w-80">
      <div className="flex sticky justify-between">
        <h1>General Announcement</h1>
        <img src={Close} alt="close icon" />
      </div>
      <div>
        {/* <CommentSection /> */}
      </div>
    </div>
  );
}
