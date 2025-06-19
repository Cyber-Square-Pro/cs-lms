import { IEmailPasswordFormValues } from "@/types/user";
import React from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { SignInValidator, TSignInValidator } from "@/lib/validators/accounts/signin.validator";

interface Props {
    onFormSubmit: (formData: IEmailPasswordFormValues) => void;
  }

 

  
const LoginForm: React.FC<Props> = (props) => {
    const { onFormSubmit } = props;

    const {
        register,
        handleSubmit,
        formState: { isSubmitting },
      } = useForm<TSignInValidator>({
        resolver: zodResolver(SignInValidator),
      });

      
  return (
    <>
      <form className="space-y-6" onSubmit={handleSubmit(onFormSubmit)}>
        {/* Email input */}
        <div>
          <label
            htmlFor="email"
            className="block text-sm font-medium text-gray-700"
          >
            User Name
          </label>
          <input
            id="username"        
            {...register("email")}
            required
            className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
          />
        </div>

        {/* Password input */}
        <div>
          <label
            htmlFor="password"
            className="block text-sm font-medium text-gray-700"
          >
            Password
          </label>
          <input
            id="password"
            {...register("password")}
            type="password"
            required
            className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
          />
        </div>

        
        <div>
          <button
            type="submit"
            className="w-full py-2 px-4 bg-blue-600 text-white font-semibold rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50"
          >
         {isSubmitting ? "Loggin In..." : "Log In"}
          </button>
        </div>
      </form>
    </>
  );
};

export default LoginForm;
