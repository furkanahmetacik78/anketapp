import React from "react";
import { Link } from "react-router-dom";
import "./Sidebar.css";

const Sidebar = ({ handleShowAllQuestions, handleShowAllSurveyNames }) => {
  return (
    <div className="sidebar">
      <h2>Admin Paneli</h2>
      <Link to="/add-question">
        <button className="sidebar-button" >Soru Ekle</button>
      </Link>
      <Link to="/create-survey">
        <button className="sidebar-button">Anket Oluştur</button>
      </Link>
      <Link to="/cevap-kontrol">
        <button className="sidebar-button">Cevap Kontrol</button>
      </Link>
      <Link to="/soru-listele">
        <button className="sidebar-button">Bütün Soruları Listele</button>
      </Link>
      <Link to="/anket-listele">
        <button className="sidebar-button">Bütün Anket İsimlerini Listele</button>
      </Link>
    </div>
  );
};

export default Sidebar;
