import React, { useState, useEffect } from "react";
import { saveAs } from "file-saver";
import * as XLSX from "xlsx";
import jsPDF from "jspdf";
import "jspdf-autotable";
import axios from "axios";
import "./UserDashboard.css";
import { notoSansFont } from "./fonts"; // fonts.js dosyasını içe aktarın



const UserDashboard = () => {
  const [anketler, setAnketler] = useState([]);
  const [secilenAnket, setSecilenAnket] = useState(null);
  const [sorular, setSorular] = useState([]);
  const [cevaplar, setCevaplar] = useState({});
  const [kaydetDurumu, setKaydetDurumu] = useState("");
  const [errorMessages, setErrorMessages] = useState([]); 
  const [personId, setPersonId] = useState(null);

  // LocalStorage'dan personId'yi al
  useEffect(() => {
    try {
      const currentUser = JSON.parse(localStorage.getItem("currentUser"));
      if (currentUser) {
        setPersonId(currentUser.id);  // personId'yi state'e al
      }
    } catch (error) {
      console.error("Yerel depolamadan kullanıcı bilgileri okunamadı.", error);
    }
  }, []);

  // Tüm anketleri çek
  useEffect(() => {
    axios.get("http://localhost:8080/api/anket/tum-anket-isimleri").then((response) => {
      setAnketler(response.data);
    });
  }, []);

  // Seçilen ankete göre soruları çek
  const anketSec = (anketAdi) => {
    axios.get(`http://localhost:8080/api/anket/anket/${anketAdi}`).then((response) => {
      setSecilenAnket(response.data);
      setSorular(response.data.sorular);
      setCevaplar({});
      setErrorMessages([]);  // Her yeni ankette hata mesajlarını sıfırla
    });
  };

  // Cevapları değiştir
  const cevapDegistir = (soruId, cevap) => {
    setCevaplar((prevCevaplar) => ({
      ...prevCevaplar,
      [soruId]: cevap,
    }));
  };

  const anketiExcelIndir = () => {
    if (!secilenAnket) {
      alert("Lütfen bir anket seçiniz!");
      return;
    }
    const workbook = XLSX.utils.book_new();
    const sheetData = [
      [ "Soru Metni", "Cevap Türü", "Seçenekler"],
      ...sorular.map((soru) => [
        soru.soruMetni,
        soru.type,
        [soru.opt1, soru.opt2, soru.opt3, soru.opt4].filter(Boolean).join(", "),
      ]),
    ];

    const worksheet = XLSX.utils.aoa_to_sheet(sheetData);
    XLSX.utils.book_append_sheet(workbook, worksheet, "Sorular");
    const excelBuffer = XLSX.write(workbook, { bookType: "xlsx", type: "array" });
    const data = new Blob([excelBuffer], { type: "application/octet-stream" });
    saveAs(data, `${secilenAnket.anketAdi}.xlsx`);
  };

  const anketiPDFIndir = () => {
    if (!secilenAnket) {
      alert("Lütfen bir anket seçiniz!");
      return;
    }

    const doc = new jsPDF();
        // Fontu ekleme ve ayarlama
        doc.addFileToVFS(`${notoSansFont.name}.ttf`, notoSansFont.base64);
    doc.addFont(`${notoSansFont.name}.ttf`, notoSansFont.name, notoSansFont.weight);
    doc.setFont(notoSansFont.name);

    doc.setFontSize(18);
    doc.setTextColor(40);
    doc.text("Anket Raporu", 105, 10, { align: "center" });
    doc.setFontSize(14);
    doc.text(`Anket Adı: ${secilenAnket.anketAdi}`, 105, 20, { align: "center" });
    doc.line(10, 25, 200, 25);

    let yPosition = 40;

    sorular.forEach((soru, index) => {
      doc.setFontSize(12);
      doc.setTextColor(0);
      doc.text(`${index + 1}. ${soru.soruMetni}`, 10, yPosition);
      yPosition += 8;

      const options = Object.keys(soru)
        .filter((key) => key.startsWith("opt"))
        .map((key, idx) => {
          const letter = String.fromCharCode(65 + idx);
          return `${letter}) ${soru[key]}`;
        });

      if (options.length > 0) {
        doc.setFontSize(11);
        doc.setTextColor(80);
        options.forEach((option, idx) => {
          doc.text(option, 15, yPosition + idx * 8);
        });
        yPosition += options.length * 8 + 5;
      } else {
        yPosition += 5;
      }

      if (yPosition > 280) {
        doc.addPage();
        yPosition = 20;
      }
    });

    doc.save(`${secilenAnket.anketAdi}.pdf`);
  };

  const cevaplariKaydet = () => {
    if (!secilenAnket || !personId) {
      setKaydetDurumu("Anket veya kullanıcı bilgisi eksik.");
      return;
    }

    axios
      .get(`http://localhost:8080/api/anket/cevaplamismi/${personId}/${secilenAnket.anketAdi}`)
      .then((response) => {
        if (response.data) {
          setKaydetDurumu("Bu anketi zaten cevapladınız.");
        } else {
          const cevaplarArray = Object.entries(cevaplar).map(([soruId, cevapMetni]) => ({
            anketId: secilenAnket.id,
            soruId: parseInt(soruId),
            cevapMetni,
            personId,
          }));

          const eksikVeriMesajlari = [];
          cevaplarArray.forEach((cevap) => {
            if (!cevap.anketId) eksikVeriMesajlari.push("Anket ID eksik!");
            if (!cevap.soruId) eksikVeriMesajlari.push("Soru ID eksik!");
            if (!cevap.cevapMetni) eksikVeriMesajlari.push(`Soru ${cevap.soruId} cevabı eksik!`);
            if (!cevap.personId) eksikVeriMesajlari.push("Kullanıcı ID eksik!");
          });

          if (eksikVeriMesajlari.length > 0) {
            setErrorMessages(eksikVeriMesajlari);
          } else {
            Promise.all(
              cevaplarArray.map((cevap) =>
                axios.post("http://localhost:8080/api/cevap/save", cevap)
              )
            )
              .then(() => {
                setKaydetDurumu("Cevaplar başarıyla kaydedildi!");
              })
              .catch((error) => {
                console.error("Cevap kaydedilirken hata oluştu:", error);
                setKaydetDurumu("Cevaplar kaydedilirken bir hata oluştu.");
              });
          }
        }
      })
      .catch((error) => {
        console.error("Cevaplama kontrolü yapılırken hata oluştu:", error);
        setKaydetDurumu("Cevaplama durumu kontrol edilemedi.");
      });
  };

  return (
    <div className="dashboard-container">
      <div className="sidebar">
        <h2>Anketler</h2>
        <div className="anket-list">
          {anketler.map((anketAdi, index) => (
            <button 
              key={index} 
              onClick={() => anketSec(anketAdi)}
              
              className="anket-button"
            >
              {anketAdi}
            </button>
          ))}
        </div>
      </div>

      <div className="content">
        {secilenAnket && (
          <div className="anket-details">
            <h2>{secilenAnket.anketAdi} Soruları</h2>
            {sorular.map((soru) => (
              <div key={soru.id} className="soru-karti">
                <p>{soru.soruMetni}</p>
                {soru.type === "BooleanSoru" ? (
                  <div className="toggle-container">
                    <span
                      className={`toggle-label ${
                        cevaplar[soru.id] === soru.opt1 ? "active" : ""
                      }`}
                      onClick={() => cevapDegistir(soru.id, soru.opt1)}
                    >
                      {soru.opt1}
                    </span>
                    <label className="switch">
                      <input
                        type="checkbox"
                        checked={cevaplar[soru.id] === soru.opt2}
                        onChange={(e) =>
                          cevapDegistir(
                            soru.id,
                            e.target.checked ? soru.opt2 : soru.opt1
                          )
                        }
                      />
                      <span className="slider"></span>
                    </label>
                    <span
                      className={`toggle-label ${
                        cevaplar[soru.id] === soru.opt2 ? "active" : ""
                      }`}
                      onClick={() => cevapDegistir(soru.id, soru.opt2)}
                    >
                      {soru.opt2}
                    </span>
                  </div>
                ) : soru.type === "YazmaliSoru" ? (
                  <textarea
                    rows="3"
                    className="text-area"
                    style={{ resize: "none" }}
                    onChange={(e) => cevapDegistir(soru.id, e.target.value)}
                  />
                ) : soru.type === "CoktanSecmeliSoru" ? (
                  <div className="radio-group">
                    {[soru.opt1, soru.opt2, soru.opt3, soru.opt4].map(
                      (secenek, index) => (
                        <div key={index}>
                          <label>
                            <input
                              type="radio"
                              name={`soru_${soru.id}`}
                              value={secenek}
                              onChange={(e) => cevapDegistir(soru.id, e.target.value)}
                            />
                            {secenek}
                          </label>
                        </div>
                      )
                    )}
                  </div>
                ) : null}
              </div>
            ))}
              {/* Cevap Kaydet ve İndirme Butonları */}
          <div className="actions">
            <button className="save-button" onClick={cevaplariKaydet} style={{ borderRadius: "0" }}>
              Cevapları Kaydet
            </button>
            <button className="download-button" onClick={anketiExcelIndir} style={{ borderRadius: "0" }}>
              <img src="excel.png" alt="Excel" />
              Excel
            </button>
            <button className="download-button" onClick={anketiPDFIndir} style={{ borderRadius: "0" }}>
              <img src="pdf.png" alt="PDF" />
              PDF
            </button>
          </div>

          {/* Hata Mesajları */}
          {errorMessages.length > 0 && (
            <div className="error-messages">
              <h3>Eksik Veri:</h3>
              <ul>
                {errorMessages.map((msg, index) => (
                  <li key={index}>{msg}</li>
                ))}
              </ul>
            </div>
          )}

          {/* Başarı Durumu */}
          {kaydetDurumu && <p className="success-message">{kaydetDurumu}</p>}
        </div>
      )}
    </div>
  </div>
);
};

export default UserDashboard;
