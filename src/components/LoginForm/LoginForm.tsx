import Button from "../../assets/Button";
import InputGroup from "../InputGroup/InputGroup";
import { useContext, useState } from "react";
import axios from "../../axiosConfig";
import { useNavigate } from "react-router-dom";
import { UserContext } from "../../contexts/UserContext";

function LoginForm() {
  const [loading, setLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState<string>("");
  const [error, setError] = useState({
    emailError: "",
    passwordError: "",
    commonError: "",
  });
  const { setUser }: any = useContext(UserContext);
  const navigate = useNavigate();

  const handleSubmit = async () => {
    try {
      let hasError = false;
      let errorObj = {
        emailError: "",
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

      const { data } = await axios.post(`/login`, {
        email: email.trim(),
        password,
      });

      navigate("/");

      localStorage.setItem("token", data.token);

      setUser(data.userData);
    } catch (error: any) {
      const status = error.response ? error.response.status : null;
      const errorMessage: string = error.response.data.message;

      if (status === 401 || status === 404) {
        setError({
          ...error,
          commonError: errorMessage,
        });
      }
    } finally {
      setLoading(false);
    }
  };

  const navigateToSignup = () => {
    navigate("/register");
  };

  const navigateToForgotPassword = () => {
    navigate("/forgot-password");
  };
  return (
    <div className="w-3/4 bg-indigo-100 p-10 rounded-lg text-center">
      <h1 className="mb-8 font-bold">LOGIN</h1>

      <InputGroup
        label={"Email"}
        type={"email"}
        value={email}
        onChange={(e: any) => setEmail(e.target.value)}
        placeholder={"Email"}
        error={error.emailError}
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
        <span
          className="absolute top-full right-0 text-blue-600 cursor-pointer hover:underline"
          onClick={navigateToForgotPassword}
        >
          Forgot password
        </span>
      </div>
      <Button
        label={"LOGIN"}
        onClick={handleSubmit}
        loading={loading}
        error={error.commonError}
      />
      <span className="block mt-3">
        Already have an account?
        <strong className="underline cursor-pointer" onClick={navigateToSignup}>
          {" "}
          Signup
        </strong>
      </span>
    </div>
  );
}

export default LoginForm;
