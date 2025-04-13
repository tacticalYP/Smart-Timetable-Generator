import { Link } from "react-router-dom";
import Header from "../components/Header";
import "./styles/HomePage.css"

const HomePage = () => {
  return (
    <div className="min-h-screen bg-gray-100">
      <Header />
      <div className="max-w-3xl mx-auto text-center mt-20">
        <h2 className="text-3xl font-bold text-gray-800">
          Welcome to Smart Timetable Generator
        </h2>
        <p className="text-gray-600 mt-4">
          Upload an image of your subject list, and we'll generate a well-structured timetable for you. 
          Save, edit, and export it in various formats.
        </p>

        <Link to="/upload">
          <button className="bt">
            Get Started
          </button>
        </Link>
      </div>
    </div>
  );
};

export default HomePage;
