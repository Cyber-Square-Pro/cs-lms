'use client';
import React, { useEffect, useState } from 'react';
import { HMService } from '@/services/hm.servive';

const HMDashboardPage = () => {
  const hmService = new HMService();

  const [activeTeachers, setActiveTeachers] = useState<number>(0);
  const [activeClasses, setActiveClasses] = useState<number>(0);

  useEffect(() => {
    hmService.getHMDashboardData()
      .then(data => {
        setActiveTeachers(data.active_teachers);
        setActiveClasses(data.active_classes);
      })
      .catch(error => {
        console.error('Error fetching dashboard data:', error);
      });
  }, []);

  return (
    <div className="grid grid-cols-3 gap-6">
      <div className="col-span-2 bg-white p-6 rounded-xl shadow">
        <h2 className="text-xl font-semibold mb-4">Category - 2</h2>
        <img src="people.png" alt="Quiz" className="rounded-xl w-full" />
      </div>
      <div className="space-y-4">
        <div className="bg-blue-400 text-white p-4 rounded-xl shadow">
          <h3 className="text-lg font-semibold">Active Teachers</h3>
          <p className="text-2xl">{activeTeachers}</p>
          <p>Teacher</p>
        </div>
        <div className="bg-indigo-500 text-white p-4 rounded-xl shadow">
          <h3 className="text-lg font-semibold">Active Classes</h3>
          <p className="text-2xl">{activeClasses}</p>
          <p>Class</p>
        </div>

      {/*
      <div className="bg-purple-500 text-white p-4 rounded-xl shadow">
        <h3 className="text-lg font-semibold">Number of Meetings</h3>
        <p className="text-2xl">34040</p>
        <p>2.00% (30 days)</p>
      </div>
      <div className="bg-red-400 text-white p-4 rounded-xl shadow">
        <h3 className="text-lg font-semibold">Number of Clients</h3>
        <p className="text-2xl">47033</p>
        <p>0.22% (30 days)</p>
      </div>
      */}
    </div>
  </div>
  )
}

export default HMDashboardPage