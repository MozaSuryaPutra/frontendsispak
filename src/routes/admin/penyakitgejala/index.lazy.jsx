import { createLazyFileRoute, useNavigate } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Button from "react-bootstrap/Button";
import { useSelector } from "react-redux";
import { getPenyakitGejala } from "../../../service/penyakitgejala";
import GejalaPenyakitTable from "../../../components/GejalaPenyakitTable/GejalaPenyakitTable";
import { useQuery } from "@tanstack/react-query";
import Protected from "../../../components/Auth/Protected";
export const Route = createLazyFileRoute("/admin/penyakitgejala/")({
  component: () => (
    <Protected roles={[1]}>
      <PenyakitGejalaIndex />
    </Protected>
  ),
});

function PenyakitGejalaIndex() {
  const { token } = useSelector((state) => state.auth);
  const { user } = useSelector((state) => state.auth);
  const [gejalaPenyakit, setGejalaPenyakit] = useState([]); // Initialize as empty array
  const navigate = useNavigate();

  const { data, isSuccess, isPending } = useQuery({
    queryKey: ["penyakitgejala"],
    queryFn: () => getPenyakitGejala(),
    enabled: !!token,
  });

  useEffect(() => {
    if (isSuccess) {
      setGejalaPenyakit(data || []); // Ensure data is an array, default to empty if null
    }
  }, [data, isSuccess]);

  if (!token) {
    navigate({ to: "/login" });
    return null;
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
        <h1>List Gejala Penyakit :</h1>
        {user?.role_id === 1 && (
          <Button
            className="me-2"
            style={{ width: "150px", marginLeft: "auto" }}
            onClick={() => {
              navigate({ to: "/admin/penyakitgejala/create" });
            }}
          >
            Buat Gejala Penyakit Baru
          </Button>
        )}
      </Row>

      <Row className="mt-4">
        {gejalaPenyakit.length === 0 ? (
          <h1>Penyakit Gejala not found!</h1>
        ) : (
          <GejalaPenyakitTable
            setGejalaPenyakit={setGejalaPenyakit}
            gejalaPenyakit={gejalaPenyakit}
          />
        )}
      </Row>
    </div>
  );
}
