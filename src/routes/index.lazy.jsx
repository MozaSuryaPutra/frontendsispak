import { createLazyFileRoute, useNavigate } from "@tanstack/react-router";
import { FaCheck } from "react-icons/fa";
import Accordion from "../components/Accordion";
import { Button, Carousel } from "react-bootstrap";
import { FaStar } from "react-icons/fa";
import FooterSection from "../components/FooterSection";

export const Route = createLazyFileRoute("/")({
  component: Index,
});

function Index() {
  const navigate = useNavigate();

  // Accordion items
  const accordionItems = [
    {
      title: "Apa saja syarat yang dibutuhkan?",
      content: <strong>This is the first item's accordion body.</strong>,
    },
    {
      title: "Berapa hari minimal sewa mobil lepas kunci?",
      content: <strong>This is the second item's accordion body.</strong>,
    },
    {
      title: "Berapa hari sebelumnya sebaiknya booking sewa mobil?",
      content: <strong>This is the third item's accordion body.</strong>,
    },
    {
      title: "Apakah Ada biaya antar-jemput?",
      content: <strong>This is the fourth item's accordion body.</strong>,
    },
    {
      title: "Bagaimana jika terjadi kecelakaan?",
      content: <strong>This is the fifth item's accordion body.</strong>,
    },
  ];

  return (
    <>
      <div style={{ backgroundColor: "#f1f3ff" }}>
        <div id="homepage" className="homepage container-fluid">
          <div className="row">
            <div className="col-lg-6 mt-3 d-flex flex-column justify-content-center">
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
              <div className="d-flex justify-content-start ms-lg-5 ps-lg-5">
                <Button
                  className="btn btn-primary me-4"
                  style={{
                    backgroundColor: "#5CB85F",
                    borderColor: "#5CB85F",
                  }}
                  onClick={() => {
                    navigate({ to: "/search" });
                  }}
                >
                  Mulai Diagnosis
                </Button>
              </div>
            </div>
            <div className="col-lg-6 mt-5 d-flex align-items-end justify-content-end">
              <img
                src="/gambardokter.png"
                className="img-fluid w-100 car-image align-self-end"
                alt="Mercedes"
              />
            </div>
          </div>
        </div>
      </div>

      <div id="our-services" className="our-services container mt-5">
        <div className="row">
          <div className="col-lg-6 mt-5 ms-auto d-flex align-items-center justify-content-center">
            <img
              src="/doktercantik.png"
              className="img-fluid service-image"
              alt="Service"
            />
          </div>
          <div className="col-lg-6 mt-3 d-flex flex-column justify-content-start">
            <p
              className="mb-4 ms-2"
              style={{ fontSize: "30px", fontWeight: "700" }}
            >
              Sistem Pakar Terbaik Untuk Kamu Yang Ingin Mendiagnosis Penyakit
              Mata Kamu Dengan Menggunakan Metode Certainty Factor (CF)
            </p>
            <p className="ms-2">
              Metode Certainty Factor (CF) adalah salah satu metode yang
              digunakan dalam sistem pakar untuk menangani ketidakpastian dalam
              pengambilan keputusan. Metode ini diperkenalkan oleh Shortliffe
              dan Buchanan dalam proyek MYCIN, sebuah sistem pakar untuk
              diagnosis penyakit infeksi bakteri.
            </p>
            <div className="flex-container">
              <ul className="list-group" style={{ border: "none", padding: 0 }}>
                <li className="list-group-item" style={{ border: "none" }}>
                  <FaCheck className="me-2" /> Masukkan Gejala Yang Kamu Alami
                </li>
                <li className="list-group-item" style={{ border: "none" }}>
                  <FaCheck className="me-2" /> Masukkan Keyakinan Kamu Akan
                  Gejala Itu dari 0 - 1
                </li>
                <li className="list-group-item" style={{ border: "none" }}>
                  <FaCheck className="me-2" /> Klik Kirim
                </li>
                <li className="list-group-item" style={{ border: "none" }}>
                  <FaCheck className="me-2" /> Menampilkan Hasil Diagnosis,
                  Deskripsi, Solusi
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>

      <div id="why-us" className="why-us container mt-5 pt-lg-5">
        <div className="row">
          <div className="col-lg-6 mt-3 d-flex flex-column justify-content-start">
            <h5
              className="mb-3 mt-3"
              style={{ fontWeight: "bold", fontSize: "24px" }}
            >
              Why us?
            </h5>
            <p className="mb-4">Mengapa harus Sistem Pakar Kami</p>
          </div>
        </div>
        <div className="row row-cols-1 row-cols-md-4 g-4">
          <div className="col">
            <div className="card h-100">
              <div className="card-body">
                <img
                  src="/icon_thumb.png"
                  className="img-fluid thumb-image mb-3"
                  alt="Thumb"
                />
                <h5 className="card-title mb-3">Penyakit Lengkap</h5>
                <p className="card-text">Hasilnya Baik dan Tepat serta cepat</p>
              </div>
            </div>
          </div>
          <div className="col">
            <div className="card h-100">
              <div className="card-body">
                <img
                  src="/icon_price.png"
                  className="img-fluid price-image mb-3"
                  alt="Price"
                />
                <h5 className="card-title mb-3">Tidak Dipungut Biaya</h5>
                <p className="card-text">
                  Menggunakan Sistem Pakar Ini Dipungut Biaya Sepeserpun
                </p>
              </div>
            </div>
          </div>
          <div className="col">
            <div className="card h-100">
              <div className="card-body">
                <img
                  src="/icon_hours.png"
                  className="img-fluid hours-image mb-3"
                  alt="Hours"
                />
                <h5 className="card-title mb-3">Layanan 24 Jam</h5>
                <p className="card-text">Siap melayani Anda Selama 24 jam</p>
              </div>
            </div>
          </div>
          <div className="col">
            <div className="card h-100">
              <div className="card-body">
                <img
                  src="/icon_professional.png"
                  className="img-fluid professional-image mb-3"
                  alt="Professional"
                />
                <h5 className="card-title mb-3">
                  Basis Pengetahuan Diambil dari Paper dan Kredibel
                </h5>
                <p className="card-text">
                  Basis Pengetahuannya Diambil dari Paper yang Kredibel dan
                  tidak Asal - Asalan
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div id="start" className="start container mt-5 pt-5">
        <div
          className="text-center text-md-left"
          style={{
            backgroundColor: "#f1f3ff",
            padding: "40px 0",
            borderRadius: "20px",
          }}
        >
          <h1 style={{ color: "#5CB85F" }}>
            Silahkan Gunakan Sistem Pakar Kami
          </h1>
          <p
            className="text-justify ms-5 me-5 mt-5"
            style={{ color: "#5CB85F" }}
          >
            Sistem Pakar Ini Bisa Digunakan 24 Jam Jadi Kapanpun Kamu Mau Kamu
            Bisa Menggunakannya
          </p>
          <Button
            className="btn btn-primary me-4"
            style={{
              backgroundColor: "#5CB85F",
              borderColor: "#5CB85F",
            }}
            onClick={() => {
              navigate({ to: "/search" });
            }}
          >
            Mulai Sewa Mobil
          </Button>
        </div>
      </div>

      <FooterSection />
    </>
  );
}
