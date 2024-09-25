function LoginSignUpBackground({ children }: any) {
  return (
    <div className="flex">
      <div className="bg-indigo-300 w-[30rem] h-screen flex items-center justify-center">
        {children}
      </div>
      <div className="h-screen grow bg-[url('https://res.cloudinary.com/cloudinary-marketing/images/w_2000,h_1100/f_auto,q_auto/v1647045699/44_auto_migrate/44_auto_migrate-jpg?_i=AA')] bg-cover bg-center"></div>
    </div>
  );
}

export default LoginSignUpBackground;
