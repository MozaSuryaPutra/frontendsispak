import React from "react";
import styled from "styled-components";
import { FaTrashAlt, FaEdit } from "react-icons/fa";
import { useNavigate } from "@tanstack/react-router";
import { toast } from "react-toastify";
import { confirmAlert } from "react-confirm-alert";
import "react-confirm-alert/src/react-confirm-alert.css";
import {
  deletePenyakitGejala,
  getPenyakitGejala,
} from "../../service/penyakitgejala";
import { useSelector } from "react-redux";
import { useMutation } from "@tanstack/react-query";
import { useQuery } from "@tanstack/react-query";

const TableContainer = styled.div`
  max-width: 100%;
  margin: 20px auto;
  border-radius: 8px;
  overflow: hidden;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
  padding: 0;
  overflow-x: auto;

   @media (max-width: 768px) {
    border-radius: 0px;
`;

const StyledTable = styled.table`
  width: 100%;
  border-collapse: collapse;
  background-color: #fff;

  @media (max-width: 768px) {
    font-size: 12px; /* Smaller font size on mobile */
    padding: 8px;
  }
`;

const TableHead = styled.thead`
  background-color: #007bff;
  color: #fff;
  width: 100%;

  @media (max-width: 768px) {
    font-size: 14px; /* Adjust header font size for mobile */
  }
`;

const TableRow = styled.tr`
  &:nth-child(even) {
    background-color: #f8f9fa;
  }
`;

const TableCell = styled.td`
  padding: 12px 15px;
  border-bottom: 1px solid #dee2e6;
  font-size: 14px;
  color: #495057;
  text-align: center;

  @media (max-width: 768px) {
    padding: 8px 10px; /* Less padding on mobile */
    font-size: 12px; /* Smaller text on mobile */
  }
`;

const TableHeaderCell = styled.th`
  padding: 12px 15px;
  font-weight: bold;
  font-size: 16px;
  color: #fff;
  text-align: center;

  @media (max-width: 768px) {
    font-size: 14px; /* Smaller header font on mobile */
  }
`;

const ButtonContainer = styled.div`
  display: flex;
  justify-content: center;
  gap: 10px;
  flex-direction: row;

  @media (max-width: 768px) {
    flex-direction: column; /* Stack buttons vertically on small screens */
    align-items: center;
  }
`;

const DeleteButton = styled.button`
  display: flex;
  align-items: center;
  justify-content: center;
  border: 1px solid #dc3545;
  background-color: #fff;
  color: #dc3545;
  border-radius: 4px;
  padding: 6px 12px;
  cursor: pointer;
  font-size: 14px;

  @media (max-width: 768px) {
    font-size: 12px; /* Smaller button font */
    padding: 5px 10px; /* Reduced padding */
  }
`;

const EditButton = styled.button`
  display: flex;
  align-items: center;
  justify-content: center;
  background-color: #28a745;
  color: #fff;
  border: none;
  border-radius: 4px;
  padding: 6px 12px;
  cursor: pointer;
  font-size: 14px;

  @media (max-width: 768px) {
    font-size: 12px; /* Smaller button font */
    padding: 5px 10px; /* Reduced padding */
  }
`;

const gejalaPenyakitPenyakitTable = ({ gejalaPenyakit, setGejalaPenyakit }) => {
  const navigate = useNavigate();
  const { user } = useSelector((state) => state.auth);

  const { mutate: deleting, isPending: isDeleteProcessing } = useMutation({
    mutationFn: deletePenyakitGejala,
    onSuccess: async () => {
      toast.success("Penyakit Gejala deleted successfully!");

      // Refresh data after deletion
      const refreshedTypes = await getPenyakitGejala();
      setGejalaPenyakit(refreshedTypes);
    },
    onError: (error) => {
      toast.error(error?.message || "Error deleting Penyakit Gejala");
    },
  });

  const onDelete = (id) => {
    confirmAlert({
      title: "Confirm to delete",
      message: "Are you sure to delete this data?",
      buttons: [
        {
          label: "Yes",
          onClick: () => deleting(id),
        },
        {
          label: "No",
          onClick: () => {},
        },
      ],
    });
  };

  return (
    <TableContainer>
      <StyledTable>
        <TableHead>
          <TableRow>
            <TableHeaderCell>Nama Penyakit</TableHeaderCell>
            <TableHeaderCell>Gejala</TableHeaderCell>
            <TableHeaderCell>Cf Gejala</TableHeaderCell>
            {user?.role_id === 1 && <TableHeaderCell>Actions</TableHeaderCell>}
          </TableRow>
        </TableHead>
        <tbody>
          {gejalaPenyakit
            .sort((a, b) => a.penyakit.nama.localeCompare(b.penyakit.nama)) // Mengurutkan berdasarkan nama penyakit
            .map((gejalaPenyakitPenyakit) => (
              <TableRow key={gejalaPenyakitPenyakit.id}>
                <TableCell>{gejalaPenyakitPenyakit.penyakit.nama}</TableCell>
                <TableCell>{gejalaPenyakitPenyakit.gejala.nama}</TableCell>
                <TableCell>{gejalaPenyakitPenyakit.cf}</TableCell>

                {user?.role_id === 1 && (
                  <TableCell>
                    <ButtonContainer>
                      <DeleteButton
                        onClick={() => onDelete(gejalaPenyakitPenyakit.id)}
                      >
                        <FaTrashAlt style={{ marginRight: "4px" }} />
                        Delete
                      </DeleteButton>
                    </ButtonContainer>
                  </TableCell>
                )}
              </TableRow>
            ))}
        </tbody>
      </StyledTable>
    </TableContainer>
  );
};

export default gejalaPenyakitPenyakitTable;
