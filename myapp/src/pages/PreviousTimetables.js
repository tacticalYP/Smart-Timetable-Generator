
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import "./styles/PreviousTimetables.css";

const PreviousTimetables = () => {
  const [timetables, setTimetables] = useState([]);
  const navigate = useNavigate();

  // Load all saved timetables on mount
  useEffect(() => {
    loadTimetables();
  }, []);

  const loadTimetables = () => {
    const allKeys = Object.keys(localStorage).filter(key => key.startsWith("timetable_"));
    const loaded = allKeys.map(key => {
      const item = JSON.parse(localStorage.getItem(key));
      return { key, name: item.name };
    });
    setTimetables(loaded);
  };

  const openTimetable = (key) => {
    const data = JSON.parse(localStorage.getItem(key));
    if (data) {
      navigate("/timetable", {
        state: {
          rowData: data.rowData,
          subjectColors: data.subjectColors,
          cellTextColors: data.cellTextColors || {},
          storageKey: key
        }
      });
    }
  };

  const deleteTimetable = (key) => {
    localStorage.removeItem(key);
    loadTimetables();
  };

  const deleteAllTimetables = () => {
    Object.keys(localStorage).forEach(key => {
      if (key.startsWith("timetable_")) {
        localStorage.removeItem(key);
      }
    });
    loadTimetables();
  };

  return (
    <div className="previous-timetables-container">
      <h2>Previously Opened Timetables</h2>

      {timetables.length > 0 && (
        <button className="delete-all-btn" onClick={deleteAllTimetables}>
          Delete All Timetables
        </button>
      )}

      <ul className="timetable-list">
        {timetables.map((item, idx) => (
          <li key={idx} className="timetable-entry">
            <button onClick={() => openTimetable(item.key)} className="timetable-link">
              {item.name}
            </button>
            <button
              onClick={() => deleteTimetable(item.key)}
              className="delete-btn"
              title="Delete this timetable"
            >
              ❌
            </button>
          </li>
        ))}
      </ul>

      {timetables.length === 0 && <p>No previously generated timetables available.</p>}
    </div>
  );
};

export default PreviousTimetables;
