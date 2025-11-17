
import { X } from "lucide-react";
import usePostContext from "../../hooks/usePostContext";
// import { useNavigate, useParams } from "react-router-dom";

export function OpenPanelHeader() {
  const { closeReplyPanel } = usePostContext();
  // const navigate = useNavigate();
 

  const handleClose = () => {
    closeReplyPanel();
    // navigate(`/announcements/${channel || "general"}`);
  };

  return (
    <div className="p-4 border-b border-gray-200 flex justify-between items-center sticky top-0 bg-white">
      <h3 className="text-lg font-bold text-gray-900">General Announcements</h3>
      <button
        onClick={handleClose}
        className="text-gray-500 hover:text-gray-700 p-1 rounded-full hover:bg-gray-100 transition"
      >
        <X size={24} />
      </button>
    </div>
  );
}
