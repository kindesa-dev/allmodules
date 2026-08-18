import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { FiMail, FiLock, FiUser, FiEye, FiEyeOff } from "react-icons/fi";
import { useAuth } from "../context/AuthContext";
import { useToast } from "../context/ToastContext";
import icon from "../assets/icon.png";

export default function SignUp() {
  const { signUp } = useAuth();
  const { success, error } = useToast();
  const navigate = useNavigate();

  const [form, setForm] = useState({ name: "", email: "", password: "", confirmPassword: "" });
  const [errors, setErrors] = useState({});
  const [touched, setTouched] = useState({});
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  function validateForm(form) {
    const newErrors = {};
    if (!form.name.trim()) {
      newErrors.name = "Full name is required";
    } else if (form.name.trim().length < 2) {
      newErrors.name = "Name must be at least 2 characters";
    }
    if (!form.email.trim()) {
      newErrors.email = "Email is required";
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email)) {
      newErrors.email = "Please enter a valid email address";
    }
    if (!form.password) {
      newErrors.password = "Password is required";
    } else if (form.password.length < 6) {
      newErrors.password = "Password must be at least 6 characters";
    }
    if (form.password !== form.confirmPassword) {
      newErrors.confirmPassword = "Passwords do not match";
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
    setTouched({ name: true, email: true, password: true, confirmPassword: true });

    if (Object.keys(newErrors).length > 0) return;

    setIsLoading(true);
    try {
      signUp(form);
      success("Account created successfully!");
      navigate("/account", { replace: true });
    } catch (err) {
      error(err.message);
    } finally {
      setIsLoading(false);
    }
  }

  const isFormValid =
    form.name.trim().length >= 2 &&
    form.email.trim() &&
    /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email) &&
    form.password.length >= 6 &&
    form.password === form.confirmPassword &&
    !errors.name &&
    !errors.email &&
    !errors.password &&
    !errors.confirmPassword;

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
            <h1 className="text-3xl font-extrabold text-coffee-brown">Create Account</h1>
            <p className="mt-2 text-gray-500">Join us for the best coffee experience</p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-5" noValidate>
            <div>
              <label className="block text-sm font-semibold text-coffee-brown mb-1">Full Name</label>
              <div className="relative">
                <FiUser className="absolute left-3 top-1/2 -translate-y-1/2 text-coffee-orange" size={20} />
                <input
                  type="text"
                  name="name"
                  value={form.name}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  placeholder="Your name"
                  className={`w-full pl-10 pr-4 py-3 border rounded-lg outline-none focus:border-coffee-orange transition ${
                    errors.name && touched.name
                      ? "border-red-500 focus:border-red-500"
                      : "border-coffee-caramel"
                  }`}
                  aria-invalid={errors.name && touched.name ? "true" : "false"}
                  aria-describedby={errors.name && touched.name ? "name-error" : undefined}
                  disabled={isLoading}
                />
              </div>
              {errors.name && touched.name && (
                <p id="name-error" className="mt-1 text-sm text-red-500">{errors.name}</p>
              )}
            </div>

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
                  placeholder="At least 6 characters"
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

            <div>
              <label className="block text-sm font-semibold text-coffee-brown mb-1">Confirm Password</label>
              <div className="relative">
                <FiLock className="absolute left-3 top-1/2 -translate-y-1/2 text-coffee-orange" size={20} />
                <input
                  type={showPassword ? "text" : "password"}
                  name="confirmPassword"
                  value={form.confirmPassword}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  placeholder="Confirm your password"
                  className={`w-full pl-10 pr-4 py-3 border rounded-lg outline-none focus:border-coffee-orange transition ${
                    errors.confirmPassword && touched.confirmPassword
                      ? "border-red-500 focus:border-red-500"
                      : "border-coffee-caramel"
                  }`}
                  aria-invalid={errors.confirmPassword && touched.confirmPassword ? "true" : "false"}
                  aria-describedby={errors.confirmPassword && touched.confirmPassword ? "confirm-error" : undefined}
                  disabled={isLoading}
                />
              </div>
              {errors.confirmPassword && touched.confirmPassword && (
                <p id="confirm-error" className="mt-1 text-sm text-red-500">{errors.confirmPassword}</p>
              )}
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
              {isLoading ? "Creating account..." : "Create Account"}
            </button>
          </form>

          <p className="mt-6 text-center text-gray-600">
            Already have an account?{" "}
            <Link to="/signin" className="text-coffee-orange font-semibold hover:text-coffee-brown">
              Sign In
            </Link>
          </p>
        </div>
      </div>
    </section>
  );
}
