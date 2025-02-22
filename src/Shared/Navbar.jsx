
import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { signOut, onAuthStateChanged } from "firebase/auth";
import { auth } from "../firebase.config";

const Navbar = () => {
  const [user, setUser] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser);
    });
    return () => unsubscribe();
  }, []);

  const handleLogout = async () => {
    try {
      await signOut(auth);
      setUser(null);
      navigate("/login");
    } catch (error) {
      console.error("Logout failed:", error.message);
    }
  };

  const navOptions = (
    <>
      <li>
        <Link to="/">Home</Link>
      </li>
      {user && (
        <li>
          <Link to="/profile">Profile</Link>
        </li>
      )}
    </>
  );

  return (
    <div className="sticky top-0 z-50 bg-gradient-to-r from-gray-900 to-gray-800 shadow-md border-b border-gray-700">
      <div className="navbar container mx-auto text-white">
        {/* Left Side (Logo & Dropdown for Mobile) */}
        <div className="navbar-start">
          <div className="dropdown">
            <button tabIndex={0} className="btn btn-ghost lg:hidden">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-6 w-6"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M4 6h16M4 12h8m-8 6h16"
                />
              </svg>
            </button>
            <ul
              tabIndex={0}
              className="menu menu-sm dropdown-content gap-4 bg-gray-800 text-white rounded-box z-[1] mt-3 w-52 p-2 shadow-lg"
            >
              {navOptions}
            </ul>
          </div>
          <div>
            <span className="font-bold text-2xl md:text-3xl text-blue-500">Task</span>
            <span className="font-bold text-2xl md:text-3xl text-yellow-500">Manager</span>
          </div>
        </div>

        {/* Center (Navigation for Desktop) */}
        <div className="navbar-center hidden lg:flex">
          <ul className="menu menu-horizontal gap-6 px-1">{navOptions}</ul>
        </div>

        {/* Right Side (User Section) */}
        <div className="navbar-end">
          {user ? (
            <div className="flex items-center space-x-4">
              {user.photoURL && (
                <img
                  src={user.photoURL}
                  alt="User"
                  className="w-9 h-9 rounded-full border-2 border-gray-600"
                />
              )}
              <button
                onClick={handleLogout}
                className="btn btn-outline bg-red-600 text-white btn-sm border-gray-500 hover:bg-gray-700"
              >
                Logout
              </button>
            </div>
          ) : (
            <button
              onClick={() => navigate("/login")}
              className="btn bg-blue-500 text-white btn-sm px-4"
            >
              Login
            </button>
          )}
        </div>
      </div>
    </div>
  );
};

export default Navbar;
