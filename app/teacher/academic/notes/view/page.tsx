"use client";
import SubjectMaterialCard from "@/components/cards/notes-card";
import Pagination from "@/components/pagination";
import { DIVISION, GRADE } from "@/constants/class";
import { SUBJECTS } from "@/constants/subjects";
import { Toast } from "@/lib/toast/toast";
import { TNotesValidator } from "@/lib/validators/accounts/notes.validator";
import { HMService } from "@/services/hm.servive";
import { TeacherService } from "@/services/teacher.service";
import { INoteDisplay, INotes } from "@/types/teacher";
import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { ToastContainer } from "react-toastify";

const NotesViewPage = () => {
  const teacherService = new TeacherService();
  const [materialFile, setMaterialFile] = useState<File | null>(null);
  const [selectedClass, setSelectedClass] = useState("");
  const [selectedDivision, setSelectedDivision] = useState("");
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

  const onSubmit = async () => {
    console.log(selectedClass, selectedDivision);
    await teacherService
      .fetchMaterials(selectedClass, selectedDivision)
      .then((res) => {
        console.log(res);
       const materialsWithClassInfo = res.materials.map((item: any) => ({
      ...item.material,         
      cls: item.cls,
      uploaded_on: item.material.uploaded_on ? item.material.uploaded_on.split('T')[0] : null,
      division: item.division,
    }));

    setMaterialList(materialsWithClassInfo);
        console.log(materialsWithClassInfo, "***");
      });
  };

   const handleRemoveResource = async (id:number) => {
    console.log(id,'****************')
    await teacherService.DeleteMaterials(id).then((res)=>{
      if(res.statusCode == 200){
        toast.showToast('success', res.message)
        setMaterialList(prevList => prevList.filter(item => item.id !== id));
      }
    })
   }


  return (
    <div>
            <ToastContainer />
      
      <div className="flex flex-wrap items-center my-10 gap-4 mb-6">
        <select
          className="border rounded px-4 py-2"
          onChange={(e) => setSelectedClass(e.target.value)}
          value={selectedClass}
        >
          <option value="" selected disabled>
            Select Class
          </option>
          {GRADE.map((grade) => (
            <option key={grade} value={grade}>
              {grade}
            </option>
          ))}
        </select>

        <select
          className="border rounded px-4 py-2"
          onChange={(e) => setSelectedDivision(e.target.value)}
          value={selectedDivision}
        >
          <option value="" selected disabled>
            Select Division
          </option>
          {DIVISION.map((division) => (
            <option key={division} value={division}>
              {division}
            </option>
          ))}
        </select>

        <button
          type="button"
          className="bg-blue-600 text-white py-2 px-6 rounded hover:bg-blue-700"
          onClick={onSubmit}
        >
          View
        </button>
      </div>

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
                user_type="teacher"
                uploadedBy={item?.teacher_name}
                contentUrl={item.file}
                subject={item.subject}
                contentType={item?.file_type}
                onRemoveClick={() => handleRemoveResource(item?.id)}  
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
