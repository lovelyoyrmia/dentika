import React from "react";
import PatientForm from "./PatientForm";
import { Dialog, DialogContent, DialogTitle, IconButton } from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import { Navigate, useNavigate } from "react-router";
import { ROUTES } from "../../../constant/routes";

export default function EditProfile() {
  const navigate = useNavigate();
  let patient = localStorage.getItem("Patient");
  patient = JSON.parse(patient);

  if (patient) {
    return (
      <Dialog open={true} fullWidth={true} maxWidth="md">
        <DialogTitle>
          <IconButton
            aria-label="close"
            onClick={() => {
              navigate(-1);
              localStorage.removeItem("Patient");
            }}
            sx={{
              position: "absolute",
              right: 8,
              top: 8,
              color: (theme) => theme.palette.grey[500],
            }}
          >
            <CloseIcon />
          </IconButton>
        </DialogTitle>
        <DialogContent>
          <PatientForm patient={patient} />
        </DialogContent>
      </Dialog>
    );
  } else {
    return <Navigate to={ROUTES.PROFILE} />;
  }
}
