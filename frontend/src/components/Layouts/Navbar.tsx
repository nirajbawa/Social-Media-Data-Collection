import { Link } from "react-router-dom";
import useTheme from "../../hooks/useTheme";
import useAuth from "../../hooks/useAuth";

const Navbar = () => {
  const [theme] = useTheme();
  const [authData, setAuthData] = useAuth();
  return (
    <div
      data-theme={theme ? "dark" : "light"}
      className="navbar bg-base-100 fixed top-0 z-50"
    >
      <div className="flex-1">
        <Link to="/" className="btn btn-ghost text-xl">
          Social Media Tracker
        </Link>
      </div>
      <div className="flex-none">
        <ul className="menu menu-horizontal px-1 gap-x-2">
          <li>
            <Link to="/">Home</Link>
          </li>
          {authData.isAuthenticated ? (
            <li>
              <button
                onClick={() => {
                  setAuthData({
                    isAuthenticated: false,
                    username: "",
                    token: "",
                  });
                }}
              >
                Logout
              </button>
            </li>
          ) : (
            <li>
              <Link to="/login">Login</Link>
            </li>
          )}
        </ul>
      </div>
    </div>
  );
};

export default Navbar;
