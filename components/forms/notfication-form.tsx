"use client"
import React from 'react'
import { useForm } from 'react-hook-form';
import { ToastContainer } from 'react-toastify'
import {
  NotificationsValidator,
  TNotificationsValidator,
} from "@/lib/validators/accounts/notification.validator"; 
import { zodResolver } from '@hookform/resolvers/zod';
const NotificationForm = () => {

     const {
        register,
        handleSubmit,
        formState: { isSubmitting },
      } = useForm<TNotificationsValidator>({
        resolver: zodResolver(NotificationsValidator),
      });

    const onFormSubmit = async (data: TNotificationsValidator) => {

    }


  return (
   
    <div className="flex flex-col mx-100  h-screen space-y-6">
            <ToastContainer />
      <h2 className="text-2xl font-semibold">Add Notication</h2>

      <form className="space-y-6" >
 
        <div>
          <label
            htmlFor="title"
            className="block text-sm font-medium text-gray-700"
          >
            Title
          </label>
          <input
            id="title"
            type="text"
        
            {...register("title")}
            placeholder="Enter title"
            className="mt-1 block w-60 px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
          />
        </div>

        {/* New Password */}
        <div>
          <label
            htmlFor="message"
            className="block text-sm font-medium text-gray-700"
          >
            New Password
          </label>
          <textarea
            id="message"
            {...register("message")}
            rows={4}
            placeholder="Enter message"
            
            className="mt-1 block w-60 px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
          ></textarea>
        </div>

         

        <div>
          <button
            type="submit"
            className="w-60 py-2 px-4 bg-blue-600 text-white font-semibold rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50"
          >
          {isSubmitting?'Publishing...': "Publish Notification"}
          </button>
        </div>
      </form>
    </div>
  )
}

export default NotificationForm