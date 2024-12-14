import { createLazyFileRoute, useNavigate } from "@tanstack/react-router";
import { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import Row from "react-bootstrap/Row";
import Protected from "../../components/Auth/Protected";
export const Route = createLazyFileRoute("/admin/")({
  component: () => (
    <Protected roles={[1]}>
      <Index />
    </Protected>
  ),
});

function Index() {
  const { token } = useSelector((state) => state.auth);
  const navigate = useNavigate();
  const [isCheckingAuth, setIsCheckingAuth] = useState(true);
  const [isLoading, setIsLoading] = useState(false);

  return (
    <Row className="mt-4">
      <h1>
        Selamat Datang Di Website Sistem Pakar Moza, Devrina, Ghozali, Sheila
        Kami dari Kelas B.
      </h1>
    </Row>
  );
}
