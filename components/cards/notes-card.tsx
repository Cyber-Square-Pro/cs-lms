import { FC, useState, useRef, useEffect } from "react";
import {
  Book,
  Copy,
  Mail,
  Option,
  OptionIcon,
  Pencil,
  Share2,
  X,
} from "lucide-react";
import dynamic from "next/dynamic";
import { DIVISION, GRADE } from "@/constants/class";
import { TShareMaterialValidator } from "@/lib/validators/accounts/share-material.validator";
import { useForm } from "react-hook-form";
import { IShareNotes } from "@/types/teacher";
import { TeacherService } from "@/services/teacher.service";
import { Toast } from "@/lib/toast/toast";

const ReactPlayer = dynamic(() => import("react-player/lazy"), { ssr: false });

interface Props {
  materialId:number;
  title?: string;
  description?: string;
  subject?: string;
  contentType: string;
  uploadedBy?: string;
  uploadedOn?: string;
  contentUrl?: string;
  uploaded_by?: string;
  user_type: string;
  onRemoveClick?: () => void;
}

const SubjectMaterialCard: FC<Props> = (props) => {
  const {
    materialId,
    title,
    subject,
    uploadedBy,
    uploadedOn,
    description,
    contentUrl,
    contentType,
    uploaded_by,
    onRemoveClick,
    user_type,
  } = props;

  const [modalOpen, setModalOpen] = useState(false);
  const teacherService = new TeacherService();
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting },
  } = useForm<TShareMaterialValidator>();

  const [shareModalOpen, setShareModalOpen] = useState(false);

  const [optionsOpen, setOptionsOpen] = useState(false);

  const optionsRef = useRef<HTMLDivElement>(null);

  const toggleModal = () => setModalOpen(!modalOpen);
  const toggleOptions = (e: React.MouseEvent) => {
    e.stopPropagation(); // Prevent triggering modal toggle
    setOptionsOpen(!optionsOpen);
  };

  const toggleShareModal = (e?: React.MouseEvent) => {
    e?.stopPropagation();
    setShareModalOpen(!shareModalOpen);
  };

  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (
        optionsRef.current &&
        !optionsRef.current.contains(event.target as Node)
      ) {
        setOptionsOpen(false);
      }
    }
    if (optionsOpen) {
      document.addEventListener("mousedown", handleClickOutside);
    } else {
      document.removeEventListener("mousedown", handleClickOutside);
    }
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [optionsOpen]);

  const baseUrl = process.env.NEXT_PUBLIC_BASE_ASSET_URL || "";
  const contentURL = baseUrl + contentUrl;
  const toast = new Toast();

  const shareMaterial = async (data: IShareNotes) => {
    console.log(data);
    console.log(materialId)
    const formData = new FormData()
    formData.append("cls", data.cls)
    formData.append("division", data.division)
    formData.append("material", materialId.toString())

    await teacherService.shareMaterials(formData).then((res)=>{
        if(res?.statusCode == 201){
          toast.showToast('success', res?.message)
        }

         else{
          toast.showToast('error  ', res?.message)

         }
    })

  };
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
            <p className="font-semibold text-2xl  mb-2 truncate w-48">
              {title}
            </p>
            <p className="text-xs text-gray-500 mb-2">{description}</p>
            <div className="flex items-center gap-1 my-1 text-gray-600 text-sm">
              <Book size={14} />
              <span>{subject?.toUpperCase()}</span>
            </div>
            <div className="flex items-center gap-2 my-1 text-gray-600 text-sm">
              Uploaded By: <span>{uploadedBy}</span>
            </div>
            <div className="flex items-center gap-1 text-gray-600 text-sm">
              Uploaded On: <span>{uploadedOn}</span>
            </div>
          </div>
        </div>

        {/* Three dots icon with options */}
        {user_type == "teacher" && (
          <div
            className="relative text-gray-400 hover:text-gray-600 cursor-pointer"
            onClick={toggleOptions}
            ref={optionsRef}
          >
            <div>
              <Option />
            </div>

            {optionsOpen && (
              <div className="absolute right-0 mt-2 w-40 bg-white border rounded shadow-md z-50">
                <button
                  className="block w-full text-left px-4 py-2 hover:bg-gray-100"
                  onClick={(e) => {
                    e.stopPropagation();
                    onRemoveClick && onRemoveClick();
                    setOptionsOpen(false);
                  }}
                >
                  remove
                </button>
                <button
                  className="block w-full text-left px-4 py-2 hover:bg-gray-100"
                  onClick={(e) => {
                    e.stopPropagation();
                    toggleShareModal();
                    setOptionsOpen(false);
                  }}
                >
                  Share
                </button>
              </div>
            )}
          </div>
        )}
      </div>
      {/* Share Modal */}

      {shareModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-40">
          <div className="bg-white rounded-xl p-6 w-[90%] max-w-md relative">
            <button
              onClick={toggleShareModal}
              className="absolute top-4 right-4 text-gray-500 hover:text-black"
            >
              <X size={20} />
            </button>

            <h2 className="text-xl font-semibold mb-6">Share Material</h2>

            <div className="mb-4">
              <h3 className="font-medium mb-2">{title}</h3>
              <p className="text-sm text-gray-600">{description}</p>
            </div>

            <div className="border rounded-lg p-3 mb-6 bg-gray-50">
              <div className="flex items-center justify-between">
                <span className="text-sm font-medium truncate mr-2">
                  {contentURL}
                </span>
                <button
                  // onClick={copyToClipboard}
                  className="flex items-center text-blue-600 hover:text-blue-800"
                >
                  <Copy size={16} className="mr-1" />
                  {/* {copied ? "Copied!" : "Copy"} */}
                </button>
              </div>
            </div>

            <div className="flex flex-col space-y-3">
              <form onSubmit={handleSubmit(shareMaterial)}>
                <div>
                  <label className="block text-sm font-medium">Class</label>
                  <select
                    className="mt-1 w-full p-2 border rounded"
                    {...register("cls")}
                  >
                    <option value="" disabled selected>
                      Select Grade
                    </option>
                    {GRADE.map((grade, index) => (
                      <option key={index} value={grade}>
                        {grade}
                      </option>
                    ))}
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-medium">Division</label>
                  <select
                    className="mt-1 w-full p-2 border rounded"
                    {...register("division")}
                  >
                    <option value="" disabled selected>
                      Select Division
                    </option>
                    {DIVISION.map((division, index) => (
                      <option key={index} value={division}>
                        {division}
                      </option>
                    ))}
                  </select>
                </div>
                <div className="flex justify-end">
                  <button
                    type="submit"
                    className="mt-4 bg-blue-600 w-30 text-white py-2 rounded hover:bg-blue-700"
                  >
                    {isSubmitting ? "Sharing..." : "Share"}
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      )}

      {/* end Share Modal */}

      {modalOpen && (
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
                  url={contentURL}
                  controls
                  width="100%"
                  height="100%"
                />
              </div>
            ) : (
              <iframe
                src={contentURL}
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
