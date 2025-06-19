"use client";
import { Toast } from "@/lib/toast/toast";
import {
  ChangePasswordValidator,
  TChangePasswordValidator,
} from "@/lib/validators/accounts/change-password.validator";
import { AuthService } from "@/services/auth.service";
import { IPassword } from "@/types/user";
import { zodResolver } from "@hookform/resolvers/zod";
import React from "react";
import { useForm } from "react-hook-form";
import { ToastContainer } from "react-toastify";

const ChangePasswordForm = () => {
  const {
    register,
    handleSubmit,
    formState: { isSubmitting },
  } = useForm<TChangePasswordValidator>({
    resolver: zodResolver(ChangePasswordValidator),
  });

  const authService = new AuthService();
  const toast = new Toast();


  const onFormSubmit = async (data:IPassword) => {
    console.log(data)
    await authService.changeUserPassword(data).then((res)=>{
        if (res?.statusCode === 200) {
        toast.showToast('success', res?.message)
        }
        else{
        toast.showToast('error', res?.message)

        }
    })
  }
  return (
    <div className="flex flex-col items-center   h-screen space-y-6">
            <ToastContainer />
      <h2 className="text-2xl font-semibold">Change Password</h2>

      <form className="space-y-6" onSubmit={handleSubmit(onFormSubmit)}>
        {/* Old Password */}
        <div>
          <label
            htmlFor="old_password"
            className="block text-sm font-medium text-gray-700"
          >
            Old Password
          </label>
          <input
            id="old_password"
            type="password"
            required
            {...register("old_password")}
            placeholder="Enter old password"
            className="mt-1 block w-60 px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
          />
        </div>

        {/* New Password */}
        <div>
          <label
            htmlFor="new_password"
            className="block text-sm font-medium text-gray-700"
          >
            New Password
          </label>
          <input
            id="new_password"
            {...register("new_password")}
            type="password"
            placeholder="Enter new password"
            required
            className="mt-1 block w-60 px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
          />
        </div>

        {/* Confirm Password */}
        <div>
          <label
            htmlFor="confirm_password"
            className="block text-sm font-medium text-gray-700"
          >
            Confirm Password
          </label>
          <input
            id="confirm_password"
            {...register("confirm_password")}
            type="password"
            placeholder="Enter password again"
            required
            className="mt-1 block w-60 px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
          />
        </div>

        <div>
          <button
            type="submit"
            className="w-60 py-2 px-4 bg-blue-600 text-white font-semibold rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50"
          >
          {isSubmitting?'Updating...': "Change password"}
          </button>
        </div>
      </form>
    </div>
  );
};

export default ChangePasswordForm;
