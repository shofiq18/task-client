
import { useEffect } from "react";
import { useAuth } from "../Provider/AuthProvider";
import { useNavigate } from "react-router-dom";
import { FcGoogle } from "react-icons/fc";


const Login = () => {
  const { loginWithGoogle, user } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    if (user) {
      navigate("/"); // Redirect to home if the user is already logged in
    }
  }, [user, navigate]);

  return (
    <div className="flex items-center justify-center h-screen bg-gradient-to-r from-blue-500 to-green-500">
      <div className="p-8 bg-white rounded-lg shadow-xl w-full max-w-sm text-center">
        <h1 className="text-3xl font-bold mb-6 text-blue-500">Task Manager</h1>
        <p className="mb-8 text-gray-600">Sign in to manage your tasks effortlessly!</p>
        <button
          className="flex items-center justify-center px-4 py-2 bg-blue-500 text-white rounded-lg shadow-md w-full gap-3 hover:bg-blue-600 transition-colors"
          onClick={async () => {
            await loginWithGoogle();
            navigate("/"); // Redirect after successful login
          }}
        >
          <FcGoogle />

          Sign in with Google
        </button>
      </div>
    </div>
  );
};

export default Login;
