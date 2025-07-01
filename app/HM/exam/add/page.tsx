"use client";
import { Toast } from "@/lib/toast/toast";
import { TExamValidator } from "@/lib/validators/accounts/exam.validator";
import { ExamService } from "@/services/exam.service";
import { IExam } from "@/types/exam";
import React from "react";
import { useForm } from "react-hook-form";
import { ToastContainer } from "react-toastify";

const ExamAddPage = () => {
  const examService = new ExamService();
  const toast = new Toast();

  const {
    register,
    handleSubmit,
    reset,
    formState: { isSubmitting },
  } = useForm<TExamValidator>();

  const onSubmit = async (data: IExam) => {
    console.log("Form submitted:", data);
    examService.saveExamDetails(data).then((res) => {
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
      <form
        className="grid grid-cols-1 gap-4"
        onSubmit={handleSubmit(onSubmit)}
      >
        <div>
          <label className="block text-sm font-medium">Exam Name</label>
          <select
            className="mt-1 w-full p-2 border rounded"
            {...register("exam_name")}
          >
            <option value="">Select Exam</option>
            <option value="pa1">PA-1</option>
            <option value="pa2">PA-2</option>
            <option value="half yearly">Half Yearly</option>
            <option value="annual">Annual</option>
          </select>
        </div>

        <div>
          <label className="block text-sm font-medium">Start Date</label>
          <input
            {...register("start_date")}
            type="date"
            className="mt-1 w-full p-2 border rounded"
          />
        </div>

        <div>
          <label className="block text-sm font-medium">End Date</label>
          <input
            {...register("end_date")}
            type="date"
            className="mt-1 w-full p-2 border rounded"
          />
        </div>

        <div>
          <label className="block text-sm font-medium">Time</label>
          <input
            {...register("exam_time")}
            type="time"
            className="mt-1 w-full p-2 border rounded"
          />
        </div>

        <div>
          <label className="block text-sm font-medium mb-1">Grades</label>
          <div>
            <div className="flex items-center gap-2">
              <select
                className="w-full p-2 border rounded"
                {...register("min_grade")}
              >
                <option value="" disabled selected>
                  Select Grade 1
                </option>
                <option value="lkg">LKG</option>
                <option value="ukg">UKG</option>
                <option value="1">1</option>
                <option value="2">2</option>
                <option value="3">3</option>
                <option value="4">4</option>
                <option value="5">5</option>
                <option value="6">6</option>
                <option value="7">7</option>
                <option value="8">8</option>
                <option value="9">9</option>
                <option value="10">10</option>
              </select>

              <span className="mx-2">-</span>

              <select
                className="w-full p-2 border rounded"
                {...register("max_grade")}
              >
                <option value="" disabled selected>
                  Select Grade 2
                </option>
                <option value="lkg">LKG</option>
                <option value="ukg">UKG</option>
                <option value="1">1</option>
                <option value="2">2</option>
                <option value="3">3</option>
                <option value="4">4</option>
                <option value="5">5</option>
                <option value="6">6</option>
                <option value="7">7</option>
                <option value="8">8</option>
                <option value="9">9</option>
                <option value="10">10</option>
              </select>
            </div>
          </div>
        </div>
        <div>
          <label className="block text-sm font-medium">Marks</label>
          <input
            {...register("exam_mark")}
            type="number"
            min="0"
            className="mt-1 w-full p-2 border rounded"
          />
        </div>
        <button
          type="submit"
          className="mt-4 bg-blue-600 text-white py-2 rounded hover:bg-blue-700"
        >
          {isSubmitting ? "Submitting..." : "Submit"}
        </button>
      </form>
    </div>
  );
};

export default ExamAddPage;