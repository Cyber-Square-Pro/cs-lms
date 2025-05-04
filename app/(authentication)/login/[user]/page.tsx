"use client"
import React from "react";
import { ToastContainer } from "react-toastify";
import { Toast } from "@/lib/toast/toast";
import { useParams, useRouter } from "next/navigation";
import LoginForm from "@/components/forms/login-form";
import { IEmailPasswordFormValues } from "@/types/user";
import { AuthService } from "@/services/auth.service";


const LoginPage = () => {
  const router = useRouter();
  const params = useParams<{ user: string }>(); 
  const user = params.user;
  let imagePath = ""
  console.log(user); 
  const authService = new AuthService();
  const toast = new Toast();
  
  if(user == "hm"){
    imagePath = "/offc.jpeg"
  }

  const onFormSubmit = async (formData: IEmailPasswordFormValues) => {
    const completeFormData: IEmailPasswordFormValues = {
      ...formData,
      userType: user  , 
    };
  
    console.log(completeFormData);

    try {
      const response = await authService.userSignIn(completeFormData);
      console.log(response);
      if (response?.statusCode === 200) {
        const token = response?.token;
        router.push("/lms-admin/")
      } else {
        toast.showToast('error', response?.message)
      }
    } catch (error) {
      console.error("Error during login:", error);
       
      // toast.showToast('error', error?.message)
    }
    console.log('login form submitted')
  }

  return (
    <div className="flex h-screen">
            <ToastContainer />

      {/* Left side: Image */}
      <div className="w-1/2 bg-cover bg-center" style={{ backgroundImage: `url('${imagePath}')` }}>
        {/* Add any overlay or content here if needed */}
      </div>

      {/* Right side: Login Form */}
      <div className="w-1/2 flex items-center justify-center bg-gray-50">
        <div className="w-full max-w-md p-8 space-y-6 bg-white rounded-lg shadow-lg">
          <h2 className="text-3xl font-bold text-center text-gray-800">Login</h2>
          
          <LoginForm onFormSubmit={onFormSubmit}/>
          <p className="mt-2 text-center text-sm text-gray-600">
            <a href="#" className="text-blue-600 hover:text-blue-800">
              Forgot your password?
            </a>
          </p>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;
