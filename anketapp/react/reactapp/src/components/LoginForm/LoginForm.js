import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./LoginForm.css";

const LoginForm = ({ setCurrentUser }) => {
  const [name, setName] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleLogin = async (event) => {
    event.preventDefault();
    try {
      const response = await fetch(
        `http://localhost:8080/api/person/kullanici?name=${name}&password=${password}`,
        {
          method: "POST",
          headers: {
            "Accept": "*/*",
          },
        }
      );

      if (response.ok) {
        const data = await response.json();
        setCurrentUser(data);
        localStorage.setItem("currentUser", JSON.stringify(data));

        if (data.userType === "Admin") {
          navigate("/admin-dashboard");
        } else if (data.userType === "User") {
          navigate("/user-dashboard");
        }
      } else {
        setError("Giriş bilgileri hatalı.");
      }
    } catch (error) {
      setError("Bir hata oluştu.");
    }
  };

  return (
    <div className="login-page">
      <div className="left-panel">
        <h1>AnketApp'e Hoşgeldiniz</h1>
      </div>
      <div className="right-panel">
        <div className="login-container">
          <h2>Giriş Yap</h2>
          <form onSubmit={handleLogin}>
            <div className="input-group">
              <label htmlFor="name">Kullanıcı Adı:</label>
              <input
                type="text"
                id="name"
                value={name}
                onChange={(e) => setName(e.target.value)}
                required
              />
            </div>
            <div className="input-group">
              <label htmlFor="password">Şifre:</label>
              <input
                type="password"
                id="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
            </div>
            {error && <p className="error-message">{error}</p>}
            <button type="submit">Giriş Yap</button>
          </form>
          <button
            className="signup-button"
            onClick={() => navigate("/uye-ol")}
          >
            Üye Ol
          </button>
        </div>
      </div>
    </div>
  );
};

export default LoginForm;
