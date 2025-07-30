"use client";
import Pagination from "@/components/pagination";
import { StaffService } from "@/services/staff.service";
import React, { useEffect, useState } from "react";

const AdminDashboardPage = () => {
  const staffService = new StaffService();
  const [students, setStudents] = React.useState([]);
  const [teachers, setTeachers] = React.useState([]);
  const [staff, setStaff] = React.useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  

  useEffect(() => {
    const fetchAdminDashboardData = async () => {
      try {
        const response = await staffService.loadAdminDashboardData().then((res) => {
          if (res?.statusCode == 200) {
           console.log("Admin Dashboard Data Loaded Successfully", res.dashboard_data.total_staff);
           const dashboard_data = res.dashboard_data
            setStudents(dashboard_data.total_students);
            setTeachers(dashboard_data.total_teacher);
            setStaff(dashboard_data.total_staff);
          }
          
        });
        console.log(response);
        // Handle the response data as needed
      } catch (error) {
        console.error("Error fetching admin dashboard data:", error);
      }
    };

    fetchAdminDashboardData();
  }, []);

  return (
    <>
 
    
    <div className="grid grid-cols-3 gap-6">
      <div className="col-span-2 bg-white p-6 rounded-xl shadow">
        <h2 className="text-xl font-semibold mb-4">Welcome Admin</h2>
        <img src="people.png" alt="Quiz" className="rounded-xl w-full" />
      </div>
      <div className="space-y-4">
        <div className="bg-blue-400 text-white p-4 rounded-xl shadow">
          <h3 className="text-lg font-semibold">Total Students</h3>
          <p className="text-2xl">{students}</p>
        </div>
        <div className="bg-indigo-500 text-white p-4 rounded-xl shadow">
          <h3 className="text-lg font-semibold">Total Teachers</h3>
          <p className="text-2xl">{teachers}</p>
        </div>
        <div className="bg-purple-500 text-white p-4 rounded-xl shadow">
          <h3 className="text-lg font-semibold">Total Staff</h3>
          <p className="text-2xl">{staff}</p>
        </div>
      </div>
    </div>
    </>
  );
};

export default AdminDashboardPage;
