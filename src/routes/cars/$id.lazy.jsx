import { createLazyFileRoute, Link, useNavigate } from "@tanstack/react-router";
import { Container, Form, Row, Col, Card, Button } from "react-bootstrap";
import { getCarsById, deleteCars } from "../../service/cars";
import { useSelector } from "react-redux";
import { useQuery, useMutation } from "@tanstack/react-query";
import FooterSection from "../../components/FooterSection";
import { FaCalendar, FaCog, FaUser } from "react-icons/fa";
import { toast } from "react-toastify";
import { format } from "date-fns";

export const Route = createLazyFileRoute("/cars/$id")({
  component: CarDetail,
});

function CarDetail() {
  const { id } = Route.useParams();
  const navigate = useNavigate();
  const { user } = useSelector((state) => state.auth);

  // Query to fetch car data
  const {
    data: car,
    isLoading,
    isError,
    isSuccess,
  } = useQuery({
    queryKey: ["car", id], // Updated queryKey
    queryFn: () => getCarsById(id), // Updated queryFn
    enabled: !!id, // only run query if there's an id
  });

  // Handling if car is not found
  if (isError) {
    return (
      <Row className="mt-5">
        <Col>
          <h1 className="text-center">Car is not found!</h1>
        </Col>
      </Row>
    );
  }

  // Loading state
  // if (isLoading) {
  //   return (
  //     <Row className="mt-5">
  //       <Col>
  //         <h1 className="text-center">Loading...</h1>
  //       </Col>
  //     </Row>
  //   )
  // }

  // const handleBackClick = () => {
  //   // Try going back in history using navigate(-1)
  //   navigate(-1);
  //   // If there’s no history, we navigate to a fallback route
  //   setTimeout(() => {
  //     if (window.history.state && window.history.state.idx <= 1) {
  //       // Check if we are at the root or there’s no previous page
  //       navigate({ to: "/search" });  // Your fallback route (or homepage, etc.)
  //     }
  //   }, 200);  // Delay to give time for navigate(-1) to potentially take effect
  // };

  return (
    <>
      <div style={{ backgroundColor: "#f1f3ff", height: "200px" }}></div>
      <div
        id="search-container"
        className="container search-container"
        style={{
          width: "50%",
          margin: "",
          position: "relative",
          top: "-85px",
          zIndex: 1,
          backgroundColor: "#fff",
          padding: "15px",
          boxShadow: "0 4px 8px rgba(0, 0, 0, 0.1)",
          borderRadius: "5px",
        }}
      >
        <span>
          <b>Pencariannmu</b>
        </span>
        <Row className="justify-content-center mt-2">
          <Col lg={5} md={6} className="mb-3">
            <Form.Group controlId="date-select">
              <Form.Label>Tanggal</Form.Label>
              <Form.Control type="date" value="availableAt" disabled />
            </Form.Group>
          </Col>
          <Col lg={7} md={6} className="mb-3">
            <Form.Group controlId="capacity-select">
              <Form.Label>Jumlah Penumpang</Form.Label>
              <Form.Select value="capacity" disabled>
                <option value="" selected hidden>
                  Pilih Kapasitas
                </option>
                {[1, 2, 3, 4, 5, 6].map((num) => (
                  <option key={num} value={num}>
                    {num}
                  </option>
                ))}
              </Form.Select>
            </Form.Group>
          </Col>
        </Row>
      </div>

      <Container>
        {/* Loading state */}
        {isLoading ? (
          <Col>
            <h4>Loading...</h4>
          </Col>
        ) : (
          <Row className="mb-3 g-5">
            <Col md={7}>
              <Card>
                <Card.Body className="mt-3">
                  <Card.Title>Detail Paket</Card.Title>
                  <ul>
                    <li>Manufacturer : {car?.carsModels?.manufacturer}</li>
                    <li>Model Name : {car?.carsModels?.model_name}</li>
                    <li>Plate : {car?.plate}</li>
                    <li>Specs : {car?.carsModels?.specs?.join(", ")}</li>
                    <li>Options : {car?.carsModels?.options?.join(", ")}</li>
                    <li>Fuel Type : {car?.carsModels?.car_types.fuel_type}</li>
                    <li>
                      Available :{" "}
                      {car?.available.toString().charAt(0).toUpperCase() +
                        car?.available.toString().slice(1)}
                    </li>
                    <li>
                      Available At:
                      {car?.availableAt.toString().substring(0, 10)}
                    </li>
                  </ul>

                  <span>Include</span>
                  <ul className="mt-2">
                    <li>
                      Apa saja yang termasuk dalam paket misal durasi max 12 jam
                    </li>
                    <li>Sudah termasuk bensin selama 12 jam</li>
                    <li>Sudah termasuk Tiket Wisata</li>
                    <li>Sudah termasuk pajak</li>
                  </ul>

                  <span>Exclude</span>
                  <ul className="mt-2">
                    <li>Tidak termasuk biaya makan sopir Rp 75.000/hari</li>
                    <li>
                      Jika overtime lebih dari 12 jam akan ada tambahan biaya Rp
                      20.000/jam
                    </li>
                    <li>Tidak termasuk akomodasi penginapan</li>
                  </ul>
                </Card.Body>
              </Card>
              <Button
                onClick={() => {
                  navigate({ to: `/search` });
                }}
                style={{
                  backgroundColor: "#5CB85F",
                  border: "#5CB85F",
                  marginTop: "10px",
                }}
                className="rounded-0"
              >
                Kembali
              </Button>
            </Col>
            <Col md={5}>
              <Card className="p-4">
                <Card.Img variant="top" src={car?.image} />
                <Card.Title className="mt-3">
                  {car?.carsModels.car_types.body_style}
                </Card.Title>
                <Row className="text-md-start">
                  <Card.Text>
                    <small>
                      {[
                        {
                          icon: <FaUser className="mb-1 me-1" />,
                          value: `${car?.carsModels.car_types.capacity} Orang`,
                        },
                        {
                          icon: <FaCog className="mb-1 mx-1 ms-3" />,
                          value: car?.carsModels.transmission,
                        },
                        {
                          icon: <FaCalendar className="mb-1 mx-1 ms-3" />,
                          value: `Tahun ${car?.year}`,
                        },
                      ].map((item, index) => (
                        <span key={index}>
                          {item.icon} {item.value}
                        </span>
                      ))}
                    </small>
                  </Card.Text>
                </Row>

                <Row className="mt-4 mb-2 d-flex justify-content-between">
                  <div className="col-auto">
                    <Card.Text>Total</Card.Text>
                  </div>
                  <div className="col-auto text-end">
                    <Card.Text>
                      <b>Rp. {car?.rentPerDay.toLocaleString("id-ID")}</b>
                    </Card.Text>
                  </div>
                </Row>
                <Button
                  onClick={() => {
                    toast.error("Fitur Belum Tersedia");
                  }}
                  style={{ backgroundColor: "#5CB85F", border: "#5CB85F" }}
                  className="rounded-0"
                >
                  Lanjut Pembayaran
                </Button>
              </Card>
            </Col>
          </Row>
        )}
      </Container>
      <FooterSection />
    </>
  );
}
