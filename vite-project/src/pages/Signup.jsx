"use client"

import { useState } from "react"
import { useForm } from "react-hook-form"
import { useNavigate } from "react-router-dom"

function Signup() {
  const navigate = useNavigate()
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm({
    defaultValues: {
      name: "",
      email: "",
      password: "",
      confirmPassword: "",
      role: "",
    },
  })

  const [passwordStrength, setPasswordStrength] = useState({
    length: false,
    uppercase: false,
    lowercase: false,
    number: false,
    special: false,
  })

  // Watch password field for validation
  const password = watch("password")

  // Check password strength as user types
  const checkPasswordStrength = (value) => {
    setPasswordStrength({
      length: value.length >= 8,
      uppercase: /[A-Z]/.test(value),
      lowercase: /[a-z]/.test(value),
      number: /[0-9]/.test(value),
      special: /[^A-Za-z0-9]/.test(value),
    })
    return true
  }

  const onSubmit = (data) => {
    console.log("Form submitted:", data)
    // In a real app, you would call your authentication API here
    navigate("/login")
  }

  return (
    <form className="mt-8 space-y-6" onSubmit={handleSubmit(onSubmit)}>
      <div className="space-y-4">
        {/* Name Field */}
        <div>
          <label htmlFor="name" className="block text-sm font-medium text-gray-700">
            Full Name
          </label>
          <input
            id="name"
            type="text"
            className={`mt-1 block w-full rounded-md border ${
              errors.name ? "border-red-500" : "border-gray-300"
            } px-3 py-2 shadow-sm focus:border-blue-500 focus:outline-none focus:ring-blue-500`}
            {...register("name", { required: "Name is required" })}
          />
          {errors.name && <p className="mt-1 text-sm text-red-600">{errors.name.message}</p>}
        </div>

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
            } px-3 py-2 shadow-sm focus:border-blue-500 focus:outline-none focus:ring-blue-500`}
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
            } px-3 py-2 shadow-sm focus:border-blue-500 focus:outline-none focus:ring-blue-500`}
            {...register("password", {
              required: "Password is required",
              validate: {
                checkLength: (value) => value.length >= 8 || "Password must be at least 8 characters long",
                checkUppercase: (value) => /[A-Z]/.test(value) || "Password must contain at least one uppercase letter",
                checkLowercase: (value) => /[a-z]/.test(value) || "Password must contain at least one lowercase letter",
                checkNumber: (value) => /[0-9]/.test(value) || "Password must contain at least one number",
                checkSpecial: (value) =>
                  /[^A-Za-z0-9]/.test(value) || "Password must contain at least one special character",
                checkStrength: (value) => {
                  checkPasswordStrength(value)
                  return true
                },
              },
            })}
          />
          {errors.password && <p className="mt-1 text-sm text-red-600">{errors.password.message}</p>}

          {/* Password Strength Indicators */}
          <div className="mt-2 space-y-2">
            <p className="text-sm font-medium">Password must contain:</p>
            <ul className="space-y-1 text-sm">
              <li className="flex items-center gap-2">
                <span
                  className={`inline-block h-4 w-4 rounded-full ${
                    passwordStrength.length ? "bg-green-500" : "bg-gray-300"
                  }`}
                ></span>
                <span className={passwordStrength.length ? "text-green-500" : "text-gray-500"}>
                  At least 8 characters
                </span>
              </li>
              <li className="flex items-center gap-2">
                <span
                  className={`inline-block h-4 w-4 rounded-full ${
                    passwordStrength.uppercase ? "bg-green-500" : "bg-gray-300"
                  }`}
                ></span>
                <span className={passwordStrength.uppercase ? "text-green-500" : "text-gray-500"}>
                  One uppercase letter
                </span>
              </li>
              <li className="flex items-center gap-2">
                <span
                  className={`inline-block h-4 w-4 rounded-full ${
                    passwordStrength.lowercase ? "bg-green-500" : "bg-gray-300"
                  }`}
                ></span>
                <span className={passwordStrength.lowercase ? "text-green-500" : "text-gray-500"}>
                  One lowercase letter
                </span>
              </li>
              <li className="flex items-center gap-2">
                <span
                  className={`inline-block h-4 w-4 rounded-full ${
                    passwordStrength.number ? "bg-green-500" : "bg-gray-300"
                  }`}
                ></span>
                <span className={passwordStrength.number ? "text-green-500" : "text-gray-500"}>One number</span>
              </li>
              <li className="flex items-center gap-2">
                <span
                  className={`inline-block h-4 w-4 rounded-full ${
                    passwordStrength.special ? "bg-green-500" : "bg-gray-300"
                  }`}
                ></span>
                <span className={passwordStrength.special ? "text-green-500" : "text-gray-500"}>
                  One special character
                </span>
              </li>
            </ul>
          </div>
        </div>

        {/* Confirm Password Field */}
        <div>
          <label htmlFor="confirmPassword" className="block text-sm font-medium text-gray-700">
            Confirm Password
          </label>
          <input
            id="confirmPassword"
            type="password"
            className={`mt-1 block w-full rounded-md border ${
              errors.confirmPassword ? "border-red-500" : "border-gray-300"
            } px-3 py-2 shadow-sm focus:border-blue-500 focus:outline-none focus:ring-blue-500`}
            {...register("confirmPassword", {
              required: "Please confirm your password",
              validate: (value) => value === password || "Passwords do not match",
            })}
          />
          {errors.confirmPassword && <p className="mt-1 text-sm text-red-600">{errors.confirmPassword.message}</p>}
        </div>

        {/* Role Field */}
        <div>
          <label htmlFor="role" className="block text-sm font-medium text-gray-700">
            Role
          </label>
          <select
            id="role"
            className={`mt-1 block w-full rounded-md border ${
              errors.role ? "border-red-500" : "border-gray-300"
            } px-3 py-2 shadow-sm focus:border-blue-500 focus:outline-none focus:ring-blue-500`}
            {...register("role", { required: "Please select a role" })}
          >
            <option value="">Select your role</option>
            <option value="user">User</option>
            <option value="admin">Admin</option>
            <option value="manager">Manager</option>
          </select>
          {errors.role && <p className="mt-1 text-sm text-red-600">{errors.role.message}</p>}
        </div>
      </div>

      <div>
        <button
          type="submit"
          className="group relative flex w-full justify-center rounded-md border border-transparent bg-blue-600 py-2 px-4 text-sm font-medium text-white hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
        >
          Sign up
        </button>
      </div>
    </form>
  )
}

export default Signup
