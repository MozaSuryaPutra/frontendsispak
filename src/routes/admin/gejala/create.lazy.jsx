import { createLazyFileRoute, useNavigate } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Card from "react-bootstrap/Card";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
//import { getType } from "../../../service/carType";
import { createGejala } from "../../../service/gejala";
import Protected from "../../../components/Auth/Protected";
import { toast } from "react-toastify";
import { useQuery } from "@tanstack/react-query";
import { useSelector } from "react-redux";
import { useMutation } from "@tanstack/react-query";

export const Route = createLazyFileRoute("/admin/gejala/create")({
  component: () => (
    <Protected roles={[1]}>
      <CreatesGejala />
    </Protected>
  ),
});

function CreatesGejala() {
  const navigate = useNavigate();
  const { token } = useSelector((state) => state.auth);

  const [nama, setnama] = useState("");

  const { mutate: createGejalas } = useMutation({
    mutationFn: (body) => {
      return createGejala(body);
    },
    onSuccess: () => {
      toast.success("Type created successfully!");
      navigate({ to: "/admin/gejala" });
    },
    onError: (err) => {
      toast.error(err?.message);
    },
  });
  // Add new

  const onSubmit = async (event) => {
    event.preventDefault();
    //Check if already + put at least 1 specs and options

    const result = {
      nama: nama,
    };

    createGejalas(result);
  };

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
            navigate({ to: "/admin/gejala" });
          }}
        >
          Back
        </Button>
      </Row>

      <Row className=" d-flex align-items-center mb-3">
        <Col Col md={8} lg={6} className="ms-auto me-auto">
          <Card>
            <Card.Header className="text-center">Create Model</Card.Header>
            <Card.Body>
              <Form onSubmit={onSubmit}>
                <Form.Group as={Row} className="mb-3" controlId="model_name">
                  <Form.Label column sm={3}>
                    Nama Gejala
                  </Form.Label>
                  <Col sm="9">
                    <Form.Control
                      type="text"
                      placeholder="Nama Gejala"
                      required
                      value={nama}
                      onChange={(e) => setnama(e.target.value)}
                    />
                  </Col>
                </Form.Group>

                <div className="d-grid gap-2">
                  <Button type="submit" variant="primary">
                    Create Model
                  </Button>
                </div>
              </Form>
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </>
  );
}

export default CreatesGejala;
