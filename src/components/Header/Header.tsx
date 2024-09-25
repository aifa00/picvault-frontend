import { useContext } from "react";
import { UserContext } from "../../contexts/UserContext";
import { useNavigate } from "react-router-dom";
import AppLogo from "../../assets/AppLogo";

function Header() {
  const { user, setUser }: any = useContext(UserContext);
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem("token");
    setUser({
      isUser: false,
      email: "",
    });
    navigate("/login");
  };

  return (
    <div className="fixed bg-white/80 w-full top-0 lg:h-16 md:h-12 flex items-center justify-between z-40 px-4">
      <AppLogo />
      {user?.isUser && (
        <div className="flex items-center">
          {/* <input
            type="search"
            placeholder="Search image"
            className="mr-1 md:mr-10 p-2 outline-indigo-300 rounded md:w-80"
          /> */}
          <p className="mr-10 hidden md:block">{user?.email}</p>
          <button
            className="w-10 h-10 rounded-full hover:bg-gray-300"
            onClick={handleLogout}
          >
            <i className="fa-solid fa-power-off"></i>
          </button>
        </div>
      )}
    </div>
  );
}

export default Header;
