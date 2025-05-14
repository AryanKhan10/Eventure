import { useState } from "react";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import { signup } from "../services/auth";
import { setUser } from "../slices/auth";
import { useDispatch, useSelector } from "react-redux";
function Signup() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  // const {loading} = useSelector(state => state.auth)
  const [loading,setLoading] = useState(false)
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
  });

  const [passwordStrength, setPasswordStrength] = useState({
    length: false,
    uppercase: false,
    lowercase: false,
    number: false,
    special: false,
  });

  // Watch password field for validation
  const password = watch("password");

  // Check password strength as user types
  const checkPasswordStrength = (value) => {
    setPasswordStrength({
      length: value.length >= 8,
      uppercase: /[A-Z]/.test(value),
      lowercase: /[a-z]/.test(value),
      number: /[0-9]/.test(value),
      special: /[^A-Za-z0-9]/.test(value),
    });
    return true;
  };

  const onSubmit = async (data) => {
    console.log("Form submitted:", data);
      setLoading(true)

    const result = await signup(data)
    console.log(result)
    if(result){
      dispatch(setUser(result.user))
      setLoading(false)
      navigate("/login");
    }
    
    // In a real app, you would call your authentication API here
  };

  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center px-4 py-12 sm:px-6 lg:px-8">
      <div className="max-w-md w-full bg-white rounded-xl shadow-lg p-8 space-y-8 transition-all duration-300 hover:shadow-xl">
        <div className="text-center">
          <h1 className="text-3xl font-bold tracking-tight text-gray-900">Create an Account</h1>
          <p className="mt-2 text-sm text-gray-600">
            Fill out the form below to get started
          </p>
        </div>
        
        <form className="mt-8 space-y-6" onSubmit={handleSubmit(onSubmit)}>
          <div className="space-y-5">
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
                } px-3 py-2 shadow-sm focus:border-gray-900 focus:outline-none focus:ring-1 focus:ring-gray-900 transition-colors duration-200`}
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
                className={`mt-1 block w-full rounded-md border ${
                  errors.password ? "border-red-500" : "border-gray-300"
                } px-3 py-2 shadow-sm focus:border-gray-900 focus:outline-none focus:ring-1 focus:ring-gray-900 transition-colors duration-200`}
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
                      checkPasswordStrength(value);
                      return true;
                    },
                  },
                })}
                onChange={(e) => checkPasswordStrength(e.target.value)}
              />
              {errors.password && <p className="mt-1 text-sm text-red-600">{errors.password.message}</p>}

              {/* Password Strength Indicators */}
              <div className="mt-3 space-y-2 bg-gray-50 p-3 rounded-md">
                <p className="text-sm font-medium text-gray-700">Password requirements:</p>
                <ul className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-sm">
                  <li className="flex items-center gap-2">
                    <span
                      className={`inline-block h-3 w-3 rounded-full transition-all duration-300 ${
                        password ? (passwordStrength.length ? "bg-green-500 scale-110" : "bg-red-500 scale-110") : "bg-gray-300"
                      }`}
                    ></span>
                    <span className={`transition-colors duration-300 ${
                      password ? (passwordStrength.length ? "text-green-600 font-medium" : "text-red-600") : "text-gray-500"
                    }`}>
                      8+ characters
                    </span>
                  </li>
                  <li className="flex items-center gap-2">
                    <span
                      className={`inline-block h-3 w-3 rounded-full transition-all duration-300 ${
                        password ? (passwordStrength.uppercase ? "bg-green-500 scale-110" : "bg-red-500 scale-110") : "bg-gray-300"
                      }`}
                    ></span>
                    <span className={`transition-colors duration-300 ${
                      password ? (passwordStrength.uppercase ? "text-green-600 font-medium" : "text-red-600") : "text-gray-500"
                    }`}>
                      Uppercase letter
                    </span>
                  </li>
                  <li className="flex items-center gap-2">
                    <span
                      className={`inline-block h-3 w-3 rounded-full transition-all duration-300 ${
                        password ? (passwordStrength.lowercase ? "bg-green-500 scale-110" : "bg-red-500 scale-110") : "bg-gray-300"
                      }`}
                    ></span>
                    <span className={`transition-colors duration-300 ${
                      password ? (passwordStrength.lowercase ? "text-green-600 font-medium" : "text-red-600") : "text-gray-500"
                    }`}>
                      Lowercase letter
                    </span>
                  </li>
                  <li className="flex items-center gap-2">
                    <span
                      className={`inline-block h-3 w-3 rounded-full transition-all duration-300 ${
                        password ? (passwordStrength.number ? "bg-green-500 scale-110" : "bg-red-500 scale-110") : "bg-gray-300"
                      }`}
                    ></span>
                    <span className={`transition-colors duration-300 ${
                      password ? (passwordStrength.number ? "text-green-600 font-medium" : "text-red-600") : "text-gray-500"
                    }`}>
                      Number
                    </span>
                  </li>
                  <li className="flex items-center gap-2 sm:col-span-2">
                    <span
                      className={`inline-block h-3 w-3 rounded-full transition-all duration-300 ${
                        password ? (passwordStrength.special ? "bg-green-500 scale-110" : "bg-red-500 scale-110") : "bg-gray-300"
                      }`}
                    ></span>
                    <span className={`transition-colors duration-300 ${
                      password ? (passwordStrength.special ? "text-green-600 font-medium" : "text-red-600") : "text-gray-500"
                    }`}>
                      Special character
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
                } px-3 py-2 shadow-sm focus:border-gray-900 focus:outline-none focus:ring-1 focus:ring-gray-900 transition-colors duration-200`}
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
                } px-3 py-2 shadow-sm focus:border-gray-900 focus:outline-none focus:ring-1 focus:ring-gray-900 bg-white transition-colors duration-200`}
                {...register("role", { required: "Please select a role" })}
              >
                <option value="">Select your role</option>
                <option value="user">User</option>
                <option value="admin">Admin</option>
                <option value="organizer">Organizer</option>
              </select>
              {errors.role && <p className="mt-1 text-sm text-red-600">{errors.role.message}</p>}
            </div>
          </div>

          <div>
            <button
              disabled={loading}
              type="submit"
              className="cursor-pointer group relative flex w-full justify-center rounded-md border border-transparent bg-black py-2.5 px-4 text-sm font-medium text-white hover:bg-gray-800 focus:outline-none focus:ring-2 focus:ring-black focus:ring-offset-2 transition-all duration-300 transform hover:scale-[1.02] active:scale-[0.98]"
            >
             {!loading ? "Create Account": "loading..."}
            </button>
          </div>
          
          <div className="text-center text-sm text-gray-600">
            Already have an account?{" "}
            <button 
              type="button" 
              onClick={() => navigate("/login")}
              className="cursor-pointer font-medium text-gray-900 hover:text-black underline-offset-2 hover:underline transition-all duration-200"
            >
              Sign in
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default Signup;