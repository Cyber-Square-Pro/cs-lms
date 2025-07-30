"use client";
import React, { useEffect, useState } from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { StaffService } from "@/services/staff.service";
import { IStaffList } from "@/types/staff";
import Pagination from "@/components/pagination";

const StaffViewPage = () => {
  const BASE_ASSET_URL = process.env.NEXT_PUBLIC_BASE_ASSET_URL;
  const defaultPic =
    process.env.NEXT_PUBLIC_LOCAL_ASSET_BASE_URL + "no-pic-staff.jpeg";

  const [staffList, setStaffList] = useState<IStaffList[]>([]);
  const staffsPerPage = 4;
  const [currentPage, setCurrentPage] = useState(1);

  const indexOfLastStudent = currentPage * staffsPerPage;
  const indexOfFirstStudent = indexOfLastStudent - staffsPerPage;
  const currentStaffs = staffList.slice(
    indexOfFirstStudent,
    indexOfLastStudent
  );
  useEffect(() => {
    const staffService = new StaffService();

    const fetchStaffList = async () => {
      staffService
        .loadStaff({})
        .then((res) => {
          console.log(res.staff_list);
          console.log(typeof res.statusCode);
          if (res?.statusCode == 200) {
            // alert("Staff List Loaded Successfully");
            console.log(res?.staff_list, "*********");
            setStaffList(res?.staff_list || []);
          } else {
            // Handle error response
          }
        })
        .catch((error) => {
          console.error("Error loading staff:", error);
          // Handle error
        });
    };

    fetchStaffList();
  }, []);

  return (
    <>
     <Pagination
        totalItems={staffList.length}
        itemsPerPage={staffsPerPage}
        currentPage={currentPage}
        onPageChange={setCurrentPage}
      />
      
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 p-6">
     
      {currentStaffs.map((staff, index) => (
        <Card key={index}>
          <CardContent className="flex flex-col items-center text-center pt-4">
            {staff.pic ? (
              <img
                src={`${BASE_ASSET_URL}${staff.pic}`}
                alt={`Staff ${index + 1}`}
                className="w-[100%] h-[200px] mb-4"
              />
            ) : (
              <img
                src={defaultPic}
                alt={`Staff ${index + 1}`}
                className="w-[100%] h-[200px] mb-4"
              />
            )}
          </CardContent>

          <CardHeader className="items-center text-center">
            <CardTitle className=""> {staff.staff_name}</CardTitle>
            <CardDescription>
              <p> Staff ID: {staff.staff_id} </p>
              <p>Nationality: {staff.nationality}</p>
              <p>Role: {staff.role}</p>
            </CardDescription>
          </CardHeader>
        </Card>
      ))}
    </div>
    </>
  );
};

export default StaffViewPage;
