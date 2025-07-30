"use client";
import { DIVISION } from "@/constants/class";
import { Toast } from "@/lib/toast/toast";
import { TClassValidator } from "@/lib/validators/accounts/class.validator";
import { HMService } from "@/services/hm.servive";
import { IClassLite } from "@/types/hm";
import React from "react";
import { useForm } from "react-hook-form";
import { ToastContainer } from "react-toastify";


const AddNewClass = () => {

  const {
      register,
      handleSubmit,
      reset,
      formState: { isSubmitting },
    } = useForm<TClassValidator>();

    const hmService = new HMService();
  const onSubmit = async (data: Partial<IClassLite>) => {
    console.log("Form submitteddd:", data);
   const response = await hmService.saveClassDetails(data).then((res) => {
      console.log(res);
      if (res?.statusCode === 201) {
        toast.showToast("success", res?.message);
        reset();
      } else {
        toast.showToast("error", res?.message);
      }
    }).catch((error) => {
      console.error("Error saving class details:", error);
      toast.showToast("error", error?.message || "Failed to save class details");
   })
  }

    const toast = new Toast();
  
  return (
    <div className="max-w-2xl mx-auto bg-white p-6 rounded-lg shadow-md mt-8">
      <ToastContainer />
      <form onSubmit={handleSubmit(onSubmit)}   className="grid grid-cols-1 gap-4">
        <div>
          <label className="block text-sm font-medium">Class</label>
          <select 
          className="mt-1 w-full p-2 border rounded"
          {...register("cls")}
           defaultValue="">
            <option value="" disabled>
              Select Class
            </option>
            {[...Array(12)].map((_, i) => (
              <option key={i + 1} value={i + 1}>
                {i + 1}
              </option>
            ))}
          </select>
        </div>

        <div>
          <label className="block text-sm font-medium">Division</label>
          <div>
            <select   {...register("division")} className="mt-1 w-full p-2 border rounded" defaultValue="">
              <option value="" disabled>
                Select Division
              </option>
              {DIVISION.map((division) => (
                <option key={division} value={division}>
                  {division}
                </option>
              ))}
            </select>
          </div>
        </div>

        <div>
          <label className="block text-sm font-medium">Section</label>
          <div>
            <select   {...register("section")} className="mt-1 w-full p-2 border rounded" defaultValue="">
              <option value="" disabled>
                Section
              </option>
              <option value="girls">Girls</option>
              <option value="boys">Boys</option>
            </select>
          </div>
        </div>

        <button
          type="submit"
          className="mt-4 bg-blue-600 text-white py-2 rounded hover:bg-blue-700"
        >
          {isSubmitting?'Registering...':'Register'}
        </button>
      </form>
    </div>
  );
};

export default AddNewClass;
