import { X } from "lucide-react";
import usePostContext from "../../hooks/usePostContext";

export function OpenPanelHeader() {
  const { closeReplyPanel } = usePostContext();

  const handleClose = () => {
    closeReplyPanel();
  };

  return (
    <div className="p-4 border-b border-[#F5F7F9] flex justify-between items-center sticky top-0 bg-white">
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

