// import { signInWithPopup } from "firebase/auth";
// import { useNavigate } from "react-router-dom";
// import { auth, provider } from "../firebase.config";

// const Login = () => {
//   const navigate = useNavigate();

//   const handleGoogleSignIn = async () => {
//     try {
//       const result = await signInWithPopup(auth, provider);
//       console.log(result.user);
//       navigate("/");
//     } catch (error) {
//       console.error(error.message);
//     }
//   };

//   return (
//     <div className="flex items-center justify-center h-screen bg-gray-100">
//       <div className="p-8 bg-white rounded shadow-md text-center">
//         <h1 className="text-2xl font-bold mb-4">Task Manager</h1>
//         <button
//           className="px-4 py-2 bg-blue-500 text-white rounded"
//           onClick={handleGoogleSignIn}
//         >
//           Sign in with Google
//         </button>
//       </div>
//     </div>
//   );
// };

// export default Login;
import { signInWithPopup } from "firebase/auth";
import { useNavigate } from "react-router-dom";
import { auth, provider } from "../firebase.config";
import axios from "axios";

const Login = () => {
  const navigate = useNavigate();

  const handleGoogleSignIn = async () => {
    try {
      // Sign in with Google
      const result = await signInWithPopup(auth, provider);
      const user = result.user;

      // Log the user object for debugging
      console.log("User Info:", user);

      // Send user details to the backend for storing in the database
      await axios.post("http://localhost:5000/users/login", {
        userId: user.uid,
        email: user.email,
        displayName: user.displayName,
      });

      // Navigate to the home page after successful login
      navigate("/");
    } catch (error) {
      console.error("Google Sign-In Error:", error.message);
    }
  };

  return (
    <div className="flex items-center justify-center h-screen bg-gray-100">
      <div className="p-8 bg-white rounded shadow-md text-center">
        <h1 className="text-2xl font-bold mb-4">Task Manager</h1>
        <button
          className="px-4 py-2 bg-blue-500 text-white rounded"
          onClick={handleGoogleSignIn}
        >
          Sign in with Google
        </button>
      </div>
    </div>
  );
};

export default Login;
