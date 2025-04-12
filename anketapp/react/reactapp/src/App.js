import React, { useState } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import LoginForm from "./components/LoginForm/LoginForm";
import AdminDashboard from "./components/AdminDashboard";
import UserDashboard from "./components/UserDashboard";
import AddQuestionPage from "./components/AddQuestionPage"; // Yeni sayfa
import CreateSurveyPage from "./components/CreateSurveyPage"; // Yeni sayfa
import CevapKontrol from "./components/CevapKontrol";
import UyeOl from "./components/UyeOl";
import ListAllQuestions from "./components/ListAllQuestions";
import ListAllSurveys from "./components/ListAllSurveys";

function App() {
  const [currentUser, setCurrentUser] = useState(null);  // currentUser'ı burada saklıyoruz

  return (
    <Router>
      <Routes>
        <Route path="/" element={<LoginForm setCurrentUser={setCurrentUser} />} />
        <Route path="/admin-dashboard" element={<AdminDashboard />} />
        <Route path="/user-dashboard" element={<UserDashboard currentUser={currentUser} />} />
        <Route path="/add-question" element={<AddQuestionPage />} /> {/* AddQuestionPage yönlendirme */}
        <Route path="/create-survey" element={<CreateSurveyPage />} /> {/* CreateSurveyPage yönlendirme */}
        <Route path="/cevap-kontrol" element={<CevapKontrol />} /> {/* CevapKontrol yönlendirme */}
        <Route path="/uye-ol" element={<UyeOl />} /> {/* Uyeol yönlendirme */}
        <Route path="/soru-listele" element={<ListAllQuestions />} />
        <Route path="/anket-listele" element={<ListAllSurveys />} />
      </Routes>
    </Router>
  );
}

export default App;
