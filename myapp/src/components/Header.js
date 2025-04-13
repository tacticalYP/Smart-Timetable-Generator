import { Link } from "react-router-dom";

const Header = () => {
  return (
    <header className="bg-blue-600 text-white p-4 flex justify-between items-center shadow-md">
      <h1 className="text-2xl font-bold">Smart Timetable Generator</h1>
      <nav>
        <ul className="flex space-x-6">
          <li><Link to="/" className="hover:underline">Home</Link></li>
          <li><Link to="/upload" className="hover:underline">Upload Page</Link></li>
          <li><Link to="/previous_timetables" className="hover:underline">Previously Generated Timetables</Link></li>
          <li><Link to="/terms" className="hover:underline">Terms/Policy</Link></li>
        </ul>
      </nav>
    </header>
  );
};

export default Header;
