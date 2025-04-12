import React, { useState } from "react";
import { Pie } from "react-chartjs-2"; // Chart bileşenleri
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from "chart.js"; // Chart.js için gerekli bileşenleri kaydediyoruz
import Sidebar from "./Sidebar";
import "./CevapKontrol.css";

ChartJS.register(ArcElement, Tooltip, Legend);

const CevapKontrol = () => {
  const [showSurveyNames, setShowSurveyNames] = useState(false);
  const [surveyNames, setSurveyNames] = useState([]);
  const [selectedSurveyContent, setSelectedSurveyContent] = useState(null);
  const [responsePersons, setResponsePersons] = useState([]);
  const [analysisSurveyNames, setAnalysisSurveyNames] = useState([]);
  const [selectedSurveyAnalysis, setSelectedSurveyAnalysis] = useState(null);
  const [showGraph, setShowGraph] = useState(false);

  const handleShowAllSurveyNames = async () => {
    if (showSurveyNames) {
      setSurveyNames([]);
      setSelectedSurveyContent(null);
      setResponsePersons([]);
      setShowSurveyNames(false);
    } else {
      setAnalysisSurveyNames([]);
      setSelectedSurveyAnalysis(null);
      setShowGraph(false);
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
    }
  };

  const handleCevapAnaliz = async () => {
    if (analysisSurveyNames.length > 0) {
      setAnalysisSurveyNames([]);
      setSelectedSurveyAnalysis(null);
      setShowSurveyNames(false);
    } else {
      setSurveyNames([]);
      setSelectedSurveyContent(null);
      setResponsePersons([]);
      setShowSurveyNames(false);

      try {
        const response = await fetch("http://localhost:8080/api/anket/tum-anket-isimleri");
        if (response.ok) {
          const data = await response.json();
          setAnalysisSurveyNames(data);
        } else {
          alert("Cevap analiz anket isimleri alınırken bir hata oluştu.");
        }
      } catch (error) {
        console.error("Hata:", error);
        alert("Bir hata oluştu.");
      }
    }
  };

  const handleSurveyClick = async (survey) => {
    try {
      const response = await fetch(`http://localhost:8080/api/cevap/cevapverenpersonlar?anketAdi=${survey}`);
      if (response.ok) {
        const data = await response.json();
        setResponsePersons(data);
        setSelectedSurveyContent({ surveyName: survey, personAnswers: [] });
      } else {
        alert("Cevap veren kişiler alınırken bir hata oluştu.");
      }
    } catch (error) {
      console.error("Hata:", error);
      alert("Bir hata oluştu.");
    }
  };

  const handlePersonClick = async (personName) => {
    try {
      const response = await fetch(
        `http://localhost:8080/api/cevap/anketsorularivecevaplar?anketAdi=${selectedSurveyContent.surveyName}&kullaniciAdi=${personName}`
      );

      if (response.ok) {
        const data = await response.json();
        if (Array.isArray(data)) {
          setSelectedSurveyContent({
            surveyName: selectedSurveyContent.surveyName,
            personAnswers: [{ personName, answers: data }],
          });
        } else {
          alert("Beklenen formatta veri alınamadı.");
        }
      } else {
        alert("Anket soruları ve cevapları alınırken bir hata oluştu.");
      }
    } catch (error) {
      console.error("Hata:", error);
      alert("Bir hata oluştu.");
    }
  };

  const handleAnalyzeSurvey = async (surveyName) => {
    try {
      const response = await fetch(`http://localhost:8080/api/anket/analyze/${surveyName}`);
      if (response.ok) {
        const data = await response.json();
        setSelectedSurveyAnalysis(data);
      } else {
        alert("Anket analizi alınırken bir hata oluştu.");
      }
    } catch (error) {
      console.error("Hata:", error);
      alert("Bir hata oluştu.");
    }
  };

  const toggleGraph = () => {
    setShowGraph((prev) => !prev);
  };

  const renderChart = (question, answers) => {
    const labels = Object.keys(answers);
    const dataValues = Object.values(answers).map((percentage) =>
      parseFloat(percentage.replace(",", "."))
    );

    const data = {
      labels,
      datasets: [
        {
          label: "Cevap Yüzdeleri",
          data: dataValues,
          backgroundColor: [
            "#FF6384",
            "#36A2EB",
            "#FFCE56",
            "#4BC0C0",
            "#9966FF",
            "#FF9F40",
          ],
          borderWidth: 1,
        },
      ],
    };

    return (
      <div style={{ textAlign: "center", marginBottom: "30px" }}>
        <h3 style={{ marginBottom: "15px" }}>{question}</h3>
        <Pie data={data} style={{ maxHeight: "300px", margin: "0 auto" }} />
      </div>
    );
  };

  return (
    <div className="dashboard-container">
      <Sidebar />

      <div className="content">
        <button 
          onClick={handleShowAllSurveyNames} 
          style={{ backgroundColor: "var(--color-blue)", color: "var(--color-white)" }}
        >
          Bütün Anket İsimlerini Listele
        </button>
        <button 
          onClick={handleCevapAnaliz} 
          style={{ marginTop: "10px", backgroundColor: "var(--color-blue)", color: "var(--color-white)" }}
        >
          Cevap Analiz
        </button>

        {showSurveyNames && surveyNames.length > 0 && (
          <>
            <h2>Mevcut Anketler</h2>
            <div>
              {surveyNames.map((survey) => (
                <button
                  key={survey}
                  onClick={() => handleSurveyClick(survey)}
                  style={{
                    margin: "5px",
                    padding: "10px",
                    backgroundColor: "var(--color-green)",
                    color: "var(--color-white)",
                    border: "none",
                    borderRadius: "5px",
                  }}
                >
                  {survey}
                </button>
              ))}
            </div>
          </>
        )}

        {responsePersons.length > 0 && (
          <>
            <h2>Cevap Veren Kişiler</h2>
            <div>
              {responsePersons.map((person) => (
                <button
                  key={person.name}
                  onClick={() => handlePersonClick(person.name)}
                  style={{
                    margin: "5px",
                    padding: "10px",
                    backgroundColor: "var(--color-orange)",
                    color: "var(--color-white)",
                    border: "none",
                    borderRadius: "5px",
                  }}
                >
                  {person.name}
                </button>
              ))}
            </div>
          </>
        )}

        {analysisSurveyNames.length > 0 && (
          <>
            <h2>Cevap Analiz Anketleri</h2>
            <div>
              {analysisSurveyNames.map((survey) => (
                <button
                  key={survey}
                  onClick={() => handleAnalyzeSurvey(survey)}
                  style={{
                    margin: "5px",
                    padding: "10px",
                    backgroundColor: "var(--color-green)",
                    color: "var(--color-white)",
                    border: "none",
                    borderRadius: "5px",
                  }}
                >
                  {survey}
                </button>
              ))}
            </div>
          </>
        )}
        {selectedSurveyAnalysis && (
          <div style={{ marginTop: "20px" }}>
            <h2>Seçilen Anket Analizi</h2>
            <button onClick={toggleGraph} style={{ marginBottom: "20px", backgroundColor: "var(--color-orange)"}}>
              {showGraph ? "Grafiği Gizle" : "Grafik Göster"}
            </button>
            {showGraph
              ? Object.entries(selectedSurveyAnalysis.sorular).map(([question, answers]) =>
                  renderChart(question, answers)
                )
              : Object.entries(selectedSurveyAnalysis.sorular).map(([question, answers]) => (
                  <div key={question} style={{ marginBottom: "10px" }}>
                    <div>
                      <strong>Soru:</strong> {question}
                    </div>
                    <div>
                      <strong>Cevaplar:</strong>
                      <ul style={{ listStyleType: "none", padding: "0" }}>
                        {Object.entries(answers).map(([answer, percentage]) => (
                          <li key={answer} style={{ margin: "5px 0" }}>
                            {answer}: {percentage}
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>
                ))}
          </div>
        )}

        {selectedSurveyContent?.personAnswers?.map((personData) => (
          <div key={personData.personName}>
            <h5 style={{ fontSize: '20px' }}>{personData.personName}</h5>
            <div>
              {personData.answers.map((answer, index) => (
                <p key={index} style={{ fontSize: index === 0 ? '20px' : '17px' }}>
                  {index === 0 ? answer : `- ${answer}`}
                </p>
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default CevapKontrol;
