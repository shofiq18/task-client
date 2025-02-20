

import { useAuth } from "../Provider/AuthProvider";


const Login = () => {
  const { loginWithGoogle } = useAuth();

  return (
    <div className="flex items-center justify-center h-screen bg-gray-100">
      <div className="p-8 bg-white rounded shadow-md text-center">
        <h1 className="text-2xl font-bold mb-4">Task Manager</h1>
        <button
          className="px-4 py-2 bg-blue-500 text-white rounded"
          onClick={loginWithGoogle}
        >
          Sign in with Google
        </button>
      </div>
    </div>
  );
};

export default Login;
