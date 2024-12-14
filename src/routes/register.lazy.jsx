import { createLazyFileRoute, useNavigate } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import Button from "react-bootstrap/Button";
import Container from "react-bootstrap/Container";
import Col from "react-bootstrap/Col";
import Form from "react-bootstrap/Form";
import Row from "react-bootstrap/Row";
import { register } from "../service/auth";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "react-toastify";
import { useMutation, useQuery } from "@tanstack/react-query";
import { setToken } from "../redux/slices/auth";
export const Route = createLazyFileRoute("/register")({
  component: Register,
});

function Register() {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { token } = useSelector((state) => state.auth);

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [profilePicture, setProfilePicture] = useState(undefined);

  // get token from local storage
  if (token) {
    navigate({ to: "/" });
  }

  // Mutation is used for POST, PUT, PATCH and DELETE
  const { mutate: registerUser } = useMutation({
    mutationFn: (body) => {
      return register(body);
    },
    onSuccess: (data) => {
      // set token to global state
      dispatch(setToken(data?.token));

      // redirect to home
      navigate({ to: "/" });
    },
    onError: (err) => {
      toast.error(err?.message);
    },
  });

  const onSubmit = async (event) => {
    event.preventDefault();

    if (password != confirmPassword) {
      toast.error("Password and password confirmation must be same!");
    }

    // hit API here
    const request = {
      name,
      email,
      password,
      profilePicture,
    };
    registerUser(request);
  };

  return (
    <>
      <Row style={{ overflow: "hidden", height: "100vh", width: "100vw" }}>
        <Col md={6}>
          <Container
            className="px-5 d-flex justify-content-center align-items-center"
            style={{ minHeight: "100vh" }}
          >
            <div className="w-100 m-lg-5 m-0">
              <h2 className="mb-4">Register</h2>
              <Form onSubmit={onSubmit}>
                <Form.Group as={Col} className="mb-2" controlId="name">
                  <Form.Label className="mb-2">Name</Form.Label>
                  <Form.Control
                    type="text"
                    placeholder="Name"
                    required
                    value={name}
                    onChange={(event) => {
                      setName(event.target.value);
                    }}
                  />
                </Form.Group>
                <Form.Group as={Col} className="mb-2" controlId="email">
                  <Form.Label className="mb-2">
                    Email (Jika Validation Failed berarti Ada email yang sama)
                  </Form.Label>

                  <Form.Control
                    type="email"
                    placeholder="Email"
                    required
                    value={email}
                    onChange={(event) => {
                      setEmail(event.target.value);
                    }}
                  />
                </Form.Group>
                <Form.Group as={Col} className="mb-2" controlId="password">
                  <Form.Label className="mb-2">Password</Form.Label>
                  <Form.Control
                    type="password"
                    placeholder="Password"
                    required
                    value={password}
                    onChange={(event) => {
                      setPassword(event.target.value);
                    }}
                  />
                </Form.Group>
                <Form.Group
                  as={Col}
                  className="mb-2"
                  controlId="confirmPassword"
                >
                  <Form.Label className="mb-2">Confirm Password</Form.Label>
                  <Form.Control
                    type="password"
                    placeholder="Confirm Password"
                    required
                    value={confirmPassword}
                    onChange={(event) => {
                      setConfirmPassword(event.target.value);
                    }}
                  />
                </Form.Group>
                <Form.Group
                  as={Col}
                  className="mb-4"
                  controlId="profilePicture"
                >
                  <Form.Label className="mb-2">Profile Picture</Form.Label>
                  <Form.Control
                    type="file"
                    placeholder="Choose File"
                    required
                    onChange={(event) => {
                      setProfilePicture(event.target.files[0]);
                    }}
                    accept=".jpg,.png"
                  />
                </Form.Group>
                <div className="d-grid gap-2">
                  <Button
                    type="submit"
                    style={{
                      backgroundColor: "#0D28A6",
                      borderColor: "#0D28A6",
                    }}
                    className="rounded-1"
                  >
                    Register
                  </Button>
                </div>
              </Form>
              <p className="text-center p-3">
                Already have an account? <a href="/login">Sign in here</a>
              </p>
            </div>
          </Container>
        </Col>
        <Col
          md={6}
          style={{ overflow: "hidden", height: "100vh", position: "relative" }}
          className="d-none d-md-block"
        >
          <img
            src="/login-page.png"
            alt="Login Page"
            style={{
              width: "100%",
              height: "100%",
              objectFit: "cover",
              position: "absolute",
              top: 0,
              left: 0,
            }}
          />
        </Col>
      </Row>
    </>
  );
}
