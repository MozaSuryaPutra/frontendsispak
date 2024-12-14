import { createLazyFileRoute, useNavigate } from "@tanstack/react-router";
import { useSelector } from "react-redux";
import Col from "react-bootstrap/Col";
import Row from "react-bootstrap/Row";
import Card from "react-bootstrap/Card";
import { useEffect } from "react";

export const Route = createLazyFileRoute("/profile")({
  component: Profile,
});

function Profile() {
  const navigate = useNavigate();
  const { user, token } = useSelector((state) => state.auth);

  useEffect(() => {
    if (!token) {
      navigate({ to: "/login" });
    }
  }, [navigate, token]);

  return (
    <Row className="mt-5">
      <Col className="offset-md-3">
        <Card>
          <Card.Img variant="top" src={user?.profile_picture} />
          <Card.Body>
            <Card.Title>{user?.name}</Card.Title>
            <Card.Text>{user?.email}</Card.Text>
          </Card.Body>
        </Card>
      </Col>
      <Col md={3}></Col>
    </Row>
  );
}
