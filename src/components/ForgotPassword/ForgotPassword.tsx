import AppLogo from "../../assets/AppLogo";
import InputGroup from "../InputGroup/InputGroup";
import Button from "../../assets/Button";
import { useState } from "react";
import axios from "../../axiosConfig";
import { useNavigate } from "react-router-dom";

function ForgotPassword() {
  const [loading, setLoading] = useState(false);
  const [email, setEmail] = useState("");
  const [error, setError] = useState("");
  const [successMessage, setSuccessMessage] = useState("");
  const navigate = useNavigate();

  const handleSubmit = async () => {
    try {
      if (error) setError("");
      if (successMessage) setSuccessMessage("");

      let hasError = false;

      // Validate Email
      if (!email.trim()) {
        hasError = true;
        setError("Please enter your email");
      } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
        hasError = true;
        setError("Please enter a valid email");
      } else {
        setError("");
      }

      if (hasError) return;

      if (loading) return;

      setLoading(true);

      await axios.post(`/forgot-password`, { email: email.trim() });

      setEmail("");
      setSuccessMessage(
        "A password reset link has been sent to your email. Please check your mail"
      );
    } catch (error: any) {
      const errorMessage = error.response?.data?.message || "";
      setError(errorMessage);
    } finally {
      setLoading(false);
    }
  };

  const navigateToLogin = () => {
    navigate("/login");
  };
  return (
    <div className="min-h-screen p-10 bg-gradient-to-l from-indigo-500 to-indigo-300 flex items-center justify-center">
      <div className="w-96 shadow-xl p-5 bg-indigo-200">
        <div className="text-center">
          <AppLogo />
        </div>
        <br />
        <h1 className="font-bold">Forgot your password ?</h1> <br />
        <p>
          Please enter the email address you'd like your password reset
          information sent to
        </p>{" "}
        <br />
        <label>
          Enter email address
          <InputGroup
            type={"text"}
            placeholder={"Email"}
            value={email}
            onChange={(e: any) => setEmail(e.target.value)}
            error={error}
          />
        </label>
        {successMessage && (
          <span className="block text-green-800 bg-green-400 mt-3 p-5">
            {successMessage}
          </span>
        )}
        <Button
          label={"Request Reset Link"}
          loading={loading}
          onClick={handleSubmit}
        />
        <div className="text-center mt-4">
          <span
            className="underline text-indigo-500 font-bold cursor-pointer"
            onClick={navigateToLogin}
          >
            Back to Login
          </span>
        </div>
      </div>
    </div>
  );
}

export default ForgotPassword;
