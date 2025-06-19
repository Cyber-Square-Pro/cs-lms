"use client"
import StudentAttendance from '@/components/attendance-view'
import { TeacherService } from '@/services/teacher.service';
import React, { useEffect } from 'react'

const AtendanceViewPage = () => {

  
  
  return (
    
   <StudentAttendance userType='teacher'/>
  )
}

export default AtendanceViewPage