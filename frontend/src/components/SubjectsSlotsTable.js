import { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import { AgGridReact } from "ag-grid-react";
import "ag-grid-community/styles/ag-grid.css";
import "ag-grid-community/styles/ag-theme-alpine.css";
// import "./styles/SubjectsSlotsTable.css";
import { provideGlobalGridOptions } from 'ag-grid-community';
import { AllCommunityModule, ModuleRegistry } from 'ag-grid-community';

ModuleRegistry.registerModules([AllCommunityModule]);
provideGlobalGridOptions({ theme: "legacy" });


const SubjectsSlotsTable = () => {
  const location = useLocation();
  const { array1, array2 } = location.state || { array1: [], array2: [] };

  const [rowData, setRowData] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch("http://127.0.0.1:8000/get_subjects_slots")
      .then(response => response.json())
      .then(data => {
        console.log(data.subjects);
        console.log(array1);
        console.log(array2);
        console.log(data.slots)
        if (data.subjects && data.slots) {
          const formattedData = data.subjects.map((subject, index) => ({
            subject,
            slot: data.slots[index] || "",
          }));
          setRowData(formattedData);
        }
        setLoading(false);
      })
      .catch(error => {
        console.error("Error fetching subjects and slots:", error);
        setLoading(false);
      });
  }, []);

  const columnDefs = [
    { headerName: "Subject", field: "subject", sortable: true, filter: true },
    { headerName: "Slot", field: "slot", sortable: true, filter: true },
  ];

  return (
    <div className="ag-theme-alpine table-container" styles={{height: 500, width:500}}>
      {loading ? <p>Loading data...</p> : <AgGridReact rowData={rowData} columnDefs={columnDefs} pagination={true} />}
    </div>
  );
};

export default SubjectsSlotsTable;
