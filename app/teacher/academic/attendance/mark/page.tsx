"use client";
import { Toast } from "@/lib/toast/toast";
import { TeacherService } from "@/services/teacher.service";
import { IAttendance } from "@/types/teacher";
import { useEffect, useState } from "react";
import { ToastContainer } from "react-toastify";

interface Student {
  id: number;
  name: string;
  marks: string;
}

const AttendancePage = () => {
  const toast = new Toast();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [selectedDate, setSelectedDate] = useState<string>("");
  const [dateError, setDateError] = useState<string>("");
  const [disableButton, setDisableButton] = useState(true);
  const teacherService = new TeacherService();
  const [studentsList, setStudentsList] = useState<IAttendance[]>([]);

  const handleDateChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const inputDate = e.target.value; // Format: YYYY-MM-DD
    setSelectedDate(inputDate);

    // Get today's date in YYYY-MM-DD format
    const today = new Date();
    const todayFormatted = today.toISOString().split("T")[0];

    // Compare dates
    if (inputDate > todayFormatted) {
      setDisableButton(true);
      toast.showToast("error", "Invalid Date");
    } else {
      setDisableButton(false);

      setDateError("");
    }
  };

  useEffect(() => {
    const fetchStudentData = async () => {
      await teacherService.loadAttendanceData().then((res) => {
        console.log(res);
        setStudentsList(
          res?.studentsList.map((item: any) => ({
            ...item,
            status: "Present",
          }))
        );
      });
    };

    fetchStudentData();
  }, []);
  // Options for attendance dropdown
  const attendanceOptions = [
    "Present",
    "Absent",
    "Late",
    "Excused",
    "Half Day",
  ];

  const handleMarksChange = (id: number, value: string) => {
    setStudentsList((prevList) =>
      prevList.map((item) =>
        item.id === id
          ? { ...item, status: value }
          : { ...item, status: "Present" }
      )
    );
  };

  const handleSubmit = async () => {
  
     setIsSubmitting(true);

    const formData = {
      date: selectedDate,
      students: studentsList.map((item) => ({
        id: item.id,
        marks: item.status,
      })),
    };

    console.log("Form Data to API.", formData);

    await teacherService
      .markAttendance(formData)
      .then((res) => {
        if (res?.statusCode === 201) {
          toast.showToast("success", "Attendance marked successfully");
          setSelectedDate("");
          setDisableButton(true);
        } else {
          toast.showToast("error", res?.message || "Failed to mark attendance");
        }
              setIsSubmitting(false);
      })
      .catch((error) => {
        console.error("Error marking attendance:", error);
        toast.showToast("error", error?.message || "Failed to mark attendance");
      });
      
  };

  return (
    <div className="container mx-auto p-4">
      <ToastContainer />

      <h1 className="text-2xl font-bold mb-6">Student Attendance</h1>

      <div>
        <label className="inline px-3 text-sm font-medium">Select Date</label>

        <input
          type="date"
          className="py-3 w-50 px-4 border-b"
          value={selectedDate}
          onChange={handleDateChange}
        />
      </div>
      <div className="overflow-x-auto">
        <table className="min-w-full bg-white border border-gray-200">
          <thead>
            <tr className="bg-gray-100">
              <th className="py-3 px-4 border-b text-left">SL No</th>
              <th className="py-3 px-4 border-b text-left">Student Name</th>
              <th className="py-3 px-4 border-b text-left">Attendance</th>
            </tr>
          </thead>
          <tbody>
            {studentsList.map((student, index) => (
              <tr key={student.id} className="hover:bg-gray-50">
                <td className="py-3 px-4 border-b">{index + 1}</td>

                <td className="py-3 px-4 border-b">{student.student_name}</td>

                <td className="py-3 px-4 border-b">
                  <select
                    value={student.status}
                    onChange={(e) =>
                      handleMarksChange(student.id, e.target.value)
                    }
                    className="border rounded px-3 py-1 w-full max-w-xs"
                  >
                    <option value="">Select Status</option>
                    {attendanceOptions.map((option) => (
                      <option key={option} value={option}>
                        {option}
                      </option>
                    ))}
                  </select>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <div className="mt-6">
        <button
          onClick={handleSubmit}
          className={`px-4 py-2 rounded text-white ${
            disableButton
              ? "bg-gray-400 cursor-not-allowed"
              : "bg-blue-600 hover:bg-blue-700"
          }`}
        >
           {isSubmitting ? "Saving..." : "Save Attendance"}
        </button>
      </div>
    </div>
  );
};

export default AttendancePage;
