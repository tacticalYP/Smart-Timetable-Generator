import Header from "../components/Header";
import SubjectsSlotsTable from "../components/SubjectsSlotsTable";
// import "./styles/TimetablePage.css";

const TimetablePage = () => (
  <div>
    <Header />
    <h2 className="title">Generated Timetable</h2>
    <SubjectsSlotsTable />
  </div>
);

export default TimetablePage;


// import { useState, useEffect } from "react";
// import axios from "axios";
// import { AgGridReact } from "ag-grid-react";
// import "ag-grid-community/styles/ag-grid.css";
// import "ag-grid-community/styles/ag-theme-alpine.css";
// // import "./styles/TimetablePage.css";

// const TimetablePage = () => {
//   const [rowData, setRowData] = useState([]);

//   useEffect(() => {
//     axios.get("http://localhost:8000/generate_timetable")
//       .then((response) => setRowData(response.data))
//       .catch((error) => console.error("Error fetching timetable:", error));
//   }, []);

//   const columnDefs = [
//     { headerName: "Subject", field: "subject" },
//     { headerName: "Slot", field: "slot" },
//   ];

//   return (
//     <div className="ag-theme-alpine timetable-container">
//       <h2>Final Timetable</h2>
//       <AgGridReact rowData={rowData} columnDefs={columnDefs} pagination={true} />
//     </div>
//   );
// };

// export default TimetablePage;
