import React, { useState, useEffect, useRef, } from "react";
import type { FormEvent } from "react";
import AddCircle from "../../assets/images/add_circle.png";
import TextFormat from "../../assets/images/text_format.png";
import Emoji from "../../assets/images/sentiment_satisfied_alt.png";
import AtSign from "../../assets/images/at-sign.png";
import VoiceChat from "../../assets/images/voice_chat.png";
import Keyboard from "../../assets/images/keyboard_voice.png";
import Send from "../../assets/images/Frame 234.png";

interface CommentTextareaProps {
  loading: boolean;
  initialText?: string;
  onSubmit: (text: string) => Promise<void> | void;
  isEditing: boolean;
}

const CommentTextarea: React.FC<CommentTextareaProps> = ({
  loading,
  initialText = "",
  onSubmit,
  isEditing = false,
}) => {
  const [text, setText] = useState(initialText);
  const textareaRef = useRef<HTMLTextAreaElement | null>(null);

  useEffect(() => {
    if (isEditing && textareaRef.current) {
      textareaRef.current.focus();
      textareaRef.current.scrollIntoView({
        behavior: "smooth",
        block: "center",
      });
    }
  }, [isEditing]);

  useEffect(() => {
    setText(initialText);
  }, [initialText]);

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    if (!text.trim()) return;
    await onSubmit(text);
    if (!isEditing) setText("");
  };

  return (
    <form onSubmit={handleSubmit} className="p-2 bg-white border rounded-md">
      <div>
        <textarea
          ref={textareaRef}
          value={text}
          onChange={(e) => setText(e.target.value)}
          placeholder="Reply..."
          rows={1}
          className="flex-1 w-full bg-transparent outline-none resize-none text-sm px-1 no-scrollbar text-black"
        />
        <div className="flex items-center justify-between ">
          <div className="flex gap-2 items-center">
            <img src={AddCircle} alt="" />
            <img src={TextFormat} alt="" />
            <img src={Emoji} alt="" />
            <img src={AtSign} alt="" />
            <img src={VoiceChat} alt="" />
            <img src={Keyboard} alt="" />
          </div>
          <button type="submit" disabled={loading} className="outline-0">
            <img src={Send} alt="Send button" />
          </button>
        </div>
      </div>
    </form>
  );
};

export default CommentTextarea;
