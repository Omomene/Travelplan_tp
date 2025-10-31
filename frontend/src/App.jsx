import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Landing from "./pages/Landing";
import Home from "./pages/Home";
import Search from "./pages/Search";
import AttractionDetail from "./pages/AttractionDetail";
import MyList from "./pages/MyList";
import Navbar from "./components/Navbar";



function App() {
  return (
    <Router>
      <Navbar />
      <Routes>
        <Route path="/" element={<Landing />} />
        <Route path="/home" element={<Home />} />
        <Route path="/search" element={<Search />} />
        <Route path="/attraction/:id" element={<AttractionDetail />} />
        <Route path="/mylist" element={<MyList />} />
      </Routes>
    </Router>
  );
}

export default App;
