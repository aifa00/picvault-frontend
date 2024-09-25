import Header from "../components/Header/Header";
import LoginSignUpBackground from "../components/LoginSingUpBackground/LoginSignUpBackground";
import SignupForm from "../components/SignupForm/SignupForm";

function Signup() {
  return (
    <>
      <Header />
      <LoginSignUpBackground>
        <SignupForm />
      </LoginSignUpBackground>
    </>
  );
}

export default Signup;
