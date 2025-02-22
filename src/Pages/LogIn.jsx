import { useEffect } from "react";
import { useAuth } from "../Provider/AuthProvider";
import { useNavigate } from "react-router-dom";

const Login = () => {
  const { loginWithGoogle, user } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    if (user) {
      navigate("/"); // Redirect to home if the user is already logged in
    }
  }, [user, navigate]);

  return (
    <div className="flex items-center justify-center h-screen bg-gray-100">
      <div className="p-8 bg-white rounded shadow-md text-center">
        <h1 className="text-2xl font-bold mb-4">Task Manager</h1>
        <button
          className="px-4 py-2 bg-blue-500 text-white rounded"
          onClick={async () => {
            await loginWithGoogle();
            navigate("/"); // Redirect after successful login
          }}
        >
          Sign in with Google
        </button>
      </div>
    </div>
  );
};

export default Login;
