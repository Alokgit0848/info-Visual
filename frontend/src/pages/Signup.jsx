import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { GoogleOAuthProvider, GoogleLogin } from "@react-oauth/google";
import { jwtDecode } from "jwt-decode"; 

export default function Signup() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate(); 
  const handleGoogleSuccess = (response) => {
    const token = response.credential;
    const decodedUser = jwtDecode(token); 

    console.log("Google Sign-In Success:", decodedUser);

    localStorage.setItem("user", JSON.stringify(decodedUser));
    navigate("/api/user/profile"); 
  };

  const handleGoogleFailure = () => {
    console.error("Google Sign-In Failed");
  };


  const handleSubmit = async (e) => {
    e.preventDefault();
  
    try {
      const response = await fetch("http://localhost:5000/api/auth/signup", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email, password }),
      });
  
      if (response.ok) {
        const data = await response.json();
        console.log("Signup successful:", data);
        navigate("/api/auth/login");
      } else {
        const error = await response.json();
        console.error("Signup failed:", error.message);
        alert(error.message);
      }
    } catch (err) {
      console.error("Error during signup:", err);
      alert("An error occurred. Please try again.");
    }
  };


  return (
    <GoogleOAuthProvider clientId="1089067771054-ljlj09n0ei28lincjsgd9riqhio63uu9.apps.googleusercontent.com">
      <div className="min-h-screen bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500 flex flex-col">
        {/* Navbar */}
        <nav className="bg-white shadow-md">
          <div className="container mx-auto flex justify-between items-center p-4">
            <h1 className="text-2xl font-bold text-blue-600"><Link to="/">MyApp</Link></h1>
            <div>
              <Link to="/api/auth/login" className="text-blue-600 hover:underline">
                Login
              </Link>
            </div>
          </div>
        </nav>

        {/* Signup Form */}
        <div className="flex flex-1 items-center justify-center">
          <div className="w-full max-w-md rounded-lg bg-white p-8 shadow-lg">
            <h2 className="mb-6 text-center text-3xl font-bold text-gray-800">
              Sign Up
            </h2>
            <form onSubmit={handleSubmit} className="space-y-6">
              <input
                type="email"
                placeholder="Email"
                className="w-full rounded-md border border-gray-300 p-3 focus:outline-none focus:ring-2 focus:ring-blue-500"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
              <input
                type="password"
                placeholder="Password"
                className="w-full rounded-md border border-gray-300 p-3 focus:outline-none focus:ring-2 focus:ring-blue-500"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
              <button className="w-full rounded-md bg-blue-500 p-3 text-white font-semibold hover:bg-blue-600">
                Sign Up
              </button>
            </form>
            <div className="mt-6">
              <GoogleLogin
                onSuccess={handleGoogleSuccess}
                onError={handleGoogleFailure}
                text="signup_with"
                shape="pill"
                theme="outline"
                width="100%"
              />
            </div>
            <p className="mt-6 text-center text-sm text-gray-600">
              Already have an account?{" "}
              <Link to="/api/auth/login" className="text-blue-500 hover:underline">
                Login
              </Link>
            </p>
          </div>
        </div>
      </div>
    </GoogleOAuthProvider>
  );
}
