import { useState } from "react";

const Signup = () => {
  const [formData, setFormData] = useState({
    secretKey: "",
    name: "",
    email: "",
    username: "",
    password: ""
  });

  const [error, setError] = useState("");

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    // Basic Validation
    if (!formData.secretKey || !formData.name || !formData.email || !formData.username || !formData.password) {
      setError("All fields are required!");
      return;
    }

    if (!/\S+@\S+\.\S+/.test(formData.email)) {
      setError("Invalid email format!");
      return;
    }

    setError(""); 
    console.log("Signup Data:", formData);

    alert("Signup successful! (Implement API here)");
  };

  const handleGoogleAuth = () => {
    alert("Google Authentication Clicked (Integrate Firebase/Auth API)");
  };

  return (
    <div className="flex justify-center items-center min-h-screen bg-gray-100">
      <div className="w-full max-w-md bg-white shadow-lg rounded-lg p-6">
        <h2 className="text-2xl font-bold text-center mb-4">Sign Up</h2>

        {error && <p className="text-red-500 text-sm mb-2">{error}</p>}

        <form onSubmit={handleSubmit} className="space-y-4">
          
          

          <input 
            type="text" 
            name="name" 
            placeholder="Full Name" 
            onChange={handleChange} 
            className="w-full px-4 py-2 border rounded-lg"
          />

          <input 
            type="email" 
            name="email" 
            placeholder="Email ID" 
            onChange={handleChange} 
            className="w-full px-4 py-2 border rounded-lg"
          />

          <input 
            type="text" 
            name="username" 
            placeholder="Username" 
            onChange={handleChange} 
            className="w-full px-4 py-2 border rounded-lg"
          />

          <input 
            type="password" 
            name="password" 
            placeholder="Password" 
            onChange={handleChange} 
            className="w-full px-4 py-2 border rounded-lg"
          />

          <button type="submit" className="w-full bg-blue-500 hover:bg-blue-600 text-white py-2 rounded-lg">
            Sign Up
          </button>
        </form>

        <div className="mt-4 text-center">
          <button
            onClick={handleGoogleAuth}
            className="w-full bg-red-500 hover:bg-red-600 text-white py-2 rounded-lg"
          >
            Sign Up with Google
          </button>
        </div>
      </div>
    </div>
  );
};

export default Signup;
