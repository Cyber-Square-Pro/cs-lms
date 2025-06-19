"use client";
import SubjectMaterialCard from "@/components/cards/notes-card";
import Pagination from "@/components/pagination";
import { DIVISION, GRADE } from "@/constants/class";
import { SUBJECTS } from "@/constants/subjects";
import { Toast } from "@/lib/toast/toast";
import { TNotesValidator } from "@/lib/validators/accounts/notes.validator";
import { TeacherService } from "@/services/teacher.service";
import { INoteDisplay, INotes } from "@/types/teacher";
import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { ToastContainer } from "react-toastify";

const NotesViewPage = () => {
  const teacherService = new TeacherService();
  const [materialFile, setMaterialFile] = useState<File | null>(null);
  const selectedClass = localStorage.getItem("class") || "";
  const selectedDivision = localStorage.getItem("division") || "";

  const [materialList, setMaterialList] = useState<INoteDisplay[]>([]);

  const [currentPage, setCurrentPage] = useState(1);
  const materialsPerPage = 1;

  const indexOfLastStudent = currentPage * materialsPerPage;
  const indexOfFirstStudent = indexOfLastStudent - materialsPerPage;
  const currentStudents = materialList.slice(
    indexOfFirstStudent,
    indexOfLastStudent
  );

  const toast = new Toast();

  const loadNotes = async () => {
    console.log(selectedClass, selectedDivision);

    await teacherService
      .fetchMaterials(selectedClass, selectedDivision)
      .then((res) => {
        console.log(res);
        const materialsWithClassInfo = res.materials.map((item: any) => ({
          ...item.material,
          uploaded_on: item.material.uploaded_on
            ? item.material.uploaded_on.split("T")[0]
            : null,
          cls: item.cls,
          division: item.division,
        }));

        setMaterialList(materialsWithClassInfo);
        console.log(materialsWithClassInfo, "***");
      });
  };

  useEffect(() => {
    loadNotes();
  }, []);
  return (
    <div>
      {materialList.length > 0 ? (
        <>
          <div className="flex justify-end mb-4">
            <Pagination
              totalItems={materialList.length}
              itemsPerPage={materialsPerPage}
              currentPage={currentPage}
              onPageChange={setCurrentPage}
            />
          </div>

          <div className="grid grid-cols-1 my-3 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {currentStudents.map((item, index) => (
              <SubjectMaterialCard
                materialId={item?.id}
                key={index}
                title={item?.title}
                description={item?.description}
                uploadedOn={item?.uploaded_on}
                uploadedBy={item?.teacher_name}
                contentUrl={item.file}
                user_type="student"
                subject={item.subject}
                contentType={item?.file_type}
              />
            ))}
          </div>
        </>
      ) : (
        <p className="text-center text-gray-500 text-xl font-semibold mt-20">
          No Resource Found
        </p>
      )}
    </div>
  );
};

export default NotesViewPage;
