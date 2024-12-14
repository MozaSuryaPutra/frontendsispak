import React from "react";
//import { format } from "date-fns";
import styled from "styled-components";
import Button from "react-bootstrap/Button";
import { useNavigate } from "@tanstack/react-router";
import "react-confirm-alert/src/react-confirm-alert.css";
import { useSelector } from "react-redux";
import { format } from "date-fns";
import { FaClock, FaCog, FaIdCard, FaUserFriends } from "react-icons/fa";

const CardContainer = styled.div`
  max-width: 300px;
  margin: 20px;
  border-radius: 8px;
  overflow: hidden;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
  background-color: #fff;
  display: flex;
  flex-direction: column;
  justify-content: center; /* Center horizontally */
`;

const ImageContainer = styled.div`
  height: 200px;
  overflow: hidden;
  margin-bottom: 15px;
`;

const CarImage = styled.img`
  width: 100%;
  height: 100%;
  object-fit: cover;
`;

const CardBody = styled.div`
  flex: 1;
  display: flex;
  flex-direction: column;
`;

const CardTitle = styled.h3`
  font-size: 14px;
  margin-bottom: 6px;
  color: #333;
`;

const CardText = styled.p`
  font-size: 14px;
  margin: 3px 0;
  color: #555;
`;

const SearchCard = ({ cars, setCars }) => {
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
        <CardTitle>{cars.carsModels.car_types.body_style.charAt(0).toUpperCase() +
      cars.carsModels.car_types.body_style.slice(1)}</CardTitle>

        <CardText><b>Rp. {cars.rentPerDay.toLocaleString("id-ID")}/Hari</b></CardText>
        <CardText className='mb-2'>{cars.carsModels.description}</CardText>
        <CardText><FaClock className="mb-1 me-1"/> {format(new Date(cars.availableAt), "MMMM dd, yyyy 'at' hh:mm a")}</CardText>
        <CardText><FaIdCard className="mb-1 me-1"/> {cars.plate}</CardText>
        <CardText><FaCog className="mb-1 me-1"/> {cars.carsModels.transmission}</CardText>
        <CardText><FaUserFriends className="mb-1 me-1"/> {cars.carsModels.car_types.capacity} Orang</CardText>

        <Button
          onClick={() => {
            navigate({ to: `/cars/${cars.id}` });
          }}
          style={{ backgroundColor: "#5CB85F", border:"#5CB85F" }}
          className="rounded-0 my-3"
        >
          Detail Mobil
        </Button>
      </CardBody>
    </CardContainer>
  );
};

export default SearchCard;
