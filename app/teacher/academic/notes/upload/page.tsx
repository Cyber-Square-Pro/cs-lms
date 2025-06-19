"use client"
import {  DIVISION, GRADE } from "@/constants/class";
import { SUBJECTS } from "@/constants/subjects";
import { Toast } from "@/lib/toast/toast";
import { TNotesValidator } from "@/lib/validators/accounts/notes.validator";
import { TeacherService } from "@/services/teacher.service";
import { INotes } from "@/types/teacher";
import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { ToastContainer } from "react-toastify";

const NotesUploadPage = () => {
      const teacherService = new TeacherService()
        const [materialFile, setMaterialFile] = useState<File | null>(null);
      
        const toast = new Toast();
      
    
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting },
  } = useForm<TNotesValidator>();

  const onSubmit = async (data: INotes ) => {
    console.log(data);
     const formData = new FormData();
    formData.append("subject", data.subject|| "");
    formData.append("title", data.title|| "");
    formData.append("description", data.description|| "");
    formData.append("cls", data.grade|| "");
    formData.append("division", data.division|| "");

    console.log(materialFile,'****')
     if (materialFile) {
      formData.append("file", materialFile);
    }
    else{
      formData.append("file", "");
    }

     const response = await teacherService.uploadNotes(formData).then((res) => {
      console.log(res);
      if (res?.statusCode === 201) {
        toast.showToast("success", res?.message);
        reset();
      } else {
        toast.showToast("error", res?.message);
      }
    });
  };

  
  return (

    <div className="max-w-2xl mx-auto bg-white p-6 rounded-lg shadow-md mt-8">
      <ToastContainer />

      <h2 className="text-2xl font-bold mb-6">Upload Notes</h2>
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="grid grid-cols-1 gap-4"
      >
        <div>
          <label className="block text-sm font-medium">Title</label>
          <input
            {...register("title")}
            className="mt-1 w-full p-2 border rounded"
            placeholder="Enter content title"
          />
          {errors.title && (
            <span className="text-red-500 text-[13px] ml-2">
              {errors.title.message}
            </span>
          )}
        </div>

        <div>
          <label className="block text-sm font-medium">Description</label>
          <textarea
            {...register("description")}
            className="mt-1 w-full p-2 border rounded"
            placeholder="Enter content description"
          ></textarea>
          {errors.description && (
            <span className="text-red-500 text-[13px] ml-2">
              {errors.description.message}
            </span>
          )}
        </div>


        <div>
          <label className="block text-sm font-medium">Grade</label>
          <select
            className="mt-1 w-full p-2 border rounded"
              {...register("grade")}
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

        <div>
          <label className="block text-sm font-medium">Subject</label>
          <select
            className="mt-1 w-full p-2 border rounded"
              {...register("subject")}
          >
            <option value="" disabled selected>
              Select Subject
            </option>
            {SUBJECTS.map((subject, index) => (
              <option key={index} value={subject.toLocaleLowerCase()}>
                {subject}
              </option>
            ))}
          </select>
        </div>




        <div>
          <label className="block text-sm font-medium">
            Select File (pdf/video)
          </label>
           <input
              type="file"
              className="mt-1 w-full p-2 border rounded"
              
              onChange={(e) => {
                if (e.target.files && e.target.files[0]) {
                  setMaterialFile(e.target.files[0]);
                }
              }}
            />
        </div>

        <button
          type="submit"
          className="mt-4 bg-blue-600 text-white py-2 rounded hover:bg-blue-700"
        >
          Upload
          {/* {isSubmitting? 'Submitting...': 'Register'} */}
        </button>
      </form>
    </div>
  );
};

export default NotesUploadPage;
