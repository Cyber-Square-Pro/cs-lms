"use client";

import { FC, useState } from "react";
import { Book, Pencil, X } from "lucide-react";
import dynamic from "next/dynamic";

// Dynamically import PDF viewer (optional optimization)
const ReactPlayer = dynamic(() => import("react-player/lazy"), { ssr: false });

interface Props {
  title?: string;
  type?: string;
  subject?: string;
  uploadedBy?: string;
  uploadedOn?: string;
  contentUrl?: string;
  contentType?: "video" | "pdf";
}

const SubjectMaterialCard: FC<Props> = (props) => {
  const {
    title = "HTML and CSS",
    type = "Exam",
    subject = "N/A",
    uploadedBy = "Unknown",
    uploadedOn = "Unknown",
    contentUrl = "https://www.youtube.com/embed/HGnoUd36zAg?si=kaGHoJz6XLxSVuqQ",
    contentType,
  } = props;
  const [open, setOpen] = useState(false);

  const toggleModal = () => setOpen(!open);

  return (
    <>
      <div
        className="flex items-center justify-between p-4 border rounded-xl shadow-sm bg-white w-full max-w-md hover:shadow-md transition cursor-pointer"
        onClick={toggleModal}
      >
        <div className="flex items-start gap-3">
          <div className="w-8 h-8 p-1 rounded-full border border-blue-500 text-blue-500 flex items-center justify-center">
            <Pencil size={20} />
          </div>
          <div>
            <p className="font-semibold text-sm truncate w-48">{title}</p>
            <p className="text-xs text-gray-500">{type}</p>
            <div className="flex items-center gap-1 my-1 text-gray-600 text-sm">
              <Book size={14} />
              <span>{subject}</span>
            </div>
            <div className="flex items-center gap-2 my-1 text-gray-600 text-sm">
              Uploaded By: <span>{uploadedBy}</span>
            </div>
            <div className="flex items-center gap-1 text-gray-600 text-sm">
              Uploaded On: <span>{uploadedOn}</span>
            </div>
          </div>
        </div>
        <div className="text-gray-400 hover:text-gray-600 cursor-pointer">
          <div className="w-1 h-1 rounded-full bg-current mb-0.5" />
          <div className="w-1 h-1 rounded-full bg-current mb-0.5" />
          <div className="w-1 h-1 rounded-full bg-current" />
        </div>
      </div>
 
      {open && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-40">
          <div className="bg-white rounded-xl p-4 w-[90%] max-w-3xl relative">
            <button
              onClick={toggleModal}
              className="absolute top-2 right-2 text-gray-500 hover:text-black"
            >
              <X size={20} />
            </button>

            <h2 className="text-lg font-semibold mb-4">{title}</h2>

            {contentType === "video" ? (
              <div className="aspect-video">
                <ReactPlayer
                  url={contentUrl}
                  controls
                  width="100%"
                  height="100%"
                />
              </div>
            ) : (
              <iframe
                src={contentUrl}
                className="w-full h-[500px] border rounded"
                title="PDF Viewer"
              ></iframe>
            )}
          </div>
        </div>
      )}
    </>
  );
};

export default SubjectMaterialCard;
