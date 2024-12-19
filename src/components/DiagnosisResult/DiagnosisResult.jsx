import React, { useState, useEffect } from "react";
import { useQuery } from "@tanstack/react-query";
import { useSelector } from "react-redux";
import { getPenyakitById } from "../../service/penyakit";
import { FaExclamationCircle, FaCheckCircle } from "react-icons/fa"; // Menambahkan ikon untuk status

// Component untuk menampilkan hasil diagnosis
const DiagnosisResult = ({ dataDiagnosis }) => {
  const { token } = useSelector((state) => state.auth);
  const [penyakit, setPenyakit] = useState([]);

  // Memuat data berdasarkan ID diagnosis menggunakan React Query
  const { data, isSuccess, isLoading, isError } = useQuery({
    queryKey: ["types", dataDiagnosis?.penyakit_id],
    queryFn: () => getPenyakitById(dataDiagnosis?.penyakit_id),
    enabled: !!token && !!dataDiagnosis?.penyakit_id, // Pastikan ID tersedia sebelum melakukan request
    retry: 0,
  });

  useEffect(() => {
    if (isSuccess) {
      setPenyakit(data || []);
    }
  }, [data, isSuccess]);

  // Jika loading, tampilkan loading indicator atau pesan sementara
  if (isLoading) {
    return <div className="loading">Loading...</div>;
  }

  // Jika terjadi error saat fetching data
  if (isError) {
    return (
      <div className="error-message">
        <FaExclamationCircle size={24} color="red" /> Error loading diagnosis
        type.
      </div>
    );
  }

  // Jika dataDiagnosis atau data kosong, tampilkan pesan atau nilai default
  if (!dataDiagnosis) {
    return (
      <div className="no-data">
        <FaExclamationCircle size={24} color="orange" /> No diagnosis data
        available.
      </div>
    );
  }

  return (
    <div className="diagnosis-result">
      <h3 className="diagnosis-title">Diagnosis Result</h3>
      <ul className="diagnosis-details">
        <li className="diagnosis-item">
          <strong>ID Diagnosis:</strong>{" "}
          {dataDiagnosis?.id || "No ID available"}
        </li>
        <li className="diagnosis-item">
          <strong>Hasil CF:</strong> {dataDiagnosis?.hasilcf || "No CF result"}
        </li>
        <li className="diagnosis-item">
          <strong>Penyakit:</strong> {penyakit?.nama || "No disease type found"}
        </li>
        <li className="diagnosis-item">
          <strong>Deskripsi Penyakit:</strong>{" "}
          {penyakit?.deskripsi || "No description available"}
        </li>
        <li className="diagnosis-item">
          <strong>Solusi:</strong> {penyakit?.solusi || "No solution available"}
        </li>
        <li className="diagnosis-item">
          <strong>Tanggal Waktu:</strong>{" "}
          {dataDiagnosis?.tanggalwaktu || "No date available"}
        </li>
      </ul>

      {/* Status pesan */}
      <div className="status-message">
        {dataDiagnosis?.hasilcf > 0.8 ? (
          <div className="status-success">
            <FaCheckCircle size={24} color="green" /> Diagnosis confirmed with
            high certainty!
          </div>
        ) : (
          <div className="status-warning">
            <FaExclamationCircle size={24} color="orange" /> Diagnosis still
            uncertain, further tests needed.
          </div>
        )}
      </div>
    </div>
  );
};

export default DiagnosisResult;

// Tambahkan gaya CSS berikut
const style = `
.diagnosis-result {
  background-color: #f9f9f9;
  padding: 20px;
  border-radius: 8px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
  max-width: 600px;
  margin: auto;
}

.diagnosis-title {
  font-size: 24px;
  font-weight: bold;
  color: #333;
  margin-bottom: 10px;
  text-align: center;
}

.diagnosis-details {
  list-style: none;
  padding: 0;
}

.diagnosis-item {
  padding: 10px 0;
  border-bottom: 1px solid #ddd;
  font-size: 16px;
  color: #555;
}

.diagnosis-item strong {
  color: #333;
}

.loading {
  text-align: center;
  font-size: 18px;
  color: #007bff;
}

.error-message,
.no-data {
  text-align: center;
  font-size: 18px;
  color: #ff6347;
}

.status-message {
  margin-top: 20px;
  text-align: center;
}

.status-success,
.status-warning {
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 18px;
  padding: 10px;
  border-radius: 8px;
}

.status-success {
  background-color: #d4edda;
  color: #155724;
}

.status-warning {
  background-color: #fff3cd;
  color: #856404;
}

.status-success svg,
.status-warning svg {
  margin-right: 10px;
}
`;

const styleSheet = document.createElement("style");
styleSheet.type = "text/css";
styleSheet.innerText = style;
document.head.appendChild(styleSheet);
