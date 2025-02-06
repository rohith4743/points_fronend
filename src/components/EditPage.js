import React, { useState, useEffect } from "react";
import "./styles.css"; // Custom styling file
import PointService from "../services/pointService";
import PointForm from "./PointsForm";
import PointList from "./PointsList";


const SearchBar = ({ onSearch }) => {
  return (
    <div className="search-bar">
      <input
        type="text"
        className="form-control"
        placeholder="Search points..."
        onChange={(e) => onSearch(e.target.value)}
      />
    </div>
  );
};





const App = () => {
  const [points, setPoints] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");

  useEffect(() => {
    PointService.getPoints({searchTerm: searchQuery}).then((res) => {
        setPoints(res.data)
    });
  }, [searchQuery]);

  const addPoint = (point) => {
    
    PointService.addPoint(point).then((res) => {
      setPoints([...points, res.data]);
    });
  };

  const deletePoint = (id) => {
    PointService.deletePoint(id).then(() => {
      setPoints(points.filter((p) => p.id !== id));
    });
  };

  

  return (
    <div className="container">
      <h1 className="my-3 text-primary">Point Management</h1>

      <div className="row">
        <div className="col-md-6">

            <h2>Summary</h2>
            <PointList points={points.filter((p) => p.section === "summary")} onDelete={deletePoint} />
            
            <h2>Experience</h2>
            <PointList points={points.filter((p) => p.section === "experience")} onDelete={deletePoint} />
        </div>
        
        <div className="col-md-6">
            <h2>Search Term</h2>

            <div className="m-3">
                <SearchBar  onSearch={setSearchQuery} />
            </div>
            

            <PointForm onAdd={addPoint} />

        </div>

      </div>
      <div></div>
      
    </div>
  );
};

export default App;
