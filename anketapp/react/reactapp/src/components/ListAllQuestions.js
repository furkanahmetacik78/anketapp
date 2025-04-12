import React, { useEffect, useState } from "react";
import Sidebar from "./Sidebar";
import "./ListAllQuestions.css"; // CSS dosyasını dahil et

const ListAllQuestions = () => {
  const [questions, setQuestions] = useState([]);

  useEffect(() => {
    const fetchQuestions = async () => {
      try {
        const response = await fetch("http://localhost:8080/api/anket/tum-sorular");
        if (response.ok) {
          const data = await response.json();
          setQuestions(data); // API yanıtını doğrudan ayarlıyoruz
        } else {
          alert("Sorular alınırken bir hata oluştu.");
        }
      } catch (error) {
        console.error("Hata:", error);
        alert("Bir hata oluştu.");
      }
    };

    fetchQuestions();
  }, []);

  const renderQuestion = (question) => {
    switch (question.type) {
      case "BooleanSoru":
        return (
          <div className="question-container">
            <p className="question-text">{question.soruMetni}</p>
            <div className="options-container">
              <span className="option">{question.opt1}</span>
              <span className="option">{question.opt2}</span>
            </div>
          </div>
        );
      case "YazmaliSoru":
        return (
          <div className="question-container">
            <p className="question-text">{question.soruMetni}</p>
            <p>Bu sorunun yanıtı yazılı olarak alınacaktır.</p>
          </div>
        );
      case "CoktanSecmeliSoru":
        return (
          <div className="question-container">
            <p className="question-text">{question.soruMetni}</p>
            <div className="options-container">
              {[question.opt1, question.opt2, question.opt3, question.opt4]
                .filter((opt) => opt) // Geçerli seçenekleri filtrele
                .map((opt, idx) => (
                  <span key={idx} className="option">{opt}</span>
                ))}
            </div>
          </div>
        );
      default:
        return <p>Bilinmeyen bir soru türüyle karşılaşıldı.</p>;
    }
  };

  return (
    <div className="dashboard-container">
      {/* Sidebar Eklendi */}
      <Sidebar />

      <div className="content2">
        <h2>Tüm Sorular</h2>
        <div className="scroll-container">
          <ul className="list">
            {questions.map((question, index) => (
              <li key={index} className="list-item">
                {renderQuestion(question)}
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
};

export default ListAllQuestions;
