"use client";
import StudentsListCard from "@/components/cards/student-list.card";
import Pagination from "@/components/pagination";
import { TeacherService } from "@/services/teacher.service";
import { IStudent } from "@/types/student";
import { useEffect, useRef, useState } from "react";

const StudentsListPage: React.FC = () => {
  const [showOptions, setShowOptions] = useState(false);
  const teacherService = new TeacherService();

  const optionsRef = useRef<HTMLDivElement>(null);
  const [studentsList, setStudentsList] = useState<Partial<IStudent>[]>([]);
  const [currentPage, setCurrentPage] = useState(1);
  const studentsPerPage = 4;

  const indexOfLastStudent = currentPage * studentsPerPage;
  const indexOfFirstStudent = indexOfLastStudent - studentsPerPage;
  const currentStudents = studentsList.slice(
    indexOfFirstStudent,
    indexOfLastStudent
  );

  useEffect(() => {
    const fetchStudentsList = async () => {
      teacherService.loadActiveStudents().then((res) => {
        console.log(res);
        if (res?.statusCode == 200) {
          setStudentsList(res?.studentsList);
        }
      });
    };

    fetchStudentsList();
  }, []);

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

  const totalPages = Math.ceil(studentsList.length / studentsPerPage);

  const handlePrevPage = () => {
    setCurrentPage((prev) => Math.max(prev - 1, 1));
  };

  const handleNextPage = () => {
    setCurrentPage((prev) => Math.min(prev + 1, totalPages));
  };

  const handlePageClick = (pageNum: number) => {
    setCurrentPage(pageNum);
  };

  return (
    <div className="p-6">
       <Pagination
        totalItems={studentsList.length}
        itemsPerPage={studentsPerPage}
        currentPage={currentPage}
        onPageChange={setCurrentPage}
      />
      <div className="flex flex-wrap gap-4">
        {currentStudents.map((student, index) => (
          <div
            key={index}
            className="w-full sm:w-1/2 md:w-1/3 lg:w-1/4 px-2  mb-4"
          >
            <StudentsListCard
              studentName={student.student_name}
              admissionNo={student.admission_no}
              cls={student.cls}
              division={student.division}
              fatherName={student.father_name}
              nationality={student.nationality}
              phoneNo={student.phone_no}
              pic={student.pic ?? ""}
            />
          </div>
        ))}
      </div>
    </div>
  );
};

export default StudentsListPage;
