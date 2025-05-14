"use client"

import { useForm } from "react-hook-form"
import { useNavigate, Link } from "react-router-dom"

function Login() {
  const navigate = useNavigate()
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

  const onSubmit = (data) => {
    console.log("Login form submitted:", data)
    // In a real app, you would call your authentication API here
    navigate("/dashboard")
  }

  return (
    <form className="mt-28 space-y-6  w-[17rem] sm:w-[20rem] mx-auto" onSubmit={handleSubmit(onSubmit)}>
        <div className="space-y-4">
            <h1 className="text-black text-3xl font-bold my-8">Login</h1>
    {/* Email Field */}
    <div>
      <label htmlFor="email" className="block text-sm font-medium text-gray-700">
        Email address
      </label>
      <input
        id="email"
        type="email"
        className={`mt-1 block w-full rounded-md border ${
          errors.email ? "border-red-500" : "border-gray-300"
        } px-3 py-2 shadow-sm focus:border-gray-500 focus:outline-none focus:ring-gray-500`}
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
        className={`mt-1 block w-full rounded-md border ${
          errors.password ? "border-red-500" : "border-gray-300"
        } px-3 py-2 shadow-sm focus:border-gray-500 focus:outline-none focus:ring-gray-500`}
        {...register("password", {
          required: "Password is required",
        })}
      />
      {errors.password && <p className="mt-1 text-sm text-red-600">{errors.password.message}</p>}
    </div>

    {/* Remember Me & Forgot Password */}
    <div className="flex items-center justify-between">
    
      <div className="text-sm">
        <Link to="/forgot-password" className="font-medium text-gray-700 hover:text-gray-900">
          Forgot your password?
        </Link>
      </div>
    </div>
  </div>

  <div>
    <button
      type="submit"
      className="group relative flex w-full justify-center rounded-md border border-transparent bg-black py-2 px-4 text-sm font-medium text-white hover:bg-gray-800 focus:outline-none focus:ring-2 focus:ring-gray-500 focus:ring-offset-2"
    >
      Sign in
    </button>
  </div>
</form>
  )
}

export default Login
