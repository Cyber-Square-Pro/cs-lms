"use client";
import React, { use, useEffect, useState } from "react";
import { FileText, CheckCircle } from "lucide-react";
import { ExamService } from "@/services/exam.service";
import Spinner from "../spinner";
import { IExamLite } from "@/types/exam";
import { useRouter } from "next/navigation";

interface Props {
  userType: string;
}

const ExamListCard: React.FC<Props> = (props) => {
  const { userType } = props;

  const examService = new ExamService();
  const [loading, setLoading] = useState(true);
  const [examList, setExamList] = useState<IExamLite[]>([]);
  const router = useRouter();
  
  function formatDateToDDMMYYYY(dateStr: string): string {
    const [year, month, day] = dateStr.split("-");
    return `${day}/${month}/${year}`;
  }

  function formatTimeToAMPM(time24: string): string {
    const [hourStr, minute, second] = time24.split(":");
    let hour = parseInt(hourStr, 10);
    const ampm = hour >= 12 ? "PM" : "AM";
    hour = hour % 12 || 12; // convert 0 to 12 for 12 AM
    return `${hour.toString().padStart(2, "0")}:${minute} ${ampm}`;
  }

  useEffect(() => {
    const fetchExams = async () => {
      try {
        const response = await examService.loadActiveExams();
        if (response?.statusCode === 200) {
          console.log("Exams loaded successfully:", response.data);
          setExamList(response.data);
        } else {
          console.error("Error loading exams:", response.message);
        }
      } catch (error) {
        console.error("Error fetching exams:", error);
      }
      setLoading(false);
    };

    fetchExams();
  }, []);

  const handleNavigation = (examId: number) => {
  const url = userType === "HM" ? `/HM/exam/${examId}` : `/teacher/exams/question/${examId}/`;
  router.push(url);
};


  function formatDateTimeToReadable(dateStr: string): string {
    const date = new Date(dateStr);

    const day = String(date.getDate()).padStart(2, "0");
    const month = String(date.getMonth() + 1).padStart(2, "0"); // months are 0-based
    const year = date.getFullYear();

    let hours = date.getHours();
    const minutes = String(date.getMinutes()).padStart(2, "0");
    const ampm = hours >= 12 ? "PM" : "AM";

    hours = hours % 12 || 12; // convert 0 to 12 for 12AM

    const formattedTime = `${String(hours).padStart(
      2,
      "0"
    )}:${minutes} ${ampm}`;
    return `${day}/${month}/${year} ${formattedTime}`;
  }

  const createExamSchedule = (index: number) => {

  }

  return (
    <>
      {loading ? (
        <Spinner />
      ) : (
        <div className="max-w-4xl mx-auto p-6 mt-8">
          <div className="max-w-4xl mx-auto p-6 mt-8">
            <h2 className="text-2xl font-bold mb-6">All Exams</h2>
            {examList.length === 0 ? (
              <p className="text-gray-600">No exams added yet.</p>
            ) : (
              <div className="grid md:grid-cols-2 gap-6">
                {examList.map((exam, index) => (
                  <div
                    key={index}
                    className="bg-white shadow-md rounded-lg p-4 border border-gray-200"
                  >
                    <h3 className="text-lg font-semibold text-blue-700 mb-2">
                      {exam.exam_name.toUpperCase()} - 
                    </h3>
                    <p className="text-sm text-gray-600">
                      <strong>Date:</strong>{" "}
                      {formatDateToDDMMYYYY(exam.start_date)} to{" "}
                      {formatDateToDDMMYYYY(exam.end_date)}
                    </p>
                    <p className="text-sm text-gray-600">
                      <strong>Time:</strong> {formatTimeToAMPM(exam.exam_time)}
                    </p>
                    <p className="text-sm text-gray-600">
                      <strong>Marks:</strong> {exam.exam_mark}
                    </p>
                    <p className="text-sm text-gray-600">
                      <strong>Grades:</strong> Grade {exam.min_grade} - Grade{" "} 
                      {exam.max_grade}
                    </p>

                    <p className="text-sm text-gray-600">
                      <strong>Created By:</strong> {exam.created_by}
                    </p>

                    <p className="text-sm text-gray-600">
                      <strong>Created On:</strong>{" "}
                      {formatDateTimeToReadable(exam.created_at)}
                    </p>
                    <div className="mt-4 flex gap-2">
                     
                      <button
                          onClick={() => handleNavigation(exam.id)}
                        className="flex-1 flex items-center justify-center gap-2 bg-blue-600 hover:bg-blue-700 text-white py-2 px-4 rounded"
                      >
                        <FileText size={25} />
                     Qn Paper
                      </button>

                       {userType === "HM" && (
                        <button
                          onClick={() => createExamSchedule(index)}
                          className="flex-1 flex items-center justify-center gap-2 py-2 px-4 rounded text-white font-medium bg-green-600 hover:bg-green-700"
                        >
                          <CheckCircle size={18} />
                          Finish
                        </button>
                      )}

                        {userType === "HM" && (
                      <button
                          onClick={() => (exam.id)}
                        className="flex-1 flex items-center justify-center gap-2 bg-blue-600 hover:bg-blue-700 text-white py-2 px-4 rounded"
                      >
                        <FileText size={25} />
                     Schedule
                      </button>
                       )}
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      )}
    </>
  );
};

export default ExamListCard;