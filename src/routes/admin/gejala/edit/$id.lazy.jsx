import { createLazyFileRoute, useNavigate } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Card from "react-bootstrap/Card";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import { getPenyakit } from "../../../../service/penyakit";
import { getGejalaById, updateGejala } from "../../../../service/gejala";
import Protected from "../../../../components/Auth/Protected";
import { toast } from "react-toastify";
import { useQuery } from "@tanstack/react-query";
import { useSelector } from "react-redux";
import { useMutation } from "@tanstack/react-query";

export const Route = createLazyFileRoute("/admin/gejala/edit/$id")({
  component: () => (
    <Protected roles={[1]}>
      <EditsGejala />
    </Protected>
  ),
});

function EditsGejala() {
  const navigate = useNavigate();
  const { id } = Route.useParams();
  const [nama, setnama] = useState("");

  const { token } = useSelector((state) => state.auth);

  const {
    data: gejala,
    isSuccess: gejalaisSuccess,
    isPending: gejalaisPending,
  } = useQuery({
    queryKey: ["gejala", id],
    queryFn: () => getGejalaById(id),
    enabled: !!token,
    retry: 0,
  });

  useEffect(() => {
    if (gejalaisSuccess && gejala) {
      setnama(gejala.nama);
    }
  }, [gejala, gejalaisSuccess]);

  const { mutate: editGejala } = useMutation({
    mutationFn: (body) => {
      return updateGejala(id, body);
    },
    onSuccess: () => {
      toast.success("Gejala Sukses Diedit!");
      navigate({ to: "/admin/gejala" });
    },
    onError: (err) => {
      toast.error(err?.message);
    },
  });

  const onSubmit = async (event) => {
    event.preventDefault();

    const result = {
      nama: nama,
    };

    editGejala(result);
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
      <Row className="mt-5">
        <Col className="ms-lg-5">
          <Card>
            <Card.Header className="text-center">Edit Gejala</Card.Header>
            <Card.Body>
              <Form onSubmit={onSubmit}>
                <Form.Group as={Row} className="mb-3" controlId="nama">
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
                    Update Gejala
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

export default EditsGejala;
