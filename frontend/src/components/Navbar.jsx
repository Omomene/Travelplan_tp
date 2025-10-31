import { Link } from "react-router-dom";

function Navbar() {
  const handleLogout = () => {
    localStorage.clear();
    window.location.href = "/";
  };

  return (
    <nav className="bg-purple-600 text-white shadow-md sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-6 py-4 flex justify-between items-center">
        <h1 className="text-2xl font-bold cursor-pointer">
          <Link to="/home">TravelMate</Link>
        </h1>

        <div className="flex items-center gap-6">
          <Link
            to="/home"
            className="hover:text-purple-200 transition-colors duration-200"
          >
            Home
          </Link>
          <Link
            to="/search"
            className="hover:text-purple-200 transition-colors duration-200"
          >
            Search
          </Link>
          <Link
            to="/mylist"
            className="hover:text-purple-200 transition-colors duration-200"
          >
            My List
          </Link>
          <button
            onClick={handleLogout}
            className="bg-white text-purple-600 font-semibold px-4 py-2 rounded-lg hover:bg-gray-100 transition-colors duration-200"
          >
            Logout
          </button>
        </div>
      </div>
    </nav>
  );
}

export default Navbar;
