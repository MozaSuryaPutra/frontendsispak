import React from "react";

const FooterSection = () => (
  <div id="footer" className="footer container my-5 pt-lg-5">
    <div className="row align-items-start">
      <div className="col-lg-4 mt-lg-3 d-flex flex-column justify-content-start">
        <p className="mb-3">
          Jalur dua Univeristas Lampung, Jalan Prof. Dr Jl. Prof. Dr. Ir.
          Sumantri Brojonegoro No.1, Kota Bandar Lampung, Lampung 35141
        </p>
        <p className="mb-3">mozasheilaghozalidevrina@gmail.com</p>
        <p className="mb-0">081369365272</p>
      </div>

      <div
        className="col-lg-2 mt-3 d-flex flex-column justify-content-start"
        style={{ fontWeight: "bold" }}
      >
        <a
          className="footer-link"
          href="#our-services"
          style={{ color: "#5CB85F" }}
        >
          Our Services
        </a>
        <a
          className="footer-link mt-2"
          href="#why-us"
          style={{ color: "#5CB85F" }}
        >
          Why Us
        </a>
      </div>

      <div className="col-lg-3 mt-3 d-flex flex-column justify-content-start">
        <p className="mb-2">Connect with Us</p>
        <div className="d-flex justify-content-start align-items-center">
          <a
            href="https://facebook.com"
            target="_blank"
            rel="noopener noreferrer"
            aria-label="Facebook"
            className="me-3"
          >
            <img
              src="/icon_facebook.png"
              className="img-fluid"
              alt="Facebook"
            />
          </a>
          <a
            href="https://instagram.com"
            target="_blank"
            rel="noopener noreferrer"
            aria-label="Instagram"
            className="me-3"
          >
            <img
              src="/icon_instagram.png"
              className="img-fluid"
              alt="Instagram"
            />
          </a>
          <a
            href="https://twitter.com"
            target="_blank"
            rel="noopener noreferrer"
            aria-label="Twitter"
            className="me-3"
          >
            <img src="/icon_twitter.png" className="img-fluid" alt="Twitter" />
          </a>
          <a
            href="mailto:binarcarrental@gmail.com"
            className="me-3"
            aria-label="Mail"
          >
            <img src="/icon_mail.png" className="img-fluid" alt="Mail" />
          </a>
          <a
            href="https://twitch.tv"
            target="_blank"
            rel="noopener noreferrer"
            aria-label="Twitch"
            className="me-3"
          >
            <img src="/icon_twitch.png" className="img-fluid" alt="Twitch" />
          </a>
        </div>
      </div>

      <div className="col-lg-3 mt-3 d-flex flex-column justify-content-start">
        <p className="mb-2">Copyright Sistem Pakar 2024</p>
        <p
          className="footer-brand"
          style={{
            color: "#5CB85F",
            fontFamily: "Helvetica",
            fontWeight: "bold",
          }}
        >
          Sispak
        </p>
      </div>
    </div>
  </div>
);

export default FooterSection;
