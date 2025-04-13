// import { Link } from "react-router-dom";

// export default function App() {
//   return (
//     <div className="min-h-screen flex flex-col items-center bg-gray-100">
//       {/* Header */}
//       <header className="w-full bg-blue-600 text-white py-4 px-6 flex justify-between items-center shadow-md">
//         <h1 className="text-2xl font-bold">Smart Timetable Generator</h1>
//         <nav>
//           <ul className="flex space-x-6">
//             <li><Link to="/" className="hover:underline">Home</Link></li>
//             <li><Link to="/upload" className="hover:underline">Upload Page</Link></li>
//             <li><Link to="/history" className="hover:underline">Previously Generated</Link></li>
//             <li><Link to="/terms" className="hover:underline">Terms/Policy</Link></li>
//           </ul>
//         </nav>
//       </header>

//       <main className="flex flex-col items-center justify-center flex-grow text-center px-6">
//         <h2 className="text-4xl font-bold text-gray-800 mt-16">Generate Your Timetable Effortlessly</h2>
//         <p className="text-lg text-gray-600 mt-4 max-w-2xl">
//           Upload an image of your subject list, and our intelligent system will process the data to create a well-structured and editable timetable. Easily export it as an image, PDF, or Excel file.
//         </p>
//         <Link to="/upload">
//           <button className="mt-6 px-6 py-3 bg-blue-600 text-white text-lg rounded-lg shadow-md hover:bg-blue-700 transition-all">
//             Get Started
//           </button>
//         </Link>
//       </main>
//     </div>
//   );
// }


import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import HomePage from "./pages/HomePage";
import UploadPage from "./pages/UploadPage";
import TimetablePage from "./pages/TimetablePage";
import PreviousTimetables from "./pages/PreviousTimetables";

const App = () => {
  return (
    
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/upload" element={<UploadPage />} />
        <Route path="/timetable" element={<TimetablePage />} />
        <Route path="/previous_timetables" element={<PreviousTimetables />} />
      </Routes>
    
  );
};

export default App;




// TEMP
// import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
// import Home from "./Home";
// import NextPage from "./NextPage";
// import "./styles.css"
// function App() {
//   return (
//       <Routes>
//         <Route path="/" element={<Home />} />
//         <Route path="/next" element={<NextPage />} />
//       </Routes>
    
//   );
// }


// // // local storage // //

// import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
// import FormPage from "./FormPage";
// import TitleListPage from "./TitleListPage";

// function App() {
//   return (
    
//       <Routes>
//         <Route path="/" element={<FormPage />} />
//         <Route path="/titles" element={<TitleListPage />} />
//       </Routes>
    
//   );
// }

// export default App;


// //// Ag-grid table///////

// import React from "react";
// import DataTable from "./DataTable";

// const App = () => {
//   return (
//     <div>
//       <h1 className="title">Editable ag-Grid Table</h1>
//       <DataTable />
//     </div>
//   );
// };

// export default App;


