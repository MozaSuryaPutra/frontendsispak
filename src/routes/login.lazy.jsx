import { createLazyFileRoute, useNavigate } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import Button from "react-bootstrap/Button";
import Container from "react-bootstrap/Container";
import Col from "react-bootstrap/Col";
import Form from "react-bootstrap/Form";
import Row from "react-bootstrap/Row";
import { useDispatch } from "react-redux";
import { setToken } from "../redux/slices/auth";
import { login } from "../service/auth";
import { useSelector } from "react-redux";
import { toast } from "react-toastify";
import { useMutation } from "@tanstack/react-query";
export const Route = createLazyFileRoute("/login")({
  component: Login,
});

function Login() {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { token } = useSelector((state) => state.auth);

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  if (token) {
    navigate({ to: "/" });
  }

  // Mutation is used for POST, PUT, PATCH and DELETE
  const { mutate: loginUser } = useMutation({
    mutationFn: (body) => {
      return login(body);
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

    /* hit the login API */
    // define the request body
    const body = {
      email,
      password,
    };

    // hit the login API with the data
    loginUser(body);
  };

  return (
    <>
      <Row style={{ overflow: "hidden", height: "100vh", width: "100vw" }}>
        <Col md={6}>
          <Container
            className="p-5 d-flex justify-content-center align-items-center"
            style={{ minHeight: "100vh" }}
          >
            <div className="w-100 m-lg-5 m-0">
              <h2 className="mb-4">Welcome Back!</h2>
              <Form onSubmit={onSubmit}>
                <Form.Group as={Col} className="mb-4" controlId="email">
                  <Form.Label className="mb-3">Email</Form.Label>
                  <Form.Control
                    type="email"
                    placeholder="Email"
                    required
                    value={email}
                    onChange={(event) => setEmail(event.target.value)}
                  />
                </Form.Group>
                <Form.Group as={Col} className="mb-5" controlId="password">
                  <Form.Label className="mb-3">Password</Form.Label>
                  <Form.Control
                    type="password"
                    placeholder="Password"
                    required
                    value={password}
                    onChange={(event) => setPassword(event.target.value)}
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
                    Login
                  </Button>
                </div>
              </Form>
              <p className="text-center p-4">
                Don't have an account yet? <a href="/register">Sign up here</a>
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
