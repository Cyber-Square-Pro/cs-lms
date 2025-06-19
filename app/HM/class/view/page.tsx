"use client";
import React, { useEffect, useState } from 'react'
import ClassListCard from '../../_components/class-list'
import { HMService } from '@/services/hm.servive';
import { IClassLite } from '@/types/hm';

const ClassListPage = () => {

    const hmService = new HMService();
    const [classList, setClassList] = useState<IClassLite[]>([]);

    useEffect(() => {
        hmService.loadActiveClass().then((res) => {
            console.log("Classes loaded:", res);
            if (res?.statusCode === 200) {
              console.log("Classes:", res.classList);
              setClassList(res.classList); 
            } else {
                console.error("Error loading classes:", res.message);
            }
        }).catch((error) => {
            console.error("Error fetching classes:", error);
        });

        
    }, []);  


  return (
    <div>
 
 {classList.map((classItem, index) => (
    <ClassListCard key={index} cardData={classItem} />
  ))}
    </div>
  )
}

export default ClassListPage