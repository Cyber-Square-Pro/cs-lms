"use client";
import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';


type Props = {
  children: React.ReactNode;
  allowedRoles?: string[]; // e.g. ['admin', 'hm']
};

const ProtectedRoute = ({ children, allowedRoles }: Props) => {

    
   const getToken = ()=> {  
      return localStorage.getItem('userToken') || null;
    }

    const getUserRole = ()=> {  
      return localStorage.getItem('currentUserRole') || null;
    }


    
  const router = useRouter();
  const [isAllowed, setIsAllowed] = useState(false);

  useEffect(() => {
    const token = getToken();
    const role = getUserRole();

    if (!token) {
      router.push('/');  
    } else if (allowedRoles && !allowedRoles.includes(role!)) {
      router.push('/unauthorized'); 
    } else {
      setIsAllowed(true);
    }
  }, []);

 return isAllowed ? <>{children}</> : null;
};

export default ProtectedRoute;
