"use client";
import { SUBJECTS } from "@/constants/subjects";
import { Toast } from "@/lib/toast/toast";
import { TStaffRegistrationValidator } from "@/lib/validators/accounts/staff-register";
import { TTtaffDetailsValidator } from "@/lib/validators/accounts/teacher-details.validator";
import { StaffService } from "@/services/staff.service";
import { TeacherService } from "@/services/teacher.service";
import { ITeacherLite } from "@/types/teacher";
import { ITeacherDetails } from "@/types/user";
import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { ToastContainer } from "react-toastify";

const RegisterTeacherPage = () => {
  const teacherService = new TeacherService();
  const [teachersList, setTeacherList] = useState<ITeacherLite[]>([]);
  const toast = new Toast();



   const {
      register,
      handleSubmit,
      reset,
      formState: { isSubmitting },
    } = useForm<TTtaffDetailsValidator>();

    
  useEffect(() => {
    const loadTeachers = async () => {
      try {
        const response = await teacherService.loadTeachers().then((res) => {
          if (res?.statusCode === 200) {
            setTeacherList(res.teachersList);
          } else {
            console.error("Error loading teachers:", res.message);
          }
        });
        console.log(response);
      } catch (error) {
        console.error("Error fetching teachers:", error);
      }
    };

    loadTeachers();
  }, []);


   const onSubmit = async (data: ITeacherDetails) => {
    console.log("Form submitted:", data);
     const response = await teacherService.saveAcademicDetails(data).then((res) => {
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
      <form className="grid grid-cols-1 gap-4" onSubmit={handleSubmit(onSubmit)}>
        <div>
          <label className="block text-sm font-medium">Teacher</label>
          <select  
          {...register("staff_id")}
          className="mt-1 w-full p-2 border rounded">
            <option value="" selected disabled>Select Teacher</option>
            {teachersList &&
              teachersList.length > 0 &&
              teachersList.map((teacher) => (
                <option key={teacher.id} value={teacher.staff_id}>
                  {teacher.staff_name}
                </option>
              ))}
          </select>
        </div>

        <div>
          <label className="block text-sm font-medium">
            Highest Qualification
          </label>
          <input
            {...register("highest_qualification")}
            className="mt-1 w-full p-2 border rounded"
            placeholder="Highest Qualification"
          />
        </div>

        <div>
          <label className="block text-sm font-medium">Board/University</label>
          <input
         {...register("board_or_university")}
            className="mt-1 w-full p-2 border rounded"
            placeholder="Board/University"
          />
        </div>

        <div>
          <label className="block text-sm font-medium">Designation</label>
          <input
              {...register("designation")}
            className="mt-1 w-full p-2 border rounded"
            placeholder="Enter designation"
          />
        </div>

        <div>
          <label className="block text-sm font-medium">Department</label>
          <select
            className="mt-1 w-full p-2 border rounded"
              {...register("department")}
          >
            <option value="">Select Department</option>
            <option value="ict">ICT</option>
            <option value="english">English</option>
            <option value="urdu">Urdu</option>
            <option value="malayalam">malayalam</option>
            <option value="science">Science</option>
          </select>
        </div>

        <div>
          <label className="block text-sm font-medium mb-1">
            Subjects Assigned
          </label>
          <div className="flex flex-wrap gap-4">
            {SUBJECTS.map((subject) => (
              <label key={subject} className="flex items-center space-x-2">
                <input type="checkbox" 
                value={subject}
                 {...register("subjects_assigned")}
                 className="w-4 h-4" />
                <span>{subject}</span>
              </label>
            ))}
          </div>
        </div>

         <button
            type="submit"
            className="mt-4 bg-blue-600 text-white py-2 rounded hover:bg-blue-700"
          >
            {isSubmitting?"Submitting...": "Register"}
          </button>
      </form>
    </div>
  );
};

export default RegisterTeacherPage;
