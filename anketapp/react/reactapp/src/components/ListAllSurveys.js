  import React, { useEffect, useState } from "react";
  import * as XLSX from "xlsx"; // Excel için kütüphane
  import { jsPDF } from "jspdf"; // PDF için kütüphane
  import { notoSansFont } from "./fonts"; // Font dosyanızı uygun şekilde import edin
  import Sidebar from "./Sidebar";

  const ListAllSurveys = () => {
    const [surveyNames, setSurveyNames] = useState([]);
    const [selectedSurveyContent, setSelectedSurveyContent] = useState(null);

    useEffect(() => {
      const fetchSurveys = async () => {
        try {
          const response = await fetch("http://localhost:8080/api/anket/tum-anket-isimleri");
          if (response.ok) {
            const data = await response.json();
            setSurveyNames(data);
          } else {
            alert("Anket isimleri alınırken bir hata oluştu.");
          }
        } catch (error) {
          console.error("Hata:", error);
          alert("Bir hata oluştu.");
        }
      };

      fetchSurveys();
    }, []);

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

    const exportToPDF = () => {
      if (!selectedSurveyContent) {
        return alert("Önce bir anket seçin!");
      }

      const doc = new jsPDF();
      doc.addFileToVFS(`${notoSansFont.name}.ttf`, notoSansFont.base64);
      doc.addFont(`${notoSansFont.name}.ttf`, notoSansFont.name, notoSansFont.weight);
      doc.setFont(notoSansFont.name);
      doc.setFontSize(18);
      doc.text("Anket Raporu", 105, 15, { align: "center" });
      doc.setFontSize(14);
      doc.text(`Anket Adı: ${selectedSurveyContent.anketAdi}`, 105, 25, { align: "center" });
      doc.setLineWidth(0.5);
      doc.line(10, 30, 200, 30);

      let yPosition = 40;
      selectedSurveyContent.sorular.forEach((soru, index) => {
        if (yPosition > 270) {
          doc.addPage();
          yPosition = 20;
        }

        doc.setFontSize(12);
        doc.setFont("NotoSans", "normal");
        doc.text(`${index + 1}. ${soru.soruMetni}`, 10, yPosition);
        yPosition += 8;

        const options = Object.keys(soru)
          .filter((key) => key.startsWith("opt"))
          .map((key, idx) => {
            const letter = String.fromCharCode(65 + idx);
            return `${letter}) ${soru[key]}`;
          });

        options.forEach((option) => {
          doc.setFontSize(11);
          doc.text(`- ${option}`, 15, yPosition);
          yPosition += 6;
        });

        yPosition += 4;
      });

      doc.save(`${selectedSurveyContent.anketAdi}_Raporu.pdf`);
    };

    return (
      <div className="dashboard-container">
        {/* Sidebar Eklendi */}
        <Sidebar />

        <div className="content">
          <h2>Mevcut Anketler</h2>
          <div className="scroll-container">
            {surveyNames.map((survey) => (
              <button key={survey} onClick={() => handleSurveyClick(survey)} className="survey-button">
                {survey}
              </button>
            ))}
          </div>

          {selectedSurveyContent && (
            <div>
              <h2>Seçilen Anket İçeriği</h2>
              <div className="survey-info">
                <strong>Anket Adı:</strong> {selectedSurveyContent.anketAdi}
              </div>
              <div className="survey-container">
                {selectedSurveyContent.sorular.map((soru, index) => (
                  <div key={index} className="question-card">
                    <p className="question-title">
                      {index + 1}. {soru.soruMetni}
                    </p>
                    {soru.opt1 && (
                      <ul className="option-list">
                        {Object.keys(soru)
                          .filter((key) => key.startsWith("opt"))
                          .map((key) => (
                            <li key={key} className="option-item">
                              {soru[key]}
                            </li>
                          ))}
                      </ul>
                    )}
                  </div>
                ))}
              </div>
              <div className="actions">
                <button className="download-button2" onClick={exportToExcel} style={{ borderRadius: "0" }}>
                  <img src="excel.png" alt="Excel" />
                  Excel İndir!
                </button>
                <button className="download-button2" onClick={exportToPDF} style={{ borderRadius: "0" }}>
                  <img src="pdf.png" alt="PDF" />
                  PDF İndir!
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    );
  };

  export default ListAllSurveys;
