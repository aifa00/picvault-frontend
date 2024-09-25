import "./App.css";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import SignupPage from "./pages/SignupPage";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import HomePage from "./pages/HomePage";
import LoginPage from "./pages/LoginPage";
import { useContext, useState, useEffect } from "react";
import { UserContext } from "./contexts/UserContext";
import axios from "./axiosConfig";
import AppLoader from "./assets/AppLoader";
import ForgotPasswordPage from "./pages/ForgotPasswordPage";
import ResetPasswordPage from "./pages/ResetPasswordPage";

function App() {
  const [loading, setLoading] = useState(false);
  const { user, setUser }: any = useContext(UserContext);
  useEffect(() => {
    const getUser = async () => {
      try {
        setLoading(true);
        const { data } = await axios.get("/auth/user");
        setUser(data.userData);
      } catch (error) {
        setUser({
          isUser: false,
          email: "",
        });
        console.log(error);
      } finally {
        setLoading(false);
      }
    };

    getUser();
  }, []);

  if (loading) return <AppLoader />;
  return (
    <>
      <ToastContainer />
      <BrowserRouter>
        <Routes>
          <Route
            path="/register"
            Component={user.isUser ? HomePage : SignupPage}
          />
          <Route path="/login" Component={user.isUser ? HomePage : LoginPage} />
          <Route path="/" Component={user.isUser ? HomePage : LoginPage} />
          <Route path="/forgot-password" Component={ForgotPasswordPage} />
          <Route path="/reset-password" Component={ResetPasswordPage} />
          <Route path="*" element={<p>404 Page Not Found</p>} />
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
