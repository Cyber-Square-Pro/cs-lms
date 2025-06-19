"use client"
import { TeacherService } from '@/services/teacher.service'
import { ITeacherLite } from '@/types/teacher'
import React, { useEffect, useState } from 'react'
import { useForm } from 'react-hook-form'

const AssignClassTeacherPage = () => {

    const teacherService = new TeacherService()
  const [teachersList, setTeacherList] = useState<ITeacherLite[]>([]);

    useEffect(() => {
        teacherService.loadActiveTeachers().then((res) => {

            console.log(res.teachersList)

        })
    })

       const {
          register,
          handleSubmit,
          reset,
          formState: { isSubmitting },
        } = useForm();
    
        

       
 const onSubmit = async (data: any) => {
 }

  return (
   <form className="grid grid-cols-1 gap-4" onSubmit={handleSubmit(onSubmit)}>
           <div>
             <label className="block text-sm font-medium">Teacher</label>
              
           </div>
   
           <div>
             <label className="block text-sm font-medium">
               Highest Qualification
             </label>
             {/* <input
               {...register("highest_qualification")}
               className="mt-1 w-full p-2 border rounded"
               placeholder="Highest Qualification"
             />
           </div> */}
   
           {/* <div>
             <label className="block text-sm font-medium">Board/University</label>
             <input
            {...register("board_or_university")}
               className="mt-1 w-full p-2 border rounded"
               placeholder="Board/University"
             />
           </div> */}
           </div>
   
           <div>
             <label className="block text-sm font-medium">Designation</label>
             <input
                //  {...register("designation")}
               className="mt-1 w-full p-2 border rounded"
               placeholder="Enter designation"
             />
           </div>
   
           <div>
             <label className="block text-sm font-medium">Department</label>
             <select
               className="mt-1 w-full p-2 border rounded"
                //  {...register("department")}
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
             
             </div>
           </div>
   
            <button
               type="submit"
               className="mt-4 bg-blue-600 text-white py-2 rounded hover:bg-blue-700"
             >
               {/* {isSubmitting?"Submitting...": "Register"} */}
             </button>
         </form>
   
  )
}

export default AssignClassTeacherPage