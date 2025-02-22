import { useAuth } from "../Provider/AuthProvider";

const Profile = () => {
  const { user } = useAuth(); // Access user from context

  if (!user) {
    return <div className="text-center text-xl">Loading...</div>;
  }

  return (
    <div className="min-h-screen bg-gradient-to-r from-blue-500 to-green-500  pt-20 py-8">
      <div className="max-w-7xl mx-auto px-6 sm:px-12">
        <div className="bg-white rounded-lg shadow-lg p-6 md:flex md:space-x-8">
          {/* Left Column: User Photo */}
          <div className="md:w-1/3 flex justify-center mb-6 md:mb-0">
            <img
              src={user.photoURL || "https://via.placeholder.com/150"}
              alt="User Icon"
              className="w-40 h-40 rounded-full border-4 border-indigo-600 shadow-lg"
            />
          </div>

          {/* Right Column: User Details */}
          <div className="md:w-2/3">
            <h1 className="text-3xl font-semibold text-gray-800">{user.displayName || "User Name"}</h1>
            <p className="text-lg text-gray-600">{user.email}</p>

            <div className="mt-6 space-y-4">
              <div className="flex items-center space-x-4">
                <p className="text-gray-800 font-medium">UID:</p>
                <p className="text-gray-600">{user.uid}</p>
              </div>

              <div className="flex items-center space-x-4">
                <p className="text-gray-800 font-medium">Email Verified:</p>
                <p className={`text-${user.emailVerified ? "green" : "red"}-500`}>
                  {user.emailVerified ? "Yes" : "No"}
                </p>
              </div>

              {/* Fix for Undefined Metadata */}
              <div className="flex items-center space-x-4">
                <p className="text-gray-800 font-medium">Joined:</p>
                <p className="text-gray-600">
                  {user.metadata?.creationTime ? new Date(user.metadata.creationTime).toLocaleDateString() : "N/A"}
                </p>
              </div>
            </div>
          </div>
        </div>

      
      </div>
    </div>
  );
};

export default Profile;
