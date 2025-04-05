import React, { useState, useRef, useEffect } from "react";
import { AgGridReact } from "ag-grid-react";
import "ag-grid-community/styles/ag-grid.css";
import "ag-grid-community/styles/ag-theme-alpine.css";
import html2canvas from "html2canvas";
import ExcelJS from "exceljs";
import { saveAs } from "file-saver";
import sampleData from "./components/sample.json"; // Import JSON file
import "./styles.css";


import { provideGlobalGridOptions } from 'ag-grid-community';
import { AllCommunityModule, ModuleRegistry } from 'ag-grid-community';
import { useLocation } from "react-router-dom";
ModuleRegistry.registerModules([AllCommunityModule]);
provideGlobalGridOptions({ theme: "legacy" });
console.log(sampleData);
// Sample Subjects & Slots
let subjects = [];
let slots = [];

// Define week days & time slots
const weekDays = ["Mon", "Tue", "Wed", "Thu", "Fri"];
const timeSlots = [
  "8-8:50",
  "9-9:50",
  "10-10:50",
  "11-11:50",
  "12:00-12:50",
  "1-1:50",
  "2-2:50",
  "3-3:50",
  "4-4:50",
  "5-5:50",
];

// Generate light colors for subjects
const generateLightColor = () => {
  const r = Math.floor(200 + Math.random() * 55);
  const g = Math.floor(200 + Math.random() * 55);
  const b = Math.floor(200 + Math.random() * 55);
  return `rgb(${r}, ${g}, ${b})`;
};

// Assign colors to subjects
const subjectColors = {};


// Function to create timetable from sample.json
const generateTimetableData = (slotToSubject) => {
  const timetable = [];

  // Create an empty timetable structure
  timeSlots.forEach((time) => {
    let row = { time };
    weekDays.forEach((day) => {
      row[day] = ""; // Empty by default
    });
    timetable.push(row);
  });


  let i = 1, j=1;

  // Fill timetable based on `sample.json`
  for (const [slot, entries] of Object.entries(sampleData)) {
    if (slotToSubject[slot]) {
      const subject = slotToSubject[slot];

      console.log(i, subject);
      i++;

      entries.forEach(([day, time]) => {
        const rowIndex = timeSlots.indexOf(time);
        if (rowIndex !== -1) {
          timetable[rowIndex][day] = subject;
          console.log(j, subject);
      j++;
          console.log(timetable);
        }
      });
    }
  }


  return timetable;
};

