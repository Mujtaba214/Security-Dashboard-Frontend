import { useState } from "react";
import { Link, useNavigate } from "react-router";
import { ChevronLeftIcon, EyeCloseIcon, EyeIcon } from "../../icons";
import Label from "../form/Label";
import Input from "../form/input/InputField";
import Checkbox from "../form/input/Checkbox";
import Button from "../ui/button/Button";
import { useAuth } from "../../context/AuthContext";
import axios from "axios";
import { Bounce, toast } from "react-toastify";

export default function ResetPassForm() {
  const [token, setToken] = useState("");
  const [password, setPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");

  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (password !== newPassword) {
      toast.error("Password don't match", {
        position: "top-right",
        autoClose: 1000,
        theme: "light",
        transition: Bounce,
      });
    }
    try {
      const res = await axios.post(
        `https://security-dashboard-backend-navy.vercel.app/api/reset-password/${token}`,
        {
          token,
          newPassword,
        }
      );
      setMessage(res.data.msg);
      setError("");
      const data = res.data;

      toast.success("Login Successful", {
        position: "top-right",
        autoClose: 1000,
        theme: "light",
        transition: Bounce,
        onClose: () => navigate("/"),
      });
    } catch (err) {
      setError(err.response?.data?.msg || "Invalid or expired token");
      setMessage("");
    }
  };

  return (
    <div className="flex flex-col flex-1 h-full">
      <div className="w-full h-full max-w-md pt-10 mx-auto">
        {/* <Link
          to="/"
          className="inline-flex items-center text-sm text-gray-500 transition-colors hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-300"
        >
          <ChevronLeftIcon className="size-5" />
          Back to dashboard
        </Link> */}
      </div>
      <div className="flex flex-col justify-center align-middle flex-1 min-h-screen w-full max-w-md mx-auto">
        <div>
          <div className="mb-5 sm:mb-8">
            <h1 className="mb-2 font-semibold text-gray-800 text-title-sm dark:text-white/90 sm:text-title-md">
              Reset Password
            </h1>
            <p className="text-sm text-gray-500 dark:text-gray-400">
              Enter your token and New Password to change your credentials
            </p>
          </div>
          <div>
            <form onSubmit={handleSubmit}>
              <div className="space-y-6">
                <div>
                  <Label>
                    Token <span className="text-error-500">*</span>{" "}
                  </Label>
                  <Input
                    value={token}
                    onChange={(e) => setToken(e.target.value)}
                  />
                </div>
                <div>
                  <Label>
                    New Password <span className="text-error-500">*</span>{" "}
                  </Label>
                  <div className="relative">
                    <Input
                      type={showPassword ? "text" : "password"}
                      placeholder="Enter your password"
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                    />
                    <span
                      onClick={() => setShowPassword(!showPassword)}
                      className="absolute z-30 -translate-y-1/2 cursor-pointer right-4 top-1/2"
                    >
                      {showPassword ? (
                        <EyeIcon className="fill-gray-500 dark:fill-gray-400 size-5" />
                      ) : (
                        <EyeCloseIcon className="fill-gray-500 dark:fill-gray-400 size-5" />
                      )}
                    </span>
                  </div>
                </div>
                <div>
                  <Label>
                    Confirm New Password{" "}
                    <span className="text-error-500">*</span>{" "}
                  </Label>
                  <div className="relative">
                    <Input
                      type={showPassword ? "text" : "password"}
                      placeholder="Enter your password"
                      value={newPassword}
                      onChange={(e) => setNewPassword(e.target.value)}
                    />
                    <span
                      onClick={() => setShowPassword(!showPassword)}
                      className="absolute z-30 -translate-y-1/2 cursor-pointer right-4 top-1/2"
                    >
                      {showPassword ? (
                        <EyeIcon className="fill-gray-500 dark:fill-gray-400 size-5" />
                      ) : (
                        <EyeCloseIcon className="fill-gray-500 dark:fill-gray-400 size-5" />
                      )}
                    </span>
                  </div>
                </div>

                <div>
                  <Button className="w-full" size="sm">
                    Reset
                  </Button>
                </div>
              </div>
            </form>
            {message && <p className="mt-2 text-green-500">{message}</p>}
            {error && <p className="mt-2 text-red-500">{error}</p>}
          </div>
        </div>
      </div>
    </div>
  );
}
