
import { useState,useEffect } from "react";
import { useNavigate } from "react-router-dom";
import UploadBox from "../components/UploadBox";
import Header from "../components/Header";
import "./styles/UploadPage.css";

const UploadPage = () => {
  const [uploadedFile, setUploadedFile] = useState(null);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const [showPopup, setShowPopup] = useState(false);
  const [array1, setArray1] = useState([]);
  const [array2, setArray2] = useState([]);
  const [inputs, setInputs] = useState([1,2,3]);

  useEffect(()=>{


    console.log(array1.length)
    console.log(inputs.length)
    // 
    
    if(inputs.length==array1.length || inputs.length==array2.length){
      console.log(inputs);
      setShowPopup(true);
    }
    
  },[inputs])

  useEffect(()=>{

    if(array1.length != 0 || array2.length !=0){
      setInputs(array1.length > array2.length? new Array(array1.length).fill(""):new Array(array2.length).fill(""));
    }
  },[array1,array2])

  const handleFileUpload = async (file) => {
    setUploadedFile(file);
    setLoading(true);

    const formData = new FormData();
    formData.append("file", file);

    try {
      const response = await fetch("http://127.0.0.1:8000/upload", {
        method: "POST",
        body: formData,
      });

      if (!response.ok) {
        throw new Error("Failed to process image.");
      }

      setLoading(false);
    } catch (error) {
      console.error("Upload error:", error);
      setLoading(false);
    }
  };

  const handleNext = () => {
    // if(showPopup===true){
      fetch("http://127.0.0.1:8000/get_subjects_slots")
      .then(response => response.json())
      .then(data => {
        console.log(data.subjects);
        console.log(data.slots)
        setArray1(data.subjects);
        setArray2(data.slots);
        // setInputs(array1.length > array2.length? new Array(array1.length):new Array(array2.length));
        // console.log(inputs);
        // what if array1 is small array 2 ?
        
      })
      .then(()=>{

      })
      .catch(error => {
        console.error("Error fetching subjects and slots:", error);
      });
    // }
    // setShowPopup(true);
    // navigate("/timetable");

  };

  const handleDone = () => {
    setShowPopup(false);
    navigate("/timetable", { state: { array1: array1, array2: array2, rowData: null, subjectColors: null,cellTextColors: null, storageKey: null } });
  };

  const handleArray1 = (index,e)=>{
    const newarray1 = [...array1];
    newarray1[index] = e.target.value;
    setArray1(newarray1);
  }

  const handleArray2 = (index,e)=>{
    const newarray2 = [...array2];
    newarray2[index] = e.target.value;
    setArray2(newarray2);
  }

  const handleClose = ()=>{
    setShowPopup(false)
  }

  const handleAddRow = ()=>{
    const newarray2 = [...array2, ""]
    const newarray1 = [...array1, ""]

    setArray1(newarray1);
    setArray2(newarray2);
  }

  const handleRemoveRow  = ()=>{
    
    const newarray2 = [...array2]
    const newarray1 = [...array1]
    newarray2.pop()
    newarray1.pop()

    setArray2(newarray2);
    setArray1(newarray1);
  }

  return (
    <div>
      <Header />
      <div className="upload-container">
        <h2>Upload Image & Generate Timetable</h2>
        <UploadBox onFileUpload={handleFileUpload} />
        {loading && <p>Processing image...</p>}
        <button className="next-button" disabled={!uploadedFile || loading} onClick={handleNext}>
          Next
        </button>
      </div>
        {/* Popup */}
      {
      showPopup && 
      (
        <div className="popup-overlay">
          <div className="popup-content">
            <button onClick={handleClose}>CLose</button>
            <h2>Edit Details</h2>
            
            <div className="popup-grid">
              <div className="subjects">
                <h5>Subjects</h5>
                {
                  inputs.map((_, index) => (
                    <input
                      key={index}
                      type="text"
                      value={array1[index]}
                      placeholder={`subject ${index + 1}`}
                      onChange={(e)=>handleArray1(index,e)}
                    />
                  ))
                }
              </div>
              
              <div className="slots">
                <h5>Slots</h5>
                {
                  inputs.map((_, index) => (
                    <input
                      key={index}
                      type="text"
                      value={array2[index]}
                      placeholder={`slot ${index + 1}`}
                      onChange={(e)=>handleArray2(index,e)}
                    />
                  ))
                }
                
              </div>
                <button onClick={handleAddRow}> + </button>
                <button onClick={handleRemoveRow}> - </button>
              
            </div>
            <button className="done" onClick={handleDone}>Done</button>
          </div>
        </div>
      )}
    </div>
  );
};

export default UploadPage;
