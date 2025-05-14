import { useForm } from "react-hook-form"
import { useNavigate, Link } from "react-router-dom"
import { setToken } from "../slices/auth"
import { useDispatch } from "react-redux";
import { useState } from "react";
import { login } from "../services/auth";

function Login() {

  const dispatch = useDispatch();
  const navigate = useNavigate()
  const [loading,setLoading] = useState(false)
  
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    defaultValues: {
      email: "",
      password: "",
    },
  })

  const onSubmit = async (data) => {
    console.log("Login form submitted:", data)
    console.log("Form submitted:", data);
          setLoading(true)
    
        const result = await login(data)
        console.log(result)
        if(result){
          dispatch(setToken(result.accessToken))
          navigate("/dashboard")
        }
        setLoading(false)
    // In a real app, you would call your authentication API here
  }

  return (
     <div className="min-h-screen bg-gray-50 flex items-center justify-center px-4 py-12 sm:px-6 lg:px-8">
      <div className="max-w-md w-full bg-white rounded-xl shadow-lg p-8 space-y-8 transition-all duration-300 hover:shadow-xl">
        <div className="text-center">
          <h1 className="text-3xl font-bold tracking-tight text-gray-900">Welcome Back</h1>
          <p className="mt-2 text-sm text-gray-600">
            Sign in to your account
          </p>
        </div>

        <form className="mt-8 space-y-6" onSubmit={handleSubmit(onSubmit)}>
          <div className="space-y-5">
            {/* Email Field */}
            <div>
              <label htmlFor="email" className="block text-sm font-medium text-gray-700">
                Email address
              </label>
              <input
                id="email"
                type="email"
                placeholder="Enter your email"
                className={`mt-1 block w-full rounded-md border ${
                  errors.email ? "border-red-500" : "border-gray-300"
                } px-3 py-2 shadow-sm focus:border-gray-900 focus:outline-none focus:ring-1 focus:ring-gray-900 transition-colors duration-200`}
                {...register("email", {
                  required: "Email is required",
                  pattern: {
                    value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
                    message: "Please enter a valid email address",
                  },
                })}
              />
              {errors.email && <p className="mt-1 text-sm text-red-600">{errors.email.message}</p>}
            </div>

            {/* Password Field */}
            <div>
              <label htmlFor="password" className="block text-sm font-medium text-gray-700">
                Password
              </label>
              <input
                id="password"
                type="password"
                placeholder="Enter your password"
                className={`mt-1 block w-full rounded-md border ${
                  errors.password ? "border-red-500" : "border-gray-300"
                } px-3 py-2 shadow-sm focus:border-gray-900 focus:outline-none focus:ring-1 focus:ring-gray-900 transition-colors duration-200`}
                {...register("password", {
                  required: "Password is required",
                })}
              />
              {errors.password && <p className="mt-1 text-sm text-red-600">{errors.password.message}</p>}
            </div>

            {/* Forgot Password Link */}
            <div className="flex justify-end">
              <Link
                to="/forgot-password"
                className="text-sm font-medium text-gray-900 hover:text-black underline-offset-2 hover:underline transition-all duration-200"
              >
                Forgot your password?
              </Link>
            </div>
          </div>

          <div>
            <button
            // disabled={loading}
              type="submit"
              className="cursor-pointer group relative flex w-full justify-center rounded-md border border-transparent bg-black py-2.5 px-4 text-sm font-medium text-white hover:bg-gray-800 focus:outline-none focus:ring-2 focus:ring-black focus:ring-offset-2 transition-all duration-300 transform hover:scale-[1.02] active:scale-[0.98]"
            >
              {!loading ? "Sign In" : "loading"}
            </button>
          </div>
          
          <div className="text-center text-sm text-gray-600">
            Don't have an account?{" "}
            <Link 
              to="/signup"
              className="font-medium text-gray-900 hover:text-black underline-offset-2 hover:underline transition-all duration-200"
            >
              Sign up
            </Link>
          </div>
        </form>
      </div>
    </div>
  )
}

export default Login
