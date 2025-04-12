import React, { useState } from "react";
import { Link } from "react-router-dom";
import "./AddQuestionPage.css"; // CSS dosyasını dahil et
import Sidebar from "./Sidebar";

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
        alert("Boolean soru başarıyla kaydedildi!");
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
      <button type="submit" style={{ marginBottom: "20px", backgroundColor: "var(--color-orange)"}}>Kaydet</button>
    </form>
  );
};

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
        alert("Yazmalı soru başarıyla kaydedildi!");
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
      <button type="submit" style={{ marginBottom: "20px", backgroundColor: "var(--color-orange)"}}>Kaydet</button>
    </form>
  );
};

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
        alert("Çoktan seçmeli soru başarıyla kaydedildi!");
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
      <button type="submit" style={{ marginBottom: "20px", backgroundColor: "var(--color-orange)"}}>Kaydet</button>
    </form>
  );
};

const AddQuestionPage = () => {
  const [selectedQuestionType, setSelectedQuestionType] = useState("");

  return (
    <div className="dashboard-container">
      <Sidebar/>

      <div className="content">
        <h1 className="title">Soru Ekleme Sayfası</h1>

        <div className="form-container">
          <label>Soru Türü Seçin:</label>
          <select
            value={selectedQuestionType}
            onChange={(e) => setSelectedQuestionType(e.target.value)}
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
      </div>
    </div>
  );
};

export default AddQuestionPage;
