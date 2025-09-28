import { useState } from "react";

const SignIn = () => {
  const [formData, setFormData] = useState({
    username: "",
    password: "",
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    alert("Login logic goes here!");
  };

  const handleGoogleLogin = () => {
    alert("Google login logic goes here!");
  };

  return (
    <div className="flex justify-center items-center min-h-screen bg-gradient-to-br from-indigo-400 via-blue-300 to-cyan-200 px-4">
      <div className="bg-white/80 backdrop-blur-lg shadow-2xl rounded-2xl p-6 w-full max-w-sm sm:max-w-xs md:max-w-sm">
        <h2 className="text-3xl font-extrabold text-center mb-6 text-indigo-700">Welcome Back</h2>

        <form onSubmit={handleSubmit} className="space-y-3">
          <input
            type="text"
            name="username"
            placeholder="Username"
            onChange={handleChange}
            className="w-full px-3 py-1.5 text-sm border border-gray-300 rounded-md focus:ring focus:ring-indigo-300 outline-none"
          />

          <input
            type="password"
            name="password"
            placeholder="Password"
            onChange={handleChange}
            className="w-full px-3 py-1.5 text-sm border border-gray-300 rounded-md focus:ring focus:ring-indigo-300 outline-none"
          />

          <button
            type="submit"
            className="w-full bg-indigo-500 hover:bg-indigo-600 text-white py-1.5 rounded-md text-sm font-medium transition"
          >
            Log In
          </button>
        </form>

        <div className="mt-4">
          <button
            onClick={handleGoogleLogin}
            className="w-full bg-red-500 hover:bg-red-600 text-white py-1.5 rounded-md text-sm font-medium transition flex items-center justify-center gap-2"
          >
            <img src="https://www.svgrepo.com/show/475656/google-color.svg" alt="Google" className="w-4 h-4" />
            Log In with Google
          </button>
        </div>
      </div>
    </div>
  );
};

export default SignIn;
