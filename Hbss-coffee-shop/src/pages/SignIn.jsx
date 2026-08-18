import { useState } from "react";
import { Link, useNavigate, useLocation } from "react-router-dom";
import { FiMail, FiLock, FiEye, FiEyeOff } from "react-icons/fi";
import { useAuth } from "../context/AuthContext";
import { useToast } from "../context/ToastContext";
import icon from "../assets/icon.png";

export default function SignIn() {
  const { signIn } = useAuth();
  const { success, error } = useToast();
  const navigate = useNavigate();
  const location = useLocation();
  const from = location.state?.from?.pathname || "/";

  const [form, setForm] = useState({ email: "", password: "" });
  const [errors, setErrors] = useState({});
  const [touched, setTouched] = useState({});
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  function validateForm(form) {
    const newErrors = {};
    if (!form.email.trim()) {
      newErrors.email = "Email is required";
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email)) {
      newErrors.email = "Please enter a valid email address";
    }
    if (!form.password) {
      newErrors.password = "Password is required";
    }
    return newErrors;
  }

  function handleChange(e) {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
    if (touched[name]) {
      setErrors(validateForm({ ...form, [name]: value }));
    }
  }

  function handleBlur(e) {
    const { name } = e.target;
    setTouched((prev) => ({ ...prev, [name]: true }));
    setErrors(validateForm(form));
  }

  async function handleSubmit(e) {
    e.preventDefault();
    const newErrors = validateForm(form);
    setErrors(newErrors);
    setTouched({ email: true, password: true });

    if (Object.keys(newErrors).length > 0) return;

    setIsLoading(true);
    try {
      signIn(form.email, form.password);
      success("Welcome back!");
      navigate(from, { replace: true });
    } catch (err) {
      error(err.message);
    } finally {
      setIsLoading(false);
    }
  }

  const isFormValid = form.email.trim() && form.password && !errors.email && !errors.password;

  return (
    <section className="py-14 bg-coffee-cream min-h-screen">
      <div className="max-w-md mx-auto px-4">
        <div className="bg-white border border-coffee-caramel rounded-2xl p-8">
          <div className="text-center mb-8">
            <Link to="/" className="flex items-center gap-2 justify-center mb-6">
              <img src={icon} alt="Hbss icon" className="w-8 h-8 inline-block" />
              <span className="font-bold text-2xl text-coffee-brown">Hbss</span>
              <span className="text-coffee-orange font-bold">Coffee Shop</span>
            </Link>
            <h1 className="text-3xl font-extrabold text-coffee-brown">Welcome Back</h1>
            <p className="mt-2 text-gray-500">Sign in to your account</p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-5" noValidate>
            <div>
              <label className="block text-sm font-semibold text-coffee-brown mb-1">Email</label>
              <div className="relative">
                <FiMail className="absolute left-3 top-1/2 -translate-y-1/2 text-coffee-orange" size={20} />
                <input
                  type="email"
                  name="email"
                  value={form.email}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  placeholder="you@email.com"
                  className={`w-full pl-10 pr-4 py-3 border rounded-lg outline-none focus:border-coffee-orange transition ${
                    errors.email && touched.email
                      ? "border-red-500 focus:border-red-500"
                      : "border-coffee-caramel"
                  }`}
                  aria-invalid={errors.email && touched.email ? "true" : "false"}
                  aria-describedby={errors.email && touched.email ? "email-error" : undefined}
                  disabled={isLoading}
                />
              </div>
              {errors.email && touched.email && (
                <p id="email-error" className="mt-1 text-sm text-red-500">{errors.email}</p>
              )}
            </div>

            <div>
              <label className="block text-sm font-semibold text-coffee-brown mb-1">Password</label>
              <div className="relative">
                <FiLock className="absolute left-3 top-1/2 -translate-y-1/2 text-coffee-orange" size={20} />
                <input
                  type={showPassword ? "text" : "password"}
                  name="password"
                  value={form.password}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  placeholder="Enter your password"
                  className={`w-full pl-10 pr-12 py-3 border rounded-lg outline-none focus:border-coffee-orange transition ${
                    errors.password && touched.password
                      ? "border-red-500 focus:border-red-500"
                      : "border-coffee-caramel"
                  }`}
                  aria-invalid={errors.password && touched.password ? "true" : "false"}
                  aria-describedby={errors.password && touched.password ? "password-error" : undefined}
                  disabled={isLoading}
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-coffee-orange hover:text-coffee-brown"
                  aria-label={showPassword ? "Hide password" : "Show password"}
                >
                  {showPassword ? <FiEyeOff size={20} /> : <FiEye size={20} />}
                </button>
              </div>
              {errors.password && touched.password && (
                <p id="password-error" className="mt-1 text-sm text-red-500">{errors.password}</p>
              )}
            </div>

            <div className="flex items-center justify-between">
              <label className="flex items-center gap-2 cursor-pointer">
                <input type="checkbox" className="w-4 h-4 text-coffee-orange border-coffee-caramel rounded focus:ring-coffee-orange" />
                <span className="text-sm text-gray-600">Remember me</span>
              </label>
              <Link to="/forgot-password" className="text-sm text-coffee-orange hover:text-coffee-brown font-medium">
                Forgot password?
              </Link>
            </div>

            <button
              type="submit"
              disabled={!isFormValid || isLoading}
              className={`w-full py-3 px-6 rounded-lg font-bold text-lg transition ${
                isFormValid && !isLoading
                  ? "bg-coffee-orange text-white hover:bg-coffee-brown"
                  : "bg-coffee-caramel text-coffee-brown cursor-not-allowed"
              }`}
            >
              {isLoading ? "Signing in..." : "Sign In"}
            </button>
          </form>

          <p className="mt-6 text-center text-gray-600">
            Don't have an account?{" "}
            <Link to="/signup" className="text-coffee-orange font-semibold hover:text-coffee-brown">
              Sign Up
            </Link>
          </p>
        </div>
      </div>
    </section>
  );
}
