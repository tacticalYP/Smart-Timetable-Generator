import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import HomePage from "./pages/HomePage";
import UploadPage from "./pages/UploadPage";
import TimetablePage from "./pages/TimetablePage";

const App = () => {
  return (
    
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/upload" element={<UploadPage />} />
        <Route path="/timetable" element={<TimetablePage />} />
      </Routes>
    
  );
};

export default App;