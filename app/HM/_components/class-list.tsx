"use client";

import React, { useState, useRef, useEffect } from "react";
import { Calendar, Section, Users, MoreVertical } from "lucide-react";
import { IClassLite } from "@/types/hm";
import { useRouter } from "next/navigation";
import { IAssignClass, ITeacherLite } from "@/types/teacher";
import { TeacherService } from "@/services/teacher.service";
import { useForm } from "react-hook-form";
import { HMService } from "@/services/hm.servive";
import { Toast } from "@/lib/toast/toast";
import { ToastContainer } from "react-toastify";

interface BatchCardProps {
  cardData: IClassLite;
}

export const ClassListCard: React.FC<BatchCardProps> = (props) => {
  const [activeTab, setActiveTab] = useState<"info" | "classteacher">("info");
  const [seletedClass, setSelectedClass] = useState();
  const [seletedDivision, setSelectedDivision] = useState();
const hmService = new HMService()

  const { cardData } = props;

  const [dropdownOpen, setDropdownOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);
  const router = useRouter();
  const teacherService = new TeacherService();

  function formatDate(isoString: string): string {
    const date = new Date(isoString);
    return date.toLocaleString("en-GB", {
      day: "2-digit",
      month: "short",
      year: "numeric",
      hour: "2-digit",
      minute: "2-digit",
      hour12: false,
    });
  }

  const assignClassTeacher = () => {
    router.push("/HM/class/assign/teacher");
  };
  const status = "Active";

  // Close dropdown when clicking outside
  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target as Node)
      ) {
        setDropdownOpen(false);
      }
    }

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const {
    register,
    handleSubmit,
    reset,
    formState: { isSubmitting },
  } = useForm();

  const [teachersList, setTeacherList] = useState<ITeacherLite[]>([]);
  const toast = new Toast();

  const [teachersLoaded, setTeachersLoaded] = useState(false);

  useEffect(() => {
    if (activeTab === "classteacher" && !teachersLoaded) {
      loadTeachers();
      setTeachersLoaded(true);
    }
  }, [activeTab, teachersLoaded]);

  const loadTeachers = async () => {
    try {
      const response = await teacherService.loadTeachers().then((res) => {
        if (res?.statusCode === 200) {
          setTeacherList(res.teachersList);
          console.log(res.teachersList, "**********");
        } else {
          console.error("Error loading teachers:", res.message);
        }
      });
      console.log(response);
    } catch (error) {
      console.error("Error fetching teachers:", error);
    }
  };

  const submitData = async (data: any) => {
    console.log(data, "////////////////////////");
    console.log(cardData.cls,'``````````````', data['teacher_id'])

    const formData = new FormData()
    formData.append("cls", cardData.cls)
    formData.append("division", cardData.division)
    formData.append("class_teacher", data['teacher_id'])

    const response = await hmService.assignClassTeacher(formData).then((res) => {
        if(res.statusCode == 200){
        toast.showToast("success", res?.message);
        }
    },)

  };

  return (
    <div className="max-w-xl border rounded-lg shadow p-4 bg-white w-[60%] relative">
         <ToastContainer />
      <div className="flex items-center justify-between">
        <h2 className="text-lg font-semibold">
          {cardData.cls}-{cardData.division}
        </h2>
        <div className="flex items-center gap-2 relative" ref={dropdownRef}>
          <span className="px-2 py-1 text-xs rounded-full bg-green-100 text-green-700">
            {status}
          </span>
          <button
            className="p-1 rounded-full hover:bg-gray-100"
            aria-label="More options"
            onClick={() => setDropdownOpen(!dropdownOpen)}
          >
            <MoreVertical size={18} />
          </button>

          {dropdownOpen && (
            <div className="absolute right-0 top-full mt-2 w-48 bg-white border rounded shadow-lg z-50">
              <ul>
                <li>
                  <button
                    onClick={assignClassTeacher}
                    className="block w-full text-left px-4 py-2 hover:bg-gray-100"
                  >
                    Assign Class Teacher
                  </button>
                </li>
                <li>
                  <button
                    onClick={() => alert("View Students clicked")}
                    className="block w-full text-left px-4 py-2 hover:bg-gray-100"
                  >
                    View Students
                  </button>
                </li>
                <li>
                  <button
                    onClick={() => alert("Edit Class clicked")}
                    className="block w-full text-left px-4 py-2 hover:bg-gray-100"
                  >
                    Edit Class
                  </button>
                </li>
              </ul>
            </div>
          )}
        </div>
      </div>

      {/* Tabs */}
      <div className="flex mt-4 border-b">
        {["Info", "ClassTeacher"].map((tab) => (
          <button
            key={tab}
            onClick={() => setActiveTab(tab.toLowerCase() as any)}
            className={`px-4 py-2 text-sm font-medium ${
              activeTab === tab.toLowerCase()
                ? "border-b-2 border-blue-600 text-blue-600"
                : "text-gray-500"
            }`}
          >
            {tab}
          </button>
        ))}
      </div>

      {/* Tab Content */}
      <div className="mt-4">
        {activeTab === "info" && (
          <div className="space-y-2 text-sm">
            <p className="flex items-center gap-2">
              <Calendar size={16} />{" "}
              <strong>Section: {cardData.section.toUpperCase()}</strong>
            </p>
            <p className="flex items-center gap-2">
              <Section size={16} /> <strong>Class teacher:</strong>
              {cardData.class_teacher || "Not assigned"}
            </p>
            <p className="text-green-600">
              <strong>Created By</strong>: {cardData.created_by} on{" "}
              {formatDate(cardData.created_at)}
            </p>
          </div>
        )}

        {activeTab === "classteacher" && (
          <form onSubmit={handleSubmit(submitData)}>
            <div className="flex items-center gap-2">
              <label className="text-sm font-medium whitespace-nowrap">
                Teacher
              </label>
              <select
                {...register("teacher_id")}
                className="w-[200px]"
                
              >
                <option disabled selected>
                  Select Teacher
                </option>
                {teachersList &&
                  teachersList.length > 0 &&
                  teachersList.map((teacher) => (
                    <option key={teacher.id} value={teacher.id}>
                      {teacher.staff_name}
                    </option>
                  ))}
              </select>

              <div>
                <button
                  type="submit"
                  className="bg-blue-600 text-white p-2 rounded hover:bg-blue-700"
                >
                  Assign
                </button>
              </div>
            </div>
          </form>
        )}
      </div>
    </div>
  );
};

export default ClassListCard;
