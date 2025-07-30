"use client";
import { Edit, Eye, MoreVertical, Phone, Trash } from "lucide-react";
import Image from "next/image";
import { useEffect, useRef, useState } from "react";
import SubjectMaterialCard from "./notes-card";

interface Props {
  studentName?: string;
  cls?: number;
  division?: string;
  fatherName?: string;
  admissionNo?: string;
  phoneNo?: string;
  nationality?: string;
  pic: string;
}

const StudentsListCard: React.FC<Props> = (props) => {
  const {
    studentName,
    cls,
    division,
    fatherName,
    admissionNo,
    phoneNo,
    nationality,
    pic,
  } = props;
  const defaultImage =
    process.env.NEXT_PUBLIC_LOCAL_ASSET_BASE_URL + "default_person.png";

const imagePath = pic
  ? process.env.NEXT_PUBLIC_BASE_ASSET_URL + pic 
  : defaultImage;

  const [showOptions, setShowOptions] = useState(false);

  const optionsRef = useRef<HTMLDivElement>(null);
  console.log(imagePath, "..............");

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        optionsRef.current &&
        !optionsRef.current.contains(event.target as Node)
      ) {
        setShowOptions(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  return (
    <div className="w-80 gap-2 bg-white rounded-lg shadow-md overflow-hidden border relative">
      <div className="flex justify-between items-start p-4 border-b">
        <div className="w-30 h-30 relative rounded-full overflow-hidden bg-gray-200 flex-shrink-0">
          <Image src={imagePath} alt="Profile" fill className="object-cover" />
        </div>

        <div className="relative" ref={optionsRef}>
          <MoreVertical
            className="text-gray-400 cursor-pointer"
            onClick={() => setShowOptions(!showOptions)}
          />

          {showOptions && (
            <div className="absolute top-8 right-0 bg-white border rounded shadow-md z-10 w-36">
              <div className="p-2 text-sm text-gray-800">
                <div className="flex items-center px-3 py-2 hover:bg-gray-100 cursor-pointer gap-2">
                  <Eye className="w-4 h-4" />
                  View
                </div>
                <div className="flex items-center px-3 py-2 hover:bg-gray-100 cursor-pointer gap-2">
                  <Edit className="w-4 h-4" />
                  Edit
                </div>
                <div className="flex items-center px-3 py-2 hover:bg-gray-100 cursor-pointer gap-2 text-red-600">
                  <Trash className="w-4 h-4" />
                  Remove
                </div>
              </div>
            </div>
          )}
        </div>
      </div>

      <div className="p-4">
        <h2 className="font-semibold text-lg text-gray-800">{studentName}</h2>
        <p className="text-sm text-gray-600">Admission no: {admissionNo}</p>
        <p className="text-sm text-gray-600">
          Class: {cls}-{division}
        </p>
        <p className="text-sm text-gray-600">Father Name: {fatherName}</p>
        <p className="text-sm text-gray-600">Nationality: {nationality}</p>

        <div className="mt-3 px-3 py-2 bg-gray-100 rounded flex items-center gap-2 text-sm text-gray-700">
          <Phone className="w-4 h-4" />
          {phoneNo}
        </div>
      </div>

       
    </div>
  );
};

export default StudentsListCard;
