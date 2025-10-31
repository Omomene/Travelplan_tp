import { useState } from "react";
import { useNavigate } from "react-router-dom";

function Landing() {
  const [profile, setProfile] = useState("");
  const [country, setCountry] = useState("");
  const navigate = useNavigate();

  const handleStart = () => {
    if (profile && country) {
      localStorage.setItem("profile", profile);
      localStorage.setItem("country", country);
      navigate("/home");
    } else {
      alert("Please select both profile and country");
    }
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gradient-to-br from-purple-500 via-pink-500 to-orange-400 p-6">
      <h1 className="text-5xl font-bold text-white mb-4 text-center drop-shadow-lg">
        Welcome to TravelMate 
      </h1>
      <p className="text-white text-lg mb-8 text-center max-w-md drop-shadow">
        Discover attractions based on who you are and where you are.
      </p>

      <div className="flex flex-col md:flex-row gap-4 mb-6">
        <select
          value={profile}
          onChange={(e) => setProfile(e.target.value)}
          className="px-4 py-2 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-white text-gray-700"
        >
          <option value="">Select Profile</option>
          <option value="tourist">Tourist</option>
          <option value="local">Local</option>
          <option value="professional">Professional</option>
        </select>

        <select
          value={country}
          onChange={(e) => setCountry(e.target.value)}
          className="px-4 py-2 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-white text-gray-700"
        >
          <option value="">Select Country</option>
          <option value="France">France</option>
          <option value="Italy">Italy</option>
          <option value="Germany">Germany</option>
        </select>
      </div>

      <button
        onClick={handleStart}
        className="bg-white text-purple-600 font-semibold px-8 py-3 rounded-full shadow-lg hover:bg-purple-50 transition duration-300"
      >
        Start Exploring
      </button>
    </div>
  );
}

export default Landing;
