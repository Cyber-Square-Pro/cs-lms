"use client"
import React from "react";
import { useParams, useRouter } from "next/navigation";


const LoginPage = () => {
  const router = useRouter();
  const { user } = useParams()
  let imagePath = ""
  console.log(user); 
  
  if(user == "hm"){
     
    imagePath = "/offc.jpeg"
  }
  return (
    <div className="flex h-screen">
      {/* Left side: Image */}
      <div className="w-1/2 bg-cover bg-center" style={{ backgroundImage: `url('${imagePath}')` }}>
        {/* Add any overlay or content here if needed */}
      </div>

      {/* Right side: Login Form */}
      <div className="w-1/2 flex items-center justify-center bg-gray-50">
        <div className="w-full max-w-md p-8 space-y-6 bg-white rounded-lg shadow-lg">
          <h2 className="text-3xl font-bold text-center text-gray-800">Login</h2>
          
          <form className="space-y-6">
            {/* Email input */}
            <div>
              <label htmlFor="email" className="block text-sm font-medium text-gray-700">
                Email Address
              </label>
              <input
                id="email"
                name="email"
                type="email"
                required
                className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
              />
            </div>

            {/* Password input */}
            <div>
              <label htmlFor="password" className="block text-sm font-medium text-gray-700">
                Password
              </label>
              <input
                id="password"
                name="password"
                type="password"
                required
                className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
              />
            </div>

            {/* Submit Button */}
            <div>
              <button
                type="submit"
                className="w-full py-2 px-4 bg-blue-600 text-white font-semibold rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50"
              >
                Log In
              </button>
            </div>
          </form>

          {/* Forgot password link */}
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
