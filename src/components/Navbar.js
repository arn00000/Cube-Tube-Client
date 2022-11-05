import Logo from "../images/cubetube.png";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import { logout } from "../api/users";
import jwt_decode from "jwt-decode";
function Navbar() {
  const navigate = useNavigate();
  const decoded = localStorage.getItem("token")
    ? jwt_decode(localStorage.getItem("token"))
    : null;
  return (
    <>
      <nav className="lg:px-16 px-8 bg-gray-100 md:bg-white flex flex-wrap items-center py-3 md:py-4 ">
        <div className="flex-1 flex justify-between items-center">
          <Link to="/" className="focus:outline-none focus:ring-0">
            <img src={Logo} alt="" className="w-32 md:w-52" />
          </Link>
        </div>

        <label htmlFor="menu-toggle" className="pointer-cursor md:hidden block">
          <svg
            className="fill-current text-white"
            xmlns="http://www.w3.org/2000/svg"
            width="20"
            height="20"
            viewBox="0 0 20 20"
          >
            <title>menu</title>
            <path d="M0 3h20v2H0V3zm0 6h20v2H0V9zm0 6h20v2H0v-2z"></path>
          </svg>
        </label>
        <input className="hidden" type="checkbox" id="menu-toggle" />

        <div
          className="hidden md:flex md:items-center md:w-auto w-full"
          id="menu"
        >
          <nav>
            <ul className="h-52 md:h-0 space-y-5 md:space-y-0 md:flex items-center justify-between text-base text-gray-700 pt-4 md:pt-0 md:space-x-5">
              {!localStorage.getItem("token") ? (
                <>
                  <li>
                    <Link
                      className="block text-center text-orange-700 border-2 border-orange-700 rounded-lg px-8 py-2 hover:bg-orange-700 hover:text-white focus-ring-0"
                      to="/register"
                    >
                      Register
                    </Link>
                  </li>
                  <li>
                    <Link
                      className="block text-center text-orange-700 border-2 border-orange-700 rounded-lg px-8 py-2 hover:bg-orange-700 hover:text-white"
                      to="/login"
                    >
                      Sign in
                    </Link>
                  </li>
                </>
              ) : (
                <>
                  <div className="md:hidden w-full text-center bg-orange-700 rounded-lg px-4 py-2 text-white text-xl font-semibold">
                    {decoded.data.name}
                  </div>
                  <li>
                    <button
                      onClick={() => {
                        logout();
                        navigate("/");
                      }}
                      className="md:hidden w-full text-center bg-orange-700 rounded-lg px-8 py-2 text-white"
                    >
                      Logout
                    </button>
                  </li>
                </>
              )}
            </ul>
          </nav>
        </div>
      </nav>
    </>
  );
}

export default Navbar;
