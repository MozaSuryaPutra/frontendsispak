import { createLazyFileRoute, useNavigate } from "@tanstack/react-router";
import React from "react";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Button from "react-bootstrap/Button";
import { getPenyakit } from "../../../service/penyakit";
import { useQuery } from "@tanstack/react-query";
import PenyakitTable from "../../../components/PenyakitTable";
import Protected from "../../../components/Auth/Protected";
export const Route = createLazyFileRoute("/admin/penyakit/")({
  component: () => (
    <Protected roles={[1]}>
      <Penyakit />
    </Protected>
  ),
});

function Penyakit() {
  const navigate = useNavigate();
  const { token } = useSelector((state) => state.auth);
  const { user } = useSelector((state) => state.auth);

  const [penyakit, setPenyakit] = useState([]);
  const { data, isSuccess, isPending } = useQuery({
    queryKey: ["penyakit"],
    queryFn: () => getPenyakit(),
    enabled: !!token,
  });

  useEffect(() => {
    if (isSuccess) {
      setPenyakit(data || []);
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
        <h1>List Penyakit :</h1>
        {user?.role_id === 1 && (
          <Button
            className="me-2"
            style={{ width: "150px", marginLeft: "auto" }}
            onClick={() => {
              navigate({ to: "/admin/Penyakit/create" });
            }}
          >
            Buat Penyakit Baru
          </Button>
        )}
      </Row>

      <Row className="mt-4">
        {penyakit.length === 0 ? (
          <h1>Penyaktit Tidak Ditemukan!</h1>
        ) : (
          <PenyakitTable setPenyakit={setPenyakit} penyakit={penyakit} />
        )}
      </Row>
    </div>
  );
}
