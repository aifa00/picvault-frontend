import React from "react";
import Header from "../components/Header/Header";
import LoginSignUpBackground from "../components/LoginSingUpBackground/LoginSignUpBackground";
import LoginForm from "../components/LoginForm/LoginForm";

function LoginPage() {
  return (
    <>
      <Header />
      <LoginSignUpBackground>
        <LoginForm />
      </LoginSignUpBackground>
    </>
  );
}

export default LoginPage;
