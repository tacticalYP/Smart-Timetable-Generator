import Header from "../components/Header";
import DataTable from "../DataTable";
// import "./styles/TimetablePage.css";

const TimetablePage = () => (
  <div>
    <Header />
    <h2 className="title" style={{textAlign:"center", marginBottom: 0, marginTop: "5px"}}>Generated Timetable</h2>
    <DataTable />
  </div>
);

export default TimetablePage;
