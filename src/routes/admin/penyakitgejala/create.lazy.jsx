import { createLazyFileRoute, useNavigate } from "@tanstack/react-router";
import { useState } from "react";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Card from "react-bootstrap/Card";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import Image from "react-bootstrap/Image";
import { toast } from "react-toastify";
import { getGejala } from "../../../service/gejala";
import { createPenyakitGejala } from "../../../service/penyakitgejala";
import { useMutation, useQuery } from "@tanstack/react-query";
import Protected from "../../../components/Auth/Protected";
import { useSelector } from "react-redux";
import { getPenyakit } from "../../../service/penyakit";

// Rute untuk halaman CreatePenyakitGejala
export const Route = createLazyFileRoute("/admin/penyakitgejala/create")({
  component: () => (
    <Protected roles={[1]}>
      <CreatesPenyakitGejala />
    </Protected>
  ),
});

// Komponen untuk membuat mobil baru
function CreatesPenyakitGejala() {
  const navigate = useNavigate();

  // State untuk input form

  const [cf, setCf] = useState(0);
  const [gejala_id, setGejalaId] = useState(0);
  const [penyakit_id, setPenyakitId] = useState(0);
  const { token } = useSelector((state) => state.auth);
  // Mengambil data model mobil menggunakan useQuery
  const {
    data: gejala,
    isLoading,
    isError,
    isSuccess,
  } = useQuery({
    queryKey: ["gejala"], // Updated queryKey
    queryFn: () => getGejala(), // Updated queryFn
    enabled: !!token, // only run query if there's an id
  });
  const {
    data: penyakit,
    isLoading: loadingPenyakit,
    isError: errorPenyakit,
    isSuccess: suksesPenyakit,
  } = useQuery({
    queryKey: ["penyakit"], // Updated queryKey
    queryFn: () => getPenyakit(), // Updated queryFn
    enabled: !!token, // only run query if there's an id
  });
  // Mutasi untuk membuat mobil baru
  const { mutate: createsPenyakitGejala, isLoading: isCreating } = useMutation({
    mutationFn: createPenyakitGejala,
    onSuccess: () => {
      toast.success("Car created successfully!");
      navigate({ to: "/admin/penyakitgejala" });
    },
    onError: (error) => {
      toast.error(error.message || "Failed to create Penyakit Gejala");
    },
  });
  console.log("ini request : ", cf, gejala_id, penyakit_id);
  // Menangani pengiriman form
  const onSubmit = async (event) => {
    event.preventDefault();

    // Membuat request untuk membuat mobil
    const request = {
      cf: cf,
      penyakit_id: penyakit_id,
      gejala_id: gejala_id,
    };

    // Menjalankan mutasi untuk membuat mobil
    createsPenyakitGejala(request);
  };

  // Loading dan Error handling untuk query models

  return (
    <>
      <Row className="ms-2 mb-3 mt-4 align-items-center">
        <Button
          variant="outline-primary"
          style={{
            width: "150px",
            marginRight: "auto",
          }}
          onClick={() => {
            navigate({ to: "/admin/penyakitgejala" });
          }}
        >
          Back
        </Button>
      </Row>

      <Row className="mt-5">
        <Col className="offset-md-3">
          <Card>
            <Card.Header className="text-center">Create Car</Card.Header>
            <Card.Body>
              <Form onSubmit={onSubmit}>
                {/* Plate Field */}
                <Form.Group as={Row} className="mb-3" controlId="plate">
                  <Form.Label column sm={3}>
                    Cf
                  </Form.Label>
                  <Col sm="9">
                    <Form.Control
                      type="number"
                      step="0.1"
                      min="0"
                      max="1"
                      placeholder="Isi nilai Cf"
                      required
                      value={cf}
                      onChange={(event) => setCf(event.target.value)}
                    />
                  </Col>
                </Form.Group>

                {/* Car Model */}
                <Form.Group as={Row} className="mb-3" controlId="model">
                  <Form.Label column sm={3}>
                    Gejala
                  </Form.Label>
                  <Col sm="9">
                    <Form.Select
                      onChange={(event) =>
                        setGejalaId(Number(event.target.value))
                      }
                      required
                    >
                      <option disabled selected value="">
                        Pilih Gejala
                      </option>
                      {isSuccess &&
                        gejala &&
                        gejala.map((model) => (
                          <option key={model.id} value={model.id}>
                            {model.nama}
                          </option>
                        ))}
                    </Form.Select>
                  </Col>
                </Form.Group>
                <Form.Group as={Row} className="mb-3" controlId="model">
                  <Form.Label column sm={3}>
                    Penyakit
                  </Form.Label>
                  <Col sm="9">
                    <Form.Select
                      onChange={(event) =>
                        setPenyakitId(Number(event.target.value))
                      }
                      required
                    >
                      <option disabled selected value="">
                        Pilih Penyakit
                      </option>
                      {suksesPenyakit &&
                        penyakit &&
                        penyakit.map((penyakits) => (
                          <option key={penyakits.id} value={penyakits.id}>
                            {penyakits.nama}
                          </option>
                        ))}
                    </Form.Select>
                  </Col>
                </Form.Group>

                <div className="d-grid gap-2">
                  <Button type="submit" variant="primary" disabled={isCreating}>
                    {isCreating ? "Creating..." : "Create Car"}
                  </Button>
                </div>
              </Form>
            </Card.Body>
          </Card>
        </Col>
        <Col md={3}></Col>
      </Row>
    </>
  );
}

export default CreatesPenyakitGejala;
