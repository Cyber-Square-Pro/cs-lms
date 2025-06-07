"use client";
import { Toast } from "@/lib/toast/toast";
import { TStudentValidator } from "@/lib/validators/accounts/student.validator";
import { TeacherService } from "@/services/teacher.service";
import { IStudent } from "@/types/student";
import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { ToastContainer } from "react-toastify";

const AddStudentPage = () => {
  const [coverImageFile, setCoverImageFile] = useState<File | null>(null);
  const toast = new Toast();
  const teacherService = new TeacherService()

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting },
  } = useForm<TStudentValidator>();

  const onSubmit = async (data: Partial<IStudent>) => {
    console.log(data);
    const formData = new FormData();
    formData.append("student_name", data.student_name|| "");
    formData.append("admission_no", data.admission_no|| "");
    formData.append("father_name", data.father_name|| "");
    formData.append("mother_name", data.mother_name|| "");
    formData.append("gender", data.gender|| "");
    formData.append("nationality", data.nationality|| "");
    formData.append("dob", data.dob|| "");
    formData.append("address", data.address|| "");
    formData.append("joining_date", data.joining_date|| "");
    formData.append("phone_no", data.phone_no|| "");


    if (coverImageFile) {
      formData.append("pic", coverImageFile);
    }
    else{
      formData.append("pic", "");
    }

    const response = await teacherService.registerStudent(formData).then((res) => {
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
    <>
      <ToastContainer />
      <div className="max-w-2xl mx-auto bg-white p-6 rounded-lg shadow-md mt-8">
        <h2 className="text-2xl font-bold mb-6">Student Registration</h2>
        <form
          onSubmit={handleSubmit(onSubmit)}
          className="grid grid-cols-1 gap-4"
        >
          <div>
            <label className="block text-sm font-medium">Student Name</label>
            <input
              {...register("student_name")}
              className="mt-1 w-full p-2 border rounded"
              placeholder="Enter full name"
            />
            {errors.student_name && (
              <span className="text-red-500 text-[13px] ml-2">
                {errors.student_name.message}
              </span>
            )}
          </div>

          <div>
            <label className="block text-sm font-medium">Admission No</label>
            <input
              {...register("admission_no")}
              className="mt-1 w-full p-2 border rounded"
              placeholder="Enter admission no"
            />
            {errors.student_name && (
              <span className="text-red-500 text-[13px] ml-2">
                {errors.student_name.message}
              </span>
            )}
          </div>

          <div>
            <label className="block text-sm font-medium">Father Name</label>
            <input
              type="text"
              {...register("father_name")}
              className="mt-1 w-full p-2 border rounded"
              placeholder="enter father name"
            />
          </div>

          <div>
            <label className="block text-sm font-medium">Mother Name</label>
            <input
              {...register("mother_name")}
              className="mt-1 w-full p-2 border rounded"
              placeholder="enter mother name"
            />
          </div>

          <div>
            <label className="block text-sm font-medium">Gender</label>
            <select
              className="mt-1 w-full p-2 border rounded"
              {...register("gender")}
            >
              <option value="">Select</option>
              <option value="male">Male</option>
              <option value="female">Female</option>
            </select>
          </div>

          <div>
            <label className="block text-sm font-medium">Nationality</label>
            <select
              {...register("nationality")}
              className="mt-1 w-full p-2 border rounded"
            >
              <option value="">Select Country</option>
              <option value="india">India</option>
              <option value="pakistan">Pakistan</option>
              <option value="ksa">KSA</option>
            </select>
          </div>

          <div>
            <label className="block text-sm font-medium">Date of Birth</label>
            <input
              type="date"
              {...register("dob")}
              className="mt-1 w-full p-2 border rounded"
            />
          </div>

          <div>
            <label className="block text-sm font-medium">Address</label>
            <textarea
              {...register("address")}
              className="mt-1 w-full p-2 border rounded"
              rows={2}
              placeholder="Enter your address"
            />
          </div>

          <div>
            <label className="block text-sm font-medium">Joining Date</label>
            <input
              type="date"
              {...register("joining_date")}
              className="mt-1 w-full p-2 border rounded"
            />
          </div>

<div>
            <label className="block text-sm font-medium">Phone No</label>
            <input
              type="text"
              {...register("phone_no")}
              className="mt-1 w-full p-2 border rounded"
            />
          </div>

           

          <div>
            <label className="block text-sm font-medium">Profile Picture</label>
            <input
              type="file"
              className="mt-1 w-full p-2 border rounded"
              accept="image/*"
              onChange={(e) => {
                if (e.target.files && e.target.files[0]) {
                  setCoverImageFile(e.target.files[0]);
                }
              }}
            />
          </div>

          <button
            type="submit"
            className="mt-4 bg-blue-600 text-white py-2 rounded hover:bg-blue-700"
          >
            {/* {isSubmitting? 'Submitting...': 'Register'} */}
          </button>
        </form>
      </div>
    </>
  );
};

export default AddStudentPage;
