"use client";
import Spinner from '@/components/spinner';
import React, { useEffect, useState } from 'react'

const TeacherDashboard = () => {
    const [loading, setLoading] = useState(true);
  
   useEffect(() => {
      // Show spinner for 5 seconds
      const timer = setTimeout(() => {
        setLoading(false);
      }, 2000);
  
      return () => clearTimeout(timer); // Cleanup
    }, []);
    return <>{loading ? <Spinner /> : <div>Teacher</div>}</>;

}

export default TeacherDashboard