import Button from "../../assets/Button";
import InputGroup from "../InputGroup/InputGroup";
import { useState } from "react";
import axios from "../../axiosConfig";
import { useNavigate } from "react-router-dom";

function SignupForm() {
  const [loading, setLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [error, setError] = useState({
    emailError: "",
    phoneError: "",
    passwordError: "",
    commonError: "",
  });
  const navigate = useNavigate();

  const handleSubmit = async () => {
    try {
      let hasError = false;
      let errorObj = {
        emailError: "",
        phoneError: "",
        passwordError: "",
        commonError: "",
      };

      // Validate Email
      if (!email.trim()) {
        hasError = true;
        errorObj.emailError = "Please enter your email address.";
      } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
        hasError = true;
        errorObj.emailError = "Please enter a valid email address.";
      }

      // Validate Phone Number
      if (!phone.trim()) {
        hasError = true;
        errorObj.phoneError = "Phone number is required.";
      } else if (!/^\d{10}$/.test(phone)) {
        hasError = true;
        errorObj.phoneError = "Please enter a valid phone number";
      }

      // Validate Password
      if (!password) {
        hasError = true;
        errorObj.passwordError = "Please enter a password.";
      } else if (password.length < 6) {
        hasError = true;
        errorObj.passwordError = "Password must be at least 6 characters long.";
      }

      setError(errorObj);

      if (hasError) return;

      if (loading) return;

      setLoading(true);

      await axios.post(`/register`, {
        email,
        phone,
        password,
      });

      navigate("/login");
    } catch (error: any) {
      const status = error.response ? error.response.status : null;
      const errorMessage: string = error.response.data.message;

      if (status === 409) {
        setError({
          ...error,
          commonError: errorMessage,
        });
      }
    } finally {
      setLoading(false);
    }
  };

  const navigateToLogin = () => {
    navigate("/login");
  };

  return (
    <div className="w-3/4 bg-indigo-100 p-10 rounded-lg text-center">
      <h1 className="mb-8 font-bold">SIGNUP</h1>

      <InputGroup
        label={"Email"}
        type={"email"}
        value={email}
        onChange={(e: any) => setEmail(e.target.value)}
        placeholder={"Email"}
        error={error.emailError}
      />
      <InputGroup
        label={"Phone"}
        type={"text"}
        value={phone}
        onChange={(e: any) => setPhone(e.target.value)}
        placeholder={"Phone"}
        error={error.phoneError}
      />
      <div className="relative">
        <InputGroup
          label={"Password"}
          type={showPassword ? "text" : "password"}
          value={password}
          onChange={(e: any) => setPassword(e.target.value)}
          placeholder={"Password"}
          error={error.passwordError}
        />
        <i
          className={`fa-solid ${
            showPassword ? "fa-eye-slash" : "fa-eye"
          } cursor-pointer text-slate-500 absolute top-9 right-5`}
          onClick={() => setShowPassword(!showPassword)}
        ></i>
      </div>
      <Button
        label={"SIGNUP"}
        onClick={handleSubmit}
        loading={loading}
        error={error.commonError}
      />
      <span className="block mt-3">
        Already have an account?
        <strong className="underline cursor-pointer" onClick={navigateToLogin}>
          Login
        </strong>
      </span>
    </div>
  );
}

export default SignupForm;
