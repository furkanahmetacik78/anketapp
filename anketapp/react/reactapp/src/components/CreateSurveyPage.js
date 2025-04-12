import React, { useState } from "react";
import "./CreateSurveyPage.css";
import Sidebar from "./Sidebar";

const CreateSurveyPage = () => {
  const [surveyName, setSurveyName] = useState(""); // Yeni anket adı
  const [selectedQuestions, setSelectedQuestions] = useState([]); // Seçilen soruları tutacak state
  const [questions, setQuestions] = useState([]); // Soruları depolamak için state
  const [selectedQuestionType, setSelectedQuestionType] = useState(""); // Soru türü state'i
  const [showQuestionForm, setShowQuestionForm] = useState(false); // Soru formunu gösterme durumu
  const [showAllQuestions, setShowAllQuestions] = useState(false); // Bütün soruları gösterme durumu

  // Tüm soruları çekme ve görüntüleme işlemi
  const handleShowAllQuestions = async () => {
    try {
      const response = await fetch("http://localhost:8080/api/anket/tum-sorular");
      if (response.ok) {
        const data = await response.json();
        setQuestions(data); // Soruları state'e set et
      } else {
        alert("Sorular alınırken bir hata oluştu.");
      }
    } catch (error) {
      console.error("Hata:", error);
      alert("Bir hata oluştu.");
    }
  };

  // Boolean soru formu
  const BooleanQuestionForm = () => {
    const [question, setQuestion] = useState("");
    const [option1, setOption1] = useState("");
    const [option2, setOption2] = useState("");

    const handleSubmit = async (event) => {
      event.preventDefault();
      try {
        const response = await fetch("http://localhost:8080/api/booleanSoru/save", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            soruMetni: question,
            opt1: option1,
            opt2: option2,
          }),
        });

        if (response.ok) {
          const savedQuestion = await response.json(); // Kaydedilen sorunun bilgilerini al
          setSelectedQuestions((prev) => [...prev, savedQuestion.id]); // Seçili sorulara ekle
          alert("Boolean soru başarıyla kaydedildi!");
          setShowQuestionForm(false); // Formu kapat
        } else {
          alert("Soru kaydedilirken bir hata oluştu.");
        }
      } catch (error) {
        console.error("Hata:", error);
        alert("Bir hata oluştu.");
      }
    };

    return (
      <form onSubmit={handleSubmit}>
        <label>Soru:</label>
        <input
          type="text"
          value={question}
          onChange={(e) => setQuestion(e.target.value)}
          required
        />
        <label>Seçenek 1:</label>
        <input
          type="text"
          value={option1}
          onChange={(e) => setOption1(e.target.value)}
          required
        />
        <label>Seçenek 2:</label>
        <input
          type="text"
          value={option2}
          onChange={(e) => setOption2(e.target.value)}
          required
        />
        <button type="submit" className="small-button" style={{ marginBottom: "20px", backgroundColor: "var(--color-orange)"}}>Kaydet</button>
      </form>
    );
  }

  // Yazmalı soru formu
  const WrittenQuestionForm = () => {
    const [question, setQuestion] = useState("");

    const handleSubmit = async (event) => {
      event.preventDefault();
      try {
        const response = await fetch("http://localhost:8080/api/yazmaliSoru/save", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            soruMetni: question,
          }),
        });

        if (response.ok) {
          const savedQuestion = await response.json(); // Kaydedilen sorunun bilgilerini al
          setSelectedQuestions((prev) => [...prev, savedQuestion.id]); // Seçili sorulara ekle
          alert("Yazmalı soru başarıyla kaydedildi!");
          setShowQuestionForm(false); // Formu kapat
        } else {
          alert("Soru kaydedilirken bir hata oluştu.");
        }
      } catch (error) {
        console.error("Hata:", error);
        alert("Bir hata oluştu.");
      }
    };

    return (
      <form onSubmit={handleSubmit}>
        <label>Soru:</label>
        <input
          type="text"
          value={question}
          onChange={(e) => setQuestion(e.target.value)}
          required
        />
        <button type="submit" className="small-button" style={{ marginBottom: "20px", backgroundColor: "var(--color-orange)"}}>Kaydet</button>
      </form>
    );
  }

  // Çoktan seçmeli soru formu
  const MultipleChoiceQuestionForm = () => {
    const [question, setQuestion] = useState("");
    const [option1, setOption1] = useState("");
    const [option2, setOption2] = useState("");
    const [option3, setOption3] = useState("");
    const [option4, setOption4] = useState("");

    const handleSubmit = async (event) => {
      event.preventDefault();
      try {
        const response = await fetch("http://localhost:8080/api/ÇoktanSeçmeliSoru/save", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            soruMetni: question,
            opt1: option1,
            opt2: option2,
            opt3: option3,
            opt4: option4,
          }),
        });

        if (response.ok) {
          const savedQuestion = await response.json(); // Kaydedilen sorunun bilgilerini al
          setSelectedQuestions((prev) => [...prev, savedQuestion.id]); // Seçili sorulara ekle
          alert("Çoktan seçmeli soru başarıyla kaydedildi!");
          setShowQuestionForm(false); // Formu kapat
        } else {
          alert("Soru kaydedilirken bir hata oluştu.");
        }
      } catch (error) {
        console.error("Hata:", error);
        alert("Bir hata oluştu.");
      }
    };

    return (
      <form onSubmit={handleSubmit}>
        <label>Soru:</label>
        <input
          type="text"
          value={question}
          onChange={(e) => setQuestion(e.target.value)}
          required
        />
        <label>Seçenek 1:</label>
        <input
          type="text"
          value={option1}
          onChange={(e) => setOption1(e.target.value)}
          required
        />
        <label>Seçenek 2:</label>
        <input
          type="text"
          value={option2}
          onChange={(e) => setOption2(e.target.value)}
          required
        />
        <label>Seçenek 3:</label>
        <input
          type="text"
          value={option3}
          onChange={(e) => setOption3(e.target.value)}
          required
        />
        <label>Seçenek 4:</label>
        <input
          type="text"
          value={option4}
          onChange={(e) => setOption4(e.target.value)}
          required
        />
        <button type="submit" className="small-button" style={{ marginBottom: "20px", backgroundColor: "var(--color-orange)"}}>Kaydet</button>
      </form>
    );
  }

  // Anket oluşturma
  const handleCreateSurvey = async () => {
    if (!surveyName || selectedQuestions.length === 0) {
      alert("Anket adı ve en az bir soru seçilmelidir.");
      return;
    }

    try {
      const response = await fetch("http://localhost:8080/api/anket/save", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          anketAdi: surveyName,
          soruIds: selectedQuestions,
        }),
      });

      if (response.ok) {
        alert("Anket başarıyla oluşturuldu!");
      } else {
        alert("Anket oluşturulurken bir hata oluştu.");
      }
    } catch (error) {
      console.error("Hata:", error);
      alert("Bir hata oluştu.");
    }
  };

  return (
    <div className="dashboard-container">
      <Sidebar />
      <div className="content">
        <h1 style={{ textAlign: "center" }}>Yeni Anket Oluştur</h1>
        <div className="button-group">
          <button onClick={() => setShowQuestionForm(!showQuestionForm)} style={{ marginBottom: "20px", backgroundColor: "var(--color-blue)"}}>
            Soru Ekle
          </button>
        </div>

        {showQuestionForm && (
          <div className="form-container">
            <label>Soru Türü Seçin:</label>
            <select
              value={selectedQuestionType}
              onChange={(e) => {
                setSelectedQuestionType(e.target.value);
                setShowQuestionForm(true);
              }}
              className="question-type-select"
            >
              <option value="">Seçin</option>
              <option value="boolean">Boolean Soru</option>
              <option value="written">Yazmalı Soru</option>
              <option value="multipleChoice">Çoktan Seçmeli Soru</option>
            </select>

            {selectedQuestionType === "boolean" && <BooleanQuestionForm />}
            {selectedQuestionType === "written" && <WrittenQuestionForm />}
            {selectedQuestionType === "multipleChoice" && <MultipleChoiceQuestionForm />}
          </div>
        )}

        <div className="button-group">
          <button onClick={() => { handleShowAllQuestions(); setShowAllQuestions(!showAllQuestions); }} style={{ marginBottom: "20px", backgroundColor: "var(--color-green)"}}>
            {showAllQuestions ? "Bütün Soruları Gizle" : "Bütün Soruları Listele"}
          </button>
        </div>

        {showAllQuestions && questions.length > 0 && (
          <div>
            <h2>Tüm Sorular</h2>
            <div style={scrollContainerStyle}>
              <ul>
                {questions.map((question) => (
                  <li key={question.id}>
                    <input
                      type="checkbox"
                      checked={selectedQuestions.includes(question.id)} // Seçili soruları kontrol et
                      onChange={(e) => {
                        const { checked } = e.target;
                        setSelectedQuestions((prevSelected) =>
                          checked
                            ? [...prevSelected, question.id]
                            : prevSelected.filter((id) => id !== question.id)
                        );
                      }}
                    />
                    <span style={questionTextStyle}>{question.soruMetni}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        )}

        <div style={{ marginBottom: "20px" }}>
          <input
            type="text"
            placeholder="Anket Adı"
            value={surveyName}
            onChange={(e) => setSurveyName(e.target.value)}
            style={inputStyle}
          />
        </div>

        <div style={{ textAlign: "center" }}>
          <button onClick={handleCreateSurvey} style={{ marginBottom: "20px", backgroundColor: "var(--color-orange)"}} >
            Anketi Oluştur
          </button>
        </div>
      </div>
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

const smallButtonStyle = {
  backgroundColor: "#4CAF50",
  color: "white",
  padding: "5px 10px", // Küçültülmüş padding
  fontSize: "14px", // Küçültülmüş font boyutu
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
  maxHeight: "300px",
  overflowY: "auto",
  border: "1px solid #ddd",
  borderRadius: "5px",
  marginBottom: "20px",
};

export default CreateSurveyPage;
