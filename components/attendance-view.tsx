"use client";

import { Toast } from "@/lib/toast/toast";
import React, { useState } from "react";
import { DIVISION, GRADE } from "@/constants/class";
import { TeacherService } from "@/services/teacher.service";

interface Props {
  userType: string;
}

const StudentAttendance: React.FC<Props> = (props) => {
  const { userType } = props;

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [disableButton, setDisableButton] = useState(true);
  const [selectedOption, setSelectedOption] = useState("date"); // "date" or "month"
  const [selectedDate, setSelectedDate] = useState("");
  const [selectedMonth, setSelectedMonth] = useState("");
  const [displayTable, setDisplayTable] = useState(false);
  const [hasSearched, setHasSearched] = useState(false);
  const toast = new Toast();
  const teacherService = new TeacherService();

  // Define the type of an attendance item
  type AttendanceItem = any;

  const [attendanceList, setAttendanceList] = useState<AttendanceItem[]>([]);

  const handleDateChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const input = e.target.value; // Format: YYYY-MM-DD
    setSelectedDate(input);

    console.log(attendanceList, "dateeeeeeeeeeeeeeeeee");
    const today = new Date().toISOString().split("T")[0];
    if (input > today) {
      setDisableButton(true);
      toast.showToast("error", "Invalid Date.");
    } else {
      setDisableButton(false);
    }
  };

  const handleMonthChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const input = e.target.value;
    setAttendanceList([]);
    console.log(input, "monthssssssssssssssss");
    setSelectedMonth(input);
    setDisableButton(false);
  };

  const handleSubmit = async () => {
    setHasSearched(true);
    setIsSubmitting(true);
    setAttendanceList([]);
    setDisplayTable(false);

    try {
      let res;

      if (selectedOption === "date") {
        await teacherService
          .loadAttendance(selectedOption, selectedDate)
          .then((res) => {
            if (res?.attendanceList.length > 0) {
              setAttendanceList(res.attendanceList);
              setDisplayTable(true);
            }
            console.log(res, "res");
          });
      } else {
        await teacherService
          .loadAttendance(selectedOption, selectedMonth)
          .then((res) => {
            if (res?.attendanceList.length > 0) {
              setAttendanceList(res.attendanceList);
              setDisplayTable(true);
            }
            console.log(res, "res");
          });
      }
    } catch (error) {
      console.error(error);
      setDisplayTable(false);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="container mx-auto p-4">
      <h4 className="text-md font-semibold">Select Type</h4>
      <select
        className="p-2 border rounded mt-2"
        value={selectedOption}
        onChange={(e) => {
          setSelectedOption(e.target.value);
          setAttendanceList([]);
          setDisplayTable(false);
          setHasSearched(false);
          setDisableButton(true)
        }}
      >
        <option value="date">Specific Date</option>
        <option value="month">Specific Month</option>
      </select>

      {selectedOption === "date" && (
        <div className="mt-4">
          <label className="inline px-3 text-sm font-semibold">
            Select Date
          </label>
          <input
            type="date"
            className="py-3 w-50 px-4 border-b"
            value={selectedDate}
            onChange={(e) => handleDateChange(e)}
          />
        </div>
      )}

      {selectedOption === "month" && (
        <div className="mt-4">
          <label className="inline px-3 text-sm font-semibold">
            Select Month
          </label>
          <input
            type="month"
            className="py-3 w-50 px-4 border-b"
            value={selectedMonth}
            onChange={(e) => handleMonthChange(e)}
          />
        </div>
      )}

      {userType !== "teacher" && (
        <div>
          <div>
            <label className="block text-sm font-semibold">Grade</label>
            <select className="mt-1 my-2 w-50 p-2 border rounded">
              <option value="">Select Grade</option>
              {GRADE.map((grade, index) => (
                <option key={index} value={grade}>
                  {grade}
                </option>
              ))}
            </select>
          </div>

          <div>
            <label className="block text-sm font-semibold">Division</label>
            <select className="mt-1 my-2 w-50 p-2 border rounded">
              <option value="">Select Division</option>
              {DIVISION.map((division, index) => (
                <option key={index} value={division}>
                  {division}
                </option>
              ))}
            </select>
          </div>
        </div>
      )}

      <div className="mt-6">
        <button
          onClick={handleSubmit}
          disabled={disableButton}
          className={`px-4 py-2 rounded text-gray-50 ${
            disableButton
              ? "bg-gray-400 cursor-not-allowed"
              : "bg-blue-600 hover:bg-blue-700"
          }`}
        >
          {isSubmitting ? "Loading…" : "Load Attendance"}
        </button>
      </div>

      {!isSubmitting &&
        !displayTable &&
        attendanceList.length == 0 &&
        hasSearched && (
          <h3 className="text-center text-gray-500 mt-6">
            No attendance data available for the selected{" "}
            {selectedOption === "date" ? "date" : "month"}.
          </h3>
        )}

      {/* Display table for a particular day */}

      {selectedOption === "date" && displayTable && (
        <table className="table-auto table-primary mt-6 border-collapse border border-gray-500 w-full">
          <thead>
            <tr>
              <th className="border px-4 py-2">ID</th>
              <th className="border px-4 py-2">Name</th>
              <th className="border px-4 py-2">Status</th>
            </tr>
          </thead>
          <tbody className="text-center">
            {attendanceList.map((item, index) => (
              <tr key={item.id}>
                <td className="border px-4 py-2">{index + 1}</td>
                <td className="border px-4 py-2">{item.name}</td>
                <td
                  className={`border px-4 py-2 ${
                    item.status === "Absent"
                      ? "text-red-500 font-semibold"
                      : "text-green-500 font-semibold"
                  }`}
                >
                  {item.status}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}

      {/* Display calendar-like table for a particular month */}
      {selectedOption === "month" && displayTable && (
        <table className="table-auto w-full border border-gray-500 rounded-md shadow-md mt-4">
          <thead className="bg-gray-100">
            <tr>
              <th className="border px-4 py-2">Student</th>
              {Array.from({ length: 30 }, (_, i) => i + 1).map((day) => (
                <th key={day} className="border px-4 py-2">
                  {day}
                </th>
              ))}
            </tr>
          </thead>
          <tbody className="text-center">
            {attendanceList.map((item) => (
              <tr key={item.studentId}>
                <td className="border px-4 py-2 font-semibold">{item.name}</td>
                {Array.from({ length: 30 }, (_, i) => i + 1).map((day) => {
                  // Determine max day for this row
                  const today = new Date();

                  // Split selectedMonth (format: "YYYY-MM")
                  // into year and month
                  const [selectedYear, selectedMonthIndex] =
                    selectedMonth.split("-");
                  // JavaScript months are 0-indexed
                  const firstOfMonth = new Date(
                    parseInt(selectedYear),
                    parseInt(selectedMonthIndex) - 1,
                    1
                  );

                  // Calculate last day of the selected or current month
                  const lastOfMonth = new Date(
                    parseInt(selectedYear),
                    parseInt(selectedMonthIndex),
                    0
                  );

                  // If it's the current year and current month, limit to today
                  let max = lastOfMonth.getDate();

                  if (
                    today.getFullYear() === firstOfMonth.getFullYear() &&
                    today.getMonth() === firstOfMonth.getMonth()
                  ) {
                    max = today.getDate();
                  }

                  if (day > max) return null;

                  const status = item.attendance[day];
                  return (
                    <td
                      key={day}
                      className={`border px-4 py-2 ${
                        status === "Absent"
                          ? "text-red-500 font-semibold"
                          : status === "Holiday"
                          ? "bg-gray-300 font-semibold text-gray-700"
                          : "text-green-500 font-semibold"
                      }`}
                    >
                      {status}
                    </td>
                  );
                })}
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
};

export default StudentAttendance;