const DataTable = () => {
  const [rowData, setRowData] = useState([]);
  const [textColor, setTextColor] = useState("#000000");
  const [cellColor, setCellColor] = useState("#ffffff");
  const [selectedCell, setSelectedCell] = useState({ rowIndex: null, colId: null });
  const gridRef = useRef();
  const tableRef = useRef();
  const [cla, setcla] = useState([]);

  const location = useLocation();
  const { array1, array2 } = location.state || { array1: [], array2: [] };

  let clash=[];


  useEffect(() => {

    for(let i=0;i<array2.length;i++){
      if(array2[i][0]!=='L' && array2[i][0]!=='M' && array2[i][0]!=='l'&& array2[i][0]!=='m'&& array2[i].length<3){
        array2[i] = array2[i].replace(/[0-9]/g, '');
      }
    }

    subjects = array1;
    slots = array2;
    timeSlots.forEach((time)=>{
      subjectColors[time] = `rgb(255, 255, 25)`;
    });

    subjects.forEach((subject) => {
      subjectColors[subject] = generateLightColor();
    });

    const slotToSubject = {};
    slots.forEach((slot, index) => {

      if(slotToSubject[slot]){
        clash.push(`CLASH of "${subjects[index]}" in slot "${slot}"`);
      }
      else{
        slotToSubject[slot] = subjects[index];
      }
      
    });

    setRowData(generateTimetableData(slotToSubject));
    setcla(clash);
  
    console.log(clash);
  }, []);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (tableRef.current && !tableRef.current.contains(event.target)) {
        setSelectedCell({ rowIndex: null, colId: null }); // Reset selected cell
      }
    };
  
    document.addEventListener("click", handleClickOutside);
    return () => document.removeEventListener("click", handleClickOutside);
  }, []);
  

  // Column Definitions
  const columnDefs = [
    { headerName: "Time", field: "time", width: 120, editable:true,
      cellStyle: (params) => {
      const subject = params.value;
      return subject ? { backgroundColor: subjectColors[subject] } : {};
    } },
    ...weekDays.map((day) => ({
      headerName: day,
      field: day,
      editable: true,
      cellStyle: (params) => {
        const subject = params.value;
        return subject ? { backgroundColor: subjectColors[subject] } : {};
      },
    })),
  ];

  // Handle Cell Click
  const handleCellClick = (params) => {
    setSelectedCell({ rowIndex: params.node.rowIndex, colId: params.column.colId });
  };

  // Apply Text Color
  const applyTextColor = () => {
    if (selectedCell.rowIndex !== null && selectedCell.colId !== null) {
      const cellElement = document.querySelector(
        `[row-index="${selectedCell.rowIndex}"] [col-id="${selectedCell.colId}"]`
      );
      if (cellElement) cellElement.style.color = textColor;
    }
  };

  const applyCellColor = () => {
    if (selectedCell.rowIndex === null || selectedCell.colId === null) return; // Exit if no cell is selected
  
    const gridApi = gridRef.current.api;
    const selectedSubject = rowData[selectedCell.rowIndex][selectedCell.colId]; // Get subject from the selected cell
  
    if (!selectedSubject) return; // Exit if the selected cell has no subject
  
    // Update color for the selected subject
    subjectColors[selectedSubject] = hexTorgb(cellColor);
  
    // Efficiently update colors for all cells with the same subject
    const cells = document.querySelectorAll(".ag-cell");
    cells.forEach((cell) => {
      if (cell.innerText.trim() === selectedSubject) {
        cell.style.backgroundColor = subjectColors[selectedSubject]; // Apply color directly
      }
    });
  
    // Force Ag-Grid to refresh the UI immediately
    gridApi.refreshCells({ force: true });
  };
  
  

  // Export table as image
  const exportAsImage = () => {
    const tableElement = tableRef.current;
    if (!tableElement) return;
  
    // Store original styles
    const originalWidth = tableElement.style.width;
    const originalHeight = tableElement.style.height;
    const originalOverflow = tableElement.style.overflow;
  
    // Expand the table to fit all content
    tableElement.style.width = "1122px";
    tableElement.style.height = "475px";
    tableElement.style.overflow = "visible";
  
    setTimeout(() => {
      html2canvas(tableElement, {
        scrollX: 0,
        scrollY: 0,
        windowWidth: document.body.scrollWidth, // Ensure full width capture
        windowHeight: document.body.scrollHeight, // Ensure full height capture
      }).then((canvas) => {
        // Restore original styles
        tableElement.style.width = originalWidth;
        tableElement.style.height = originalHeight;
        tableElement.style.overflow = originalOverflow;
  
        // Download the image
        const link = document.createElement("a");
        link.href = canvas.toDataURL("image/png");
        link.download = "timetable.png";
        link.click();
      });
    }, 200); // Delay to ensure styles apply before capturing
  };
  

  // Export table as Excel file
  const exportAsExcel = () => {
    const workbook = new ExcelJS.Workbook();
    const worksheet = workbook.addWorksheet("Timetable");

    // Add Headers
    worksheet.addRow(["Time", ...weekDays]);

    // Add Rows
    rowData.forEach((row) => {
      const excelRow = worksheet.addRow([row.time, ...weekDays.map((day) => row[day])]);
      const temp = ["time"]

      temp.forEach((day, colIndex) => {
        const cell = excelRow.getCell(colIndex + 1);
        const subject = row[day];

        if (subject) {
          cell.fill = {
            type: "pattern",
            pattern: "solid",
            fgColor: { argb: rgbToHex(subjectColors[subject]) },
          };
        }
      });
      weekDays.forEach((day, colIndex) => {
        const cell = excelRow.getCell(colIndex + 2);
        const subject = row[day];

        if (subject) {
          cell.fill = {
            type: "pattern",
            pattern: "solid",
            fgColor: { argb: rgbToHex(subjectColors[subject]) },
          };
        }
      });
    });

    workbook.xlsx.writeBuffer().then((buffer) => {
      saveAs(new Blob([buffer]), "timetable.xlsx");
    });
  };

  // Convert RGB to HEX
  const rgbToHex = (rgb) => {
    if (!rgb) return "FFFFFF";
    const rgbMatch = rgb.match(/\d+/g);
    return rgbMatch ? rgbMatch.slice(0, 3).map((num) => Number(num).toString(16).padStart(2, "0")).join("").toUpperCase() : "FFFFFF";
  };

  const hexTorgb = (hex)=>{
    hex = hex.replace(/^#/, '');

    // Parse the hex values into their respective components
    const r = parseInt(hex.substring(0, 2), 16);
    const g = parseInt(hex.substring(2, 4), 16);
    const b = parseInt(hex.substring(4, 6), 16);

    // Return the RGB values as an object
    return `rgb(${r}, ${g}, ${b})`;
  }

  const exportAsICS = () => {
    let icsData = "BEGIN:VCALENDAR\nVERSION:2.0\nPRODID:-//Timetable App//EN\n";

    const startDate = new Date();
    startDate.setHours(0, 0, 0, 0);

    const dayMapping = {
      Mon: 1,
      Tue: 2,
      Wed: 3,
      Thu: 4,
      Fri: 5,
    };

    rowData.forEach((row) => {
      weekDays.forEach((day) => {
        const subject = row[day];
        if (subject) {
          const timeRange = row.time.split("-");
          const startHour = parseInt(timeRange[0]);
          const endHour = parseInt(timeRange[1].split(":")[0]);

          let eventDate = new Date(startDate);
          eventDate.setDate(eventDate.getDate() + (dayMapping[day] - startDate.getDay()));

          const startTime = new Date(eventDate);
          startTime.setHours(startHour, 0, 0);

          const endTime = new Date(eventDate);
          endTime.setHours(endHour, 0, 0);

          const formatDate = (date) => {
            return date.toISOString().replace(/[-:]/g, "").split(".")[0] + "Z";
          };

          icsData += `BEGIN:VEVENT\nSUMMARY:${subject}\nDTSTART:${formatDate(startTime)}\nDTEND:${formatDate(endTime)}\nRRULE:FREQ=WEEKLY;BYDAY=${day.toUpperCase().slice(0, 2)}\nEND:VEVENT\n`;
        }
      });
    });

    icsData += "END:VCALENDAR";

    const blob = new Blob([icsData], { type: "text/calendar" });
    saveAs(blob, "timetable.ics");
  };

  return (
    <div className="table-container">
      <div className="color-controls">
        <input className="color-input" type="color" value={textColor} onChange={(e) => setTextColor(e.target.value)} />
        <button className="color-apply" onClick={applyTextColor}>Apply Text Color</button>

        <input className="color-input" type="color" value={cellColor} onChange={(e) => setCellColor(e.target.value)} />
        <button className="color-apply" onClick={applyCellColor}>Apply Cell Color</button>
        
      </div>

      <div className="ag-theme-alpine table-wrapper" ref={tableRef}>
        <AgGridReact ref={gridRef} rowData={rowData} columnDefs={columnDefs} onCellClicked={handleCellClick} />
      </div>

      <div className="export">
        <button onClick={exportAsImage}>Export TimeTable as Image</button>
        <button onClick={exportAsExcel}>Export TimeTable as Excel File</button>
        <button onClick={exportAsICS}>Export TimeTable as Calendar File</button>
      </div>
      
      { cla.length>0 && (
        <div className="clashes">
        <h3>List of clashes in timetable:</h3>
        <ul>
          {cla.map((item, index) => (
            <li key={index}>{item}</li>
          ))}
        </ul>
      </div>
      )
        
      }
      
      
    </div>
  );
};

export default DataTable;
