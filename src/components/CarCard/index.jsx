import React from "react";
//import { format } from "date-fns";
import styled from "styled-components";
import Button from "react-bootstrap/Button";
import { useNavigate } from "@tanstack/react-router";
import "react-confirm-alert/src/react-confirm-alert.css";
import { useSelector } from "react-redux";

const CardContainer = styled.div`
  max-width: 300px;
  margin: 20px;
  border-radius: 8px;
  overflow: hidden;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
  background-color: #fff;
  display: flex;
  flex-direction: column;
`;

const ImageContainer = styled.div`
  height: 200px;
  overflow: hidden;
`;

const CarImage = styled.img`
  width: 100%;
  height: 100%;
  object-fit: cover;
`;

const CardBody = styled.div`
  padding: 20px;
  flex: 1;
  display: flex;
  flex-direction: column;
`;

const CardTitle = styled.h3`
  font-size: 18px;
  margin-bottom: 10px;
  color: #333;
`;

const CardText = styled.p`
  font-size: 14px;
  margin: 5px 0;
  color: #555;
`;

const CarCard = ({ cars, setCars }) => {
  const navigate = useNavigate();
  const { user } = useSelector((state) => state.auth);

  // // Format tanggal menggunakan date-fns
  // const formattedAvailableAt = cars.availableAt
  //   ? format(new Date(cars.availableAt), "yyyy-MM-dd")
  //   : "Not Available";

  return (
    <CardContainer className="ms-lg-5 ">
      <ImageContainer>
        <CarImage src={cars.image} />
      </ImageContainer>
      <CardBody>
        {/* Gunakan model_name dari models yang dikirim */}
        <CardTitle>{cars.carsModels.model_name}</CardTitle>

        <CardText>RP {cars.rentPerDay}/Hari</CardText>
        <CardText>
          Available At: {cars.availableAt.toString().substring(0, 10)}
        </CardText>
        <CardText>Year: {cars.year}</CardText>
        <CardText>Plate: {cars.plate}</CardText>

        <Button
          onClick={() => {
            navigate({ to: `/admin/cars/${cars.id}` });
          }}
          variant="primary"
        >
          Detail Car
        </Button>
      </CardBody>
    </CardContainer>
  );
};

export default CarCard;
