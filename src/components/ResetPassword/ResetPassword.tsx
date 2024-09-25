import InputGroup from "../InputGroup/InputGroup";
import Button from "../../assets/Button";
import AppLogo from "../../assets/AppLogo";
import { useState } from "react";
import axios from "../../axiosConfig";
import { useLocation } from "react-router-dom";

function ResetPassword() {
  const [loading, setLoading] = useState(false);
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [successMessage, setSuccessMessage] = useState("");
  const location = useLocation();

  const handleSubmit = async () => {
    try {
      if (error) setError("");
      if (successMessage) setSuccessMessage("");

      let hasError = false;

      // Validate Password
      if (!password) {
        hasError = true;
        setError("Please enter a password.");
      } else if (password.length < 6) {
        hasError = true;
        setError("Password must be at least 6 characters long.");
      }

      if (hasError) return;

      if (loading) return;

      setLoading(true);

      const queryParams = new URLSearchParams(location.search);
      const token = queryParams.get("token");

      if (!token) return setError("Invalid Url");

      await axios.post(`/reset-password`, {
        token,
        password,
      });

      setPassword("");

      setSuccessMessage("Your password reset successfully");
    } catch (error: any) {
      const errorMessage: string = error.response?.data?.message || "";
      setError(errorMessage);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen p-10 bg-gradient-to-l from-indigo-500 to-indigo-300 flex items-center justify-center">
      <div className="w-96">
        <div className="text-center">
          <AppLogo /> <br />
          <h1 className="font-bold text-2xl">Reset Password</h1>
        </div>
        <br /> <br />
        {!successMessage && (
          <label>
            New password
            <InputGroup
              type={"text"}
              placeholder={"New rouPassword"}
              value={password}
              onChange={(e: any) => setPassword(e.target.value)}
              error={error}
            />
          </label>
        )}
        {successMessage && (
          <span className="block text-green-800 bg-green-400 mt-3 p-5">
            {successMessage}
          </span>
        )}
        {!successMessage && (
          <Button label={"SUBMIT"} loading={loading} onClick={handleSubmit} />
        )}
      </div>
    </div>
  );
}

export default ResetPassword;
