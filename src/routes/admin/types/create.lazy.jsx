import { createLazyFileRoute, useNavigate } from "@tanstack/react-router";
import { useState } from "react";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Card from "react-bootstrap/Card";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import { createType } from "../../../service/carType";
import { toast } from "react-toastify";
import Protected from "../../../components/Auth/Protected";
import { useMutation } from "@tanstack/react-query";

export const Route = createLazyFileRoute("/admin/types/create")({
  component: () => (
    <Protected roles={[1]}>
      <CreateTypes />
    </Protected>
  ),
});

function CreateTypes() {
  const [nama, setNama] = useState("");
  const [deskripsi, setDeskripsi] = useState("");
  const [solusi, setSolusi] = useState("");
  const navigate = useNavigate();
  const { mutate: createCarType } = useMutation({
    mutationFn: (body) => {
      return createType(body);
    },
    onSuccess: () => {
      toast.success("Penyakit Berhasil Dibuat!");
      navigate({ to: "/admin/types" });
    },
    onError: (err) => {
      toast.error(err?.message);
    },
  });
  const onSubmit = async (event) => {
    event.preventDefault();

    // Call createStudent function with form data
    const result = {
      nama: nama,
      deskripsi: deskripsi,
      solusi: solusi,
    };

    createCarType(result);
  };

  return (
    <>
      <Row className="mt-4 align-items-center">
        <Button
          variant="outline-primary"
          style={{
            width: "150px",
            marginRight: "auto",
          }}
          onClick={() => {
            navigate({ to: "/admin/types" });
          }}
        >
          Back
        </Button>
      </Row>

      <Row className="mt-5">
        <Col className="offset-md-3">
          <Card>
            <Card.Header className="text-center">Create Types</Card.Header>
            <Card.Body>
              <Form onSubmit={onSubmit}>
                <Form.Group as={Row} className="mb-3" controlId="nama">
                  <Form.Label column sm={3}>
                    Nama Penyakit
                  </Form.Label>
                  <Col sm="9">
                    <Form.Control
                      type="text"
                      placeholder="Nama"
                      required
                      value={nama}
                      onChange={(event) => {
                        setNama(event.target.value);
                      }}
                    />
                  </Col>
                </Form.Group>
                <Form.Group as={Row} className="mb-3" controlId="deskripsi">
                  <Form.Label column sm={3}>
                    Deskripsi
                  </Form.Label>
                  <Col sm="9">
                    <Form.Control
                      as="textarea"
                      type="text"
                      placeholder="Deskripsi"
                      required
                      value={deskripsi}
                      onChange={(event) => {
                        setDeskripsi(event.target.value);
                      }}
                    />
                  </Col>
                </Form.Group>
                <Form.Group as={Row} className="mb-3" controlId="solusi">
                  <Form.Label column sm={3}>
                    Solusi
                  </Form.Label>
                  <Col sm="9">
                    <Form.Control
                      as="textarea"
                      type="text"
                      placeholder="solusi"
                      required
                      value={solusi}
                      onChange={(event) => {
                        setSolusi(event.target.value);
                      }}
                    />
                  </Col>
                </Form.Group>

                <div className="d-grid gap-2">
                  <Button type="submit" variant="primary">
                    Create Penyakit
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
