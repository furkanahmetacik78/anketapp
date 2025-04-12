import React, { useState } from "react";
import { Link } from "react-router-dom";
import * as XLSX from "xlsx"; // Excel için kütüphane
import { jsPDF } from "jspdf"; // PDF için kütüphane
import "./AdminDashboard.css";
import { notoSansFont } from "./fonts";
import Sidebar from "./Sidebar";



const AdminDashboard = () => {
  const [questions, setQuestions] = useState([]); 
  const [surveyNames, setSurveyNames] = useState([]); 
  const [selectedSurveyContent, setSelectedSurveyContent] = useState(""); 
  const [showQuestions, setShowQuestions] = useState(false); 
  const [showSurveyNames, setShowSurveyNames] = useState(false); 

  // Tüm soruları çekme işlemi
  const handleShowAllQuestions = async () => {
    if (showQuestions) {
      setQuestions([]); 
      setShowQuestions(false); 
      return;
    }
    try {
      const response = await fetch("http://localhost:8080/api/anket/tum-sorular");
      if (response.ok) {
        const data = await response.json();
        setQuestions(data); 
        setShowQuestions(true); 
      } else {
        alert("Sorular alınırken bir hata oluştu.");
      }
    } catch (error) {
      console.error("Hata:", error);
      alert("Bir hata oluştu.");
    }
  };



  // Tüm anket isimlerini çekme işlemi
  const handleShowAllSurveyNames = async () => {
    if (showSurveyNames) {
      setSurveyNames([]); 
      setSelectedSurveyContent(""); 
      setShowSurveyNames(false); 
      return;
    }
    try {
      const response = await fetch("http://localhost:8080/api/anket/tum-anket-isimleri");
      if (response.ok) {
        const data = await response.json();
        setSurveyNames(data); 
        setShowSurveyNames(true); 
      } else {
        alert("Anket isimleri alınırken bir hata oluştu.");
      }
    } catch (error) {
      console.error("Hata:", error);
      alert("Bir hata oluştu.");
    }
  };
  const surveyContainerStyle = {
    display: "flex",
    flexDirection: "column",
    gap: "15px",
  };
  
  const questionCardStyle = {
    padding: "15px",
    border: "1px solid #ddd",
    borderRadius: "8px",
    backgroundColor: "#f9f9f9",
    boxShadow: "0 2px 5px rgba(0, 0, 0, 0.1)",
  };
  
  const optionListStyle = {
    listStyleType: "disc",
    paddingLeft: "20px",
    marginTop: "10px",
  };
  
  const optionItemStyle = {
    fontSize: "16px",
    marginBottom: "5px",
  };

  // Seçilen anketin içeriğini çekme
  const handleSurveyClick = async (surveyName) => {
    try {
      const response = await fetch(`http://localhost:8080/api/anket/deneme/${surveyName}`);
      if (response.ok) {
        const data = await response.json();
        setSelectedSurveyContent(data); 
      } else {
        alert("Anket içeriği alınırken bir hata oluştu.");
      }
    } catch (error) {
      console.error("Hata:", error);
      alert("Bir hata oluştu.");
    }
  };

  // Excel indirme fonksiyonu
  const exportToExcel = () => {
    if (!selectedSurveyContent) return alert("Önce bir anket seçin!");

    const surveyData = selectedSurveyContent.sorular.map((soru, index) => ({
      SoruNo: index + 1,
      SoruMetni: soru.soruMetni,
      Secenekler: Object.keys(soru)
        .filter((key) => key.startsWith("opt"))
        .map((key) => soru[key])
        .join(", "),
    }));

    const ws = XLSX.utils.json_to_sheet(surveyData);
    const wb = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(wb, ws, "Anket Verileri");
    XLSX.writeFile(wb, "anket_verileri.xlsx");
  };

  // PDF indirme fonksiyonu

  const exportToPDF = () => {
    if (!selectedSurveyContent) {
      return alert("Önce bir anket seçin!");
    }
  
    const doc = new jsPDF();
  
    // Fontu ekleyin
    doc.addFileToVFS(`${notoSansFont.name}.ttf`, notoSansFont.base64);
    doc.addFont(`${notoSansFont.name}.ttf`, notoSansFont.name, notoSansFont.weight);
    doc.setFont(notoSansFont.name);
  
    // Başlık
    doc.setFontSize(18);
    doc.text("Anket Raporu", 105, 15, { align: "center" });
    doc.setFontSize(14);
    doc.text(`Anket Adı: ${selectedSurveyContent.anketAdi}`, 105, 25, { align: "center" });
  
    // Yatay çizgi
    doc.setLineWidth(0.5);
    doc.line(10, 30, 200, 30);
  
    // Soruları ve seçenekleri yazdırma
    let yPosition = 40; // Başlangıç Y konumu
    selectedSurveyContent.sorular.forEach((soru, index) => {
      // Sayfa taşması kontrolü
      if (yPosition > 270) {
        doc.addPage();
        yPosition = 20; // Yeni sayfada başlangıç konumu
      }
  
      // Soru metni
      doc.setFontSize(12);
      doc.setFont("NotoSans", "normal");
      doc.text(`${index + 1}. ${soru.soruMetni}`, 10, yPosition);
      yPosition += 8;
  
      // Seçenekler
      const options = Object.keys(soru)
        .filter((key) => key.startsWith("opt"))
        .map((key, idx) => {
          const letter = String.fromCharCode(65 + idx); // A, B, C, D
          return `${letter}) ${soru[key]}`; // Seçenek harfi ve metni
        });
  
      options.forEach((option) => {
        doc.setFontSize(11);
        doc.text(`- ${option}`, 15, yPosition); // Seçenekler için daha küçük girinti
        yPosition += 6;
      });
  
      // Sorular arası boşluk
      yPosition += 4;
    });
  
    // PDF'i kaydet
    doc.save(`${selectedSurveyContent.anketAdi}_Raporu.pdf`);
  };
  
  
  return (
    <div className="dashboard-container">
      {/* Sidebar */}
      <Sidebar/>
    </div>
  );
};

// Basit stil objeleri
const buttonStyle = {
  backgroundColor: "#4CAF50",
  color: "white",
  padding: "10px 20px",
  fontSize: "16px",
  border: "none",
  borderRadius: "5px",
  cursor: "pointer",
  margin: "5px",
};

const questionTextStyle = {
  maxWidth: "420px",
  wordWrap: "break-word",
  whiteSpace: "normal",
  overflow: "hidden",
  display: "inline-block",
};

const inputStyle = {
  width: "100%",
  padding: "10px",
  fontSize: "16px",
  borderRadius: "5px",
  border: "1px solid #ddd",
};

const scrollContainerStyle = {
  maxHeight: "200px",
  overflowY: "auto",
  border: "1px solid #ddd",
  borderRadius: "5px",
  marginBottom: "20px",
};


export default AdminDashboard;

