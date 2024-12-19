import { createLazyFileRoute, useNavigate } from "@tanstack/react-router";
import React from "react";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Button from "react-bootstrap/Button";
import { getGejala } from "../../../service/gejala";
import ModelsTable from "../../../components/ModelsTable";
import { useQuery } from "@tanstack/react-query";
import Protected from "../../../components/Auth/Protected";
export const Route = createLazyFileRoute("/admin/gejala/")({
  component: () => (
    <Protected roles={[1]}>
      <Gejala />
    </Protected>
  ),
});

function Gejala() {
  const { token } = useSelector((state) => state.auth);
  const { user } = useSelector((state) => state.auth);

  const [gejala, setgejala] = useState([]);

  const navigate = useNavigate();

  const { data, isSuccess, isPending } = useQuery({
    queryKey: ["gejala"],
    queryFn: () => getGejala(),
    enabled: !!token,
  });

  useEffect(() => {
    if (isSuccess) {
      setgejala(data || []);
    }
  }, [data, isSuccess]);

  if (!token) {
    navigate({ to: "/login" });
    return;
  }

  if (isPending) {
    return (
      <Row className="mt-4">
        <h1>Loading...</h1>
      </Row>
    );
  }

  return (
    <div>
      <Row className="mt-4 align-items-center">
        <h1>List Gejala:</h1>
        {user?.role_id === 1 && (
          <Button
            className="me-2"
            style={{ width: "160px", marginLeft: "auto" }}
            onClick={() => {
              navigate({ to: "/admin/gejala/create" });
            }}
          >
            Buat Model Baru
          </Button>
        )}
      </Row>

      <Row className="mt-4">
        {gejala.length === 0 ? (
          <h1>Gejala Tidak Ditemukan!</h1>
        ) : (
          <ModelsTable setgejala={setgejala} gejala={gejala} />
        )}
      </Row>
    </div>
  );
}
