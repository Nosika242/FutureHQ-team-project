import React from "react";
import { useParams } from "react-router-dom";
import PostContent from "../components/post/PostContent";
import OpenPanel from "../components/post/OpenPanel";
import usePostContext from "../hooks/usePostContext";

export default function PostPage(): React.JSX.Element {
  const { id } = useParams<Record<string, string | undefined>>();
  const { replyPanelOpen } = usePostContext();

  const isPanelOpen = id || replyPanelOpen;

  return (
    <section className="h-full min-h-screen md:h-[calc(100vh-80px)] flex flex-col z-50 transition-transform duration-300 w-full">
      <div className="flex relative flex-1 overflow-hidden">
        {/* 1. Main Content Area */}
        <div
          className={`flex-1 ${
            isPanelOpen
              ? "md:flex-1 px-0 pt-0 md:px-6 md:pt-12"
              : "xl:px-30 lg:px-6 md:px-5 md:pt-12 px-4 pt-6"   
          } h-full bg-[#F5F7F9]  overflow-y-auto pb-8 xl:pb-10`}
        >
          <PostContent />
        </div>
           
        {/* 2. Desktop Sidebar View */}
        {isPanelOpen && (
          <div className="hidden md:block xl:w-[360px] md:w-[280px] md:flex-shrink-0">
            <OpenPanel />
          </div>
        )}
      </div>

      {/* 3. Mobile Overlay View */}
      {isPanelOpen && (
        <div className="md:hidden fixed inset-0 top-[64px] z-50">
          <OpenPanel />
        </div>
      )}
    </section>
  );
}

// #34405440
