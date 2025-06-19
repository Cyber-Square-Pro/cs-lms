"use client";
import { TStaffRegistrationValidator } from "@/lib/validators/accounts/staff-register";
import { IStaff } from "@/types/user";
import React from "react";
import { useForm } from "react-hook-form";
import { useEffect, useState } from "react";
import { Toast } from "@/lib/toast/toast";
import { AuthService } from "@/services/auth.service";
import { StaffService } from "@/services/staff.service";
import { ToastContainer } from "react-toastify";

const AddStaffPage = () => {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting },
  } = useForm<TStaffRegistrationValidator>();

  const [coverImageFile, setCoverImageFile] = useState<File | null>(null);
  const toast = new Toast();
  const staffService = new StaffService();

  const onSubmit = async (data: IStaff) => {
    console.log("Form submitted:", data);
    const formData = new FormData();
    formData.append("staff_name", data.staff_name);
    formData.append("email", data.email);
    formData.append("phone", data.phone);
    formData.append("gender", data.gender);
    formData.append("dob", data.dob);
    formData.append("address", data.address);
    formData.append("nationality", data.nationality);
    formData.append("experience", data.experience.toString());
    formData.append("joining_date", data.joining_date);
    if (coverImageFile) {
      formData.append("pic", coverImageFile);
    } else {
      formData.append("pic", "");
    }
    formData.append("role", data.role);

    const response = await staffService.staffRegister(formData).then((res) => {
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
        <h2 className="text-2xl font-bold mb-6">Staff Registration</h2>
        <form
          onSubmit={handleSubmit(onSubmit)}
          className="grid grid-cols-1 gap-4"
        >
          <div>
            <label className="block text-sm font-medium">Name</label>
            <input
              {...register("staff_name")}
              className="mt-1 w-full p-2 border rounded"
              placeholder="Enter full name"
            />
            {errors.staff_name && (
              <span className="text-red-500 text-[13px] ml-2">
                {errors.staff_name.message}
              </span>
            )}
          </div>

          <div>
            <label className="block text-sm font-medium">Email</label>
            <input
              type="email"
              {...register("email")}
              className="mt-1 w-full p-2 border rounded"
              placeholder="enter email address"
            />
          </div>

          <div>
            <label className="block text-sm font-medium">Phone</label>
            <input
              {...register("phone")}
              className="mt-1 w-full p-2 border rounded"
              placeholder="Phone number"
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
            <label className="block text-sm font-medium">Experience</label>
            <input
              type="number"
              {...register("experience")}
              className="mt-1 w-full p-2 border rounded"
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
            <label className="block text-sm font-medium">Role</label>
            <select
              {...register("role")}
              className="mt-1 w-full p-2 border rounded"
            >
              <option value="">Select</option>
              <option value="teacher">Teacher</option>
              <option value="principal">Principal</option>
              <option value="hm_boys">HM Boys</option>
              <option value="hm_girls">HM Girls</option>
              <option value="administration">Administration</option>
            </select>
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

          <button className="mt-4 mb-10 bg-blue-600 text-white py-2 rounded hover:bg-blue-700">
            {isSubmitting ? "Submitting..." : "Register"}
          </button>
        </form>
      </div>
    </>
  );
};

export default AddStaffPage;
