import React, { useState } from "react";
import { useQuery, useMutation } from "@tanstack/react-query";
import { createLazyFileRoute } from "@tanstack/react-router";
import { Container, Form, Row, Col, Button } from "react-bootstrap";
import { getGejala } from "../service/gejala";
import SearchCard from "../components/SearchCard";
import FooterSection from "../components/FooterSection";
import { useSelector } from "react-redux";
import { toast } from "react-toastify";
import { diagnosisPasien } from "../service/diagnosis/diagnosis";
import DiagnosisResult from "../components/DiagnosisResult/DiagnosisResult";
export const Route = createLazyFileRoute("/search")({
  component: CariMobil,
});

function CariMobil() {
  const [dataDiagnosis, setDiagnosis] = useState({});
  const [formData, setFormData] = useState({
    id_user: 1,
    gejala: [{ gejala_id: "", cf_user: "" }],
  });
  const [error, setError] = useState(""); // State untuk pesan error
  const { token } = useSelector((state) => state.auth);
  const {
    data: gejala,
    isLoading,
    isError,
    isSuccess,
  } = useQuery({
    queryKey: ["gejala"],
    queryFn: () => getGejala(),
    enabled: !!token,
  });

  // Mutation for diagnosisPasien
  const { mutate: diagnosisPasienKu, isLoading: isCreating } = useMutation({
    mutationFn: diagnosisPasien,
    onSuccess: (data) => {
      toast.success("Diagnosis berhasil!");
      console.log("Diagnosis Result:", data);
      setDiagnosis(data); // Log the diagnosis result
    },
    onError: (error) => {
      toast.error(error.message || "Diagnosis gagal");
    },
  });

  // Handle input change for both gejala and id_user
  const handleChange = (index, field, value) => {
    // Validasi cf_user agar hanya menerima float antara 0 dan 1
    if (field === "cf_user") {
      const numericValue = parseFloat(value);

      // Jika value adalah angka dan dalam rentang yang valid
      if (!isNaN(numericValue) && numericValue >= 0 && numericValue <= 1) {
        const newGejala = [...formData.gejala];
        newGejala[index][field] = numericValue; // Simpan value yang valid
        setFormData({ ...formData, gejala: newGejala });
      } else {
        // Jika input tidak valid, tampilkan pesan error
        setError("CF User harus angka antara 0 dan 1.");
      }
    }
    // Validasi gejala_id agar hanya menerima integer
    else if (field === "gejala_id") {
      const intValue = parseInt(value, 10);

      // Pastikan gejala_id adalah angka integer yang valid
      if (!isNaN(intValue)) {
        const newGejala = [...formData.gejala];
        newGejala[index][field] = intValue;
        setFormData({ ...formData, gejala: newGejala });
      } else {
        // Jika input tidak valid, tampilkan pesan error
        setError("Gejala ID harus angka.");
      }
    } else {
      const newGejala = [...formData.gejala];
      newGejala[index][field] = value;
      setFormData({ ...formData, gejala: newGejala });
    }
  };

  // Add a new gejala item
  const handleAddGejala = () => {
    if (formData.gejala.length >= 5) {
      setError("Maksimal 5 gejala dapat ditambahkan.");
      return;
    }
    setFormData({
      ...formData,
      gejala: [...formData.gejala, { gejala_id: "", cf_user: "" }],
    });
    setError(""); // Hapus pesan error jika ada
  };

  // Remove a gejala item
  const handleRemoveGejala = (index) => {
    const newGejala = formData.gejala.filter((_, i) => i !== index);
    setFormData({ ...formData, gejala: newGejala });
  };

  // Handle form submission
  const handleSubmit = (e) => {
    e.preventDefault();

    // Validasi minimal 3 gejala dan validasi gejala_id serta cf_user
    if (formData.gejala.length < 3) {
      setError("Minimal 3 gejala harus ditambahkan.");
      return;
    }

    // Validasi setiap gejala
    for (let i = 0; i < formData.gejala.length; i++) {
      const { gejala_id, cf_user } = formData.gejala[i];

      // Pastikan gejala_id adalah angka integer dan cf_user adalah angka float
      if (gejala_id === "" || isNaN(parseInt(gejala_id, 10))) {
        setError("Gejala ID harus berupa angka.");
        return;
      }
      if (
        cf_user === "" ||
        isNaN(parseFloat(cf_user)) ||
        cf_user < 0 ||
        cf_user > 1
      ) {
        setError("CF User harus angka antara 0 dan 1.");
        return;
      }
    }

    setError(""); // Hapus pesan error jika validasi lolos
    console.log(formData);
    // Call diagnosisPasien function with the formData
    diagnosisPasienKu(formData);
  };
  return (
    <>
      <div style={{ backgroundColor: "#f1f3ff" }}>
        <Container fluid id="homepage">
          <Row>
            <Col
              lg={6}
              className="mt-3 d-flex flex-column justify-content-center"
            >
              <h1
                className="mb-4 ms-lg-5 me-5 ps-lg-5"
                style={{ fontSize: "36px", fontWeight: "700" }}
              >
                Sistem Pakar Penyakit Mata
              </h1>
              <p className="mb-4 ms-lg-5 me-lg-5 ps-lg-5 pe-lg-5">
                Selamat datang di Aplikasi Kelompok Kami. Aplikasi ini
                menyediakan layanan 24 jam untuk kamu melakukan diagnosis
                penyakit mata dengan memasukkan gejala yang kamu rasakan dan
                skala keyakinan kamu.
              </p>
            </Col>
            <Col
              lg={6}
              className="mt-5 d-flex align-items-end justify-content-end"
            >
              <img
                src="/gambardokter.png"
                className="img-fluid w-100 car-image align-self-end"
                alt="Mercedes"
              />
            </Col>
          </Row>
        </Container>
      </div>

      <div className="form-container">
        <style>
          {`
          .form-container {
            width: 60%;
            margin: 50px auto;
            background-color: #ffffff;
            padding: 25px;
            box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
            border-radius: 10px;
          }
          .title {
            font-size: 18px;
            color: #555;
            margin-bottom: 20px;
            display: block;
            text-align: center;
          }
          .form-heading {
            font-size: 24px;
            color: #333;
            margin-bottom: 20px;
            text-align: center;
          }
          .form-group {
            margin-bottom: 20px;
          }
          .form-input {
            width: 100%;
            padding: 10px;
            margin-top: 8px;
            border: 1px solid #ddd;
            border-radius: 5px;
            font-size: 16px;
            transition: all 0.2s ease;
          }
          .form-input:focus {
            border-color: #007bff;
            box-shadow: 0 0 5px rgba(0, 123, 255, 0.5);
            outline: none;
          }
          .gejala-item {
            display: flex;
            gap: 10px;
            align-items: center;
            margin-bottom: 10px;
          }
          .gejala-item input {
            flex: 1;
          }
          .btn {
            display: inline-block;
            padding: 10px 20px;
            border: none;
            border-radius: 5px;
            font-size: 16px;
            cursor: pointer;
            transition: all 0.2s ease;
          }
          .btn-add {
            background-color: #28a745;
            color: white;
            margin-right: 10px;
          }
          .btn-add:hover {
            background-color: #218838;
          }
          .btn-delete {
            background-color: #dc3545;
            color: white;
          }
          .btn-delete:hover {
            background-color: #c82333;
          }
          .btn-submit {
            background-color: #007bff;
            color: white;
            margin-top: 20px;
            width: 100%;
          }
          .btn-submit:hover {
            background-color: #0056b3;
          }
        `}
        </style>
        <span className="title">
          <b>Pencariannmu</b>
        </span>
        <div>
          <h1 className="form-heading">Input Gejala</h1>

          {!isLoading && !isError && (
            <div>
              <form onSubmit={handleSubmit}>
                <div className="form-group mb-4">
                  <h4>Gejala:</h4>
                  {formData.gejala.map((item, index) => (
                    <div key={index} className="mb-3">
                      <Row>
                        <Col sm={7}>
                          <label>Nama Gejala:</label>
                          <select
                            className="form-control"
                            value={item.gejala_id}
                            onChange={(e) =>
                              handleChange(index, "gejala_id", e.target.value)
                            }
                          >
                            <option disabled value="">
                              Pilih Gejala
                            </option>
                            {isSuccess &&
                              gejala &&
                              gejala.map((model) => (
                                <option key={model.id} value={model.id}>
                                  {model.nama}
                                </option>
                              ))}
                          </select>
                        </Col>
                        <Col sm={3}>
                          <label>CF User:</label>
                          <input
                            type="number"
                            step="0.1"
                            max="1"
                            min="0"
                            className="form-control"
                            placeholder="CF User"
                            value={item.cf_user}
                            onChange={(e) =>
                              handleChange(index, "cf_user", e.target.value)
                            }
                          />
                        </Col>
                        <Col sm={2} className="d-flex align-items-end">
                          <Button
                            variant="danger"
                            onClick={() => handleRemoveGejala(index)}
                          >
                            Hapus
                          </Button>
                        </Col>
                      </Row>
                    </div>
                  ))}
                  <Button variant="success" onClick={handleAddGejala}>
                    Tambah Gejala
                  </Button>
                </div>
                {error && <p style={{ color: "red" }}>{error}</p>}
                <Button type="submit" variant="primary" className="w-100">
                  {isCreating ? "Mendiagnosis..." : "Submit"}
                </Button>
              </form>
            </div>
          )}
        </div>
      </div>

      <Container className="mt-4">
        <Row className="g-5" id="cars-content"></Row>
        {dataDiagnosis.length === 0 ? (
          <h1>Cars not found!</h1>
        ) : (
          <DiagnosisResult dataDiagnosis={dataDiagnosis} />
        )}
      </Container>

      <FooterSection />
    </>
  );
}
