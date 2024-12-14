import { createLazyFileRoute, Link, useNavigate } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Card from "react-bootstrap/Card";
import Button from "react-bootstrap/Button";
import { getCarsById, deleteCars } from "../../../service/cars";
import { toast } from "react-toastify";
import { confirmAlert } from "react-confirm-alert";
import { useSelector } from "react-redux";
import { useQuery, useMutation } from "@tanstack/react-query";
import Protected from "../../../components/Auth/Protected";
export const Route = createLazyFileRoute("/admin/cars/$id")({
  component: () => (
    <Protected roles={[1]}>
      <CarDetail />
    </Protected>
  ),
});

function CarDetail() {
  const { id } = Route.useParams();
  const navigate = useNavigate();
  const { user } = useSelector((state) => state.auth);

  // Query to fetch car data
  const {
    data: car,
    isLoading,
    isError,
    isSuccess,
  } = useQuery({
    queryKey: ["car", id], // Updated queryKey
    queryFn: () => getCarsById(id), // Updated queryFn
    enabled: !!id, // only run query if there's an id
  });

  // Mutation to delete the car
  const { mutate: deleteCar, isLoading: isDeleting } = useMutation({
    mutationFn: deleteCars, // Updated mutation function
    onSuccess: () => {
      toast.success("Data deleted successfully!");
      navigate({ to: "/admin/cars" });
    },
    onError: (error) => {
      toast.error(error.message || "Failed to delete the car");
    },
  });

  // Handling if car is not found
  if (isError) {
    return (
      <Row className="mt-5">
        <Col>
          <h1 className="text-center">Car is not found!</h1>
        </Col>
      </Row>
    );
  }

  // Loading state
  if (isLoading) {
    return (
      <Row className="mt-5">
        <Col>
          <h1 className="text-center">Loading...</h1>
        </Col>
      </Row>
    );
  }

  // Handle delete car confirmation
  const onDelete = (event) => {
    event.preventDefault();
    confirmAlert({
      title: "Confirm to delete",
      message: "Are you sure to delete this data?",
      buttons: [
        {
          label: "Yes",
          onClick: () => deleteCar(id),
        },
        {
          label: "No",
          onClick: () => {},
        },
      ],
    });
  };

  return (
    <>
      <Row className="ms-2 mt-4 align-items-center">
        <Button
          variant="outline-primary"
          style={{
            width: "150px",
            marginRight: "auto",
          }}
          onClick={() => {
            navigate({ to: "/admin/cars" });
          }}
        >
          Back
        </Button>
      </Row>

      <Row className="mt-3 mb-3">
        <Col className="offset-md-3">
          <Card>
            <Card.Img variant="top" src={car?.image} />
            <Card.Body>
              <Card.Title>{car?.rentPerDay}</Card.Title>
              <Card.Text>Plate: {car?.plate}</Card.Text>
              <Card.Text>Year: {car?.year}</Card.Text>

              <Card.Text>Available: {car?.available.toString()}</Card.Text>
              <Card.Text>AvailableAt: {car?.availableAt}</Card.Text>
              <Card.Text>ID: {car?.id}</Card.Text>

              <Card.Text>Model Name: {car?.carsModels?.model_name}</Card.Text>
              <Card.Text>
                Manufacturer: {car?.carsModels?.manufacturer}
              </Card.Text>
              <Card.Text>
                Transmission: {car?.carsModels?.transmission}
              </Card.Text>

              <Card.Text>Description: {car?.carsModels?.description}</Card.Text>

              <Card.Text>Specs: {car?.carsModels?.specs?.join(", ")}</Card.Text>
              <Card.Text>
                Options: {car?.carsModels?.options?.join(", ")}
              </Card.Text>
              <Card.Text>
                Body Style: {car?.carsModels?.car_types.body_style}
              </Card.Text>
              <Card.Text>
                Capacity: {car?.carsModels?.car_types.capacity}
              </Card.Text>
              <Card.Text>
                Fuel Type: {car?.carsModels?.car_types.fuel_type}
              </Card.Text>

              {user?.role_id === 1 && (
                <>
                  <Card.Text>
                    <div className="d-grid gap-2">
                      <Button
                        as={Link}
                        to={`/admin/cars/edit/${id}`}
                        variant="primary"
                        size="md"
                      >
                        Edit
                      </Button>
                    </div>
                  </Card.Text>
                  <Card.Text>
                    <div className="d-grid gap-2">
                      <Button
                        onClick={onDelete}
                        variant="danger"
                        size="md"
                        disabled={isDeleting}
                      >
                        {isDeleting ? "Deleting..." : "Delete Car"}
                      </Button>
                    </div>
                  </Card.Text>
                </>
              )}
            </Card.Body>
          </Card>
        </Col>
        <Col md={3}></Col>
      </Row>
    </>
  );
}
