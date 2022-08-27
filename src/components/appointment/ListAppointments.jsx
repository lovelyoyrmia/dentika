import React, { useCallback } from "react";
import {
  Box,
  List,
  ListItem,
  CircularProgress,
  Typography,
  Button,
  Dialog,
  DialogTitle,
  DialogContent,
  IconButton,
  Alert,
} from "@mui/material";
import {
  CDropdown,
  CDropdownItem,
  CDropdownMenu,
  CDropdownToggle,
} from "@coreui/react";
import { useEffect, useState } from "react";
import { bookingAxios, setAuthToken } from "../../services/axios";
import { handleAccessToken } from "../../utils/utils";
import { useAuth } from "../../services/FirebaseAuthContext";
import { ROLE } from "../../constant/role";
import SortIcon from "@mui/icons-material/Sort";
import AddIcon from "@mui/icons-material/Add";
import CloseIcon from "@mui/icons-material/Close";
import ReplayIcon from "@mui/icons-material/Replay";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import moment from "moment";
import AppointmentUser from "./AppointmentUser";

export default function ListAppointments() {
  const { currentUser } = useAuth();
  const [listAppointments, setListAppointments] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);
  const [open, setOpen] = useState(false);
  const [edit, setEdit] = useState(false);
  const token = handleAccessToken(currentUser);

  const handleSortByAppointment = () => {
    setLoading(true);
    setTimeout(() => {
      setListAppointments(
        [...listAppointments].sort((a, b) => {
          const date1 = new Date(a.appointmentDate);
          const date2 = new Date(b.appointmentDate);
          return date2 - date1;
        })
      );
      setLoading(false);
    }, 1000);
  };
  const handleSortByCreated = () => {
    setLoading(true);
    setTimeout(() => {
      setListAppointments(
        [...listAppointments].sort((a, b) => {
          const date1 = new Date(a.createdAt);
          const date2 = new Date(b.createdAt);
          return date2 - date1;
        })
      );
      setLoading(false);
    }, 1000);
  };

  const handleDeleteId = (id) => {
    const req = {
      role: {
        PATIENT: ROLE.patient,
      },
      email: currentUser.email,
      uid: currentUser.uid,
    };
    setLoading(true);
    setAuthToken(bookingAxios, token);
    bookingAxios.post("/deleteId/" + id, req).then((res) => {
      if (res.status === 200) {
        setLoading(false);
        getAppointments();
      }
    });
  };

  const getAppointments = useCallback(() => {
    const req = {
      role: {
        PATIENT: ROLE.patient,
      },
      email: currentUser.email,
      uid: currentUser.uid,
    };
    setLoading(true);
    setAuthToken(bookingAxios, token);
    bookingAxios
      .post("/getDataByEmail", req)
      .then((res) => {
        if (res.status === 200) {
          const response = res.data["data"];
          response.sort((a, b) => {
            const date1 = new Date(a.createdAt);
            const date2 = new Date(b.createdAt);
            return date2 - date1;
          });
          setListAppointments(response);
          setLoading(false);
          console.log(response);
        }
      })
      .catch((error) => {
        setError(true);
        setLoading(false);
      });
  }, [currentUser.email, currentUser.uid, token]);

  useEffect(() => {
    let interval = setTimeout(getAppointments(), 1000);
    return () => {
      clearTimeout(interval);
    };
  }, [getAppointments]);

  return (
    <Box sx={{ width: "100%", height: "100%" }}>
      <Box sx={{ m: 4, p: 2 }}>
        <Box
          sx={{
            mx: 2,
            mb: 1,
            display: "flex",
            justifyContent: "space-between",
          }}
        >
          <div>
            <CDropdown>
              <CDropdownToggle color="secondary">
                <SortIcon sx={{ mr: 1 }} />
                <span>Sort by</span>
              </CDropdownToggle>
              <CDropdownMenu>
                <CDropdownItem
                  onClick={handleSortByAppointment}
                  style={{ cursor: "pointer" }}
                >
                  Appointment date
                </CDropdownItem>
                <CDropdownItem
                  onClick={handleSortByCreated}
                  style={{ cursor: "pointer" }}
                >
                  Last Created
                </CDropdownItem>
              </CDropdownMenu>
            </CDropdown>
            <IconButton
              sx={{ ml: 1 }}
              onClick={() => {
                getAppointments();
              }}
            >
              <ReplayIcon />
            </IconButton>
          </div>
          <Button
            variant="contained"
            endIcon={<AddIcon />}
            //   size="large"
            onClick={() => {
              setOpen(true);
            }}
          >
            Book Appointment
          </Button>
        </Box>
        <DialogAppointment open={open} setOpen={setOpen} title="BOOK" />
        {loading ? (
          <Box
            sx={{
              height: "20vh",
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            <CircularProgress />
          </Box>
        ) : !error && listAppointments.length !== 0 ? (
          <List>
            {listAppointments.map((appoint) => {
              const appointmentDate = moment(appoint.appointmentDate).format(
                "MMMM D, YYYY hh:mm A"
              );
              const createdAt = moment(appoint.createdAt).format(
                "MMMM D, YYYY hh:mm A"
              );

              return (
                <ListItem
                  key={appoint.docId}
                  sx={{
                    mb: 2,
                    px: 5,
                    py: 1.5,
                    border: 0.5,
                    borderRadius: 5,
                    display: "flex",
                    justifyContent: "space-between",
                  }}
                >
                  <Box sx={{ alignItems: "start", flexDirection: "column" }}>
                    <Typography sx={{ fontWeight: "500", fontSize: "20px" }}>
                      {appoint.option}
                    </Typography>
                    <Typography sx={{ fontSize: "18px" }}>
                      <span>Created At : </span>
                      <span>{createdAt}</span>
                    </Typography>
                    <Typography sx={{ fontSize: "18px" }}>
                      <span>Appointment Date : </span>
                      <span>{appointmentDate}</span>
                    </Typography>
                    <Typography sx={{ fontSize: "18px" }}>
                      <span>Symptoms : </span>
                      <span>{appoint.symptoms}</span>
                    </Typography>
                  </Box>
                  <Box
                    sx={{
                      width: "6vw",
                      display: "flex",
                      justifyContent: "space-between",
                    }}
                  >
                    <IconButton
                      onClick={() => {
                        setEdit(true);
                      }}
                    >
                      <EditIcon />
                    </IconButton>
                    <IconButton
                      onClick={() => {
                        handleDeleteId(appoint.docId);
                      }}
                    >
                      <DeleteIcon />
                    </IconButton>
                  </Box>
                  <DialogAppointment
                    appoint={appoint}
                    open={edit}
                    setOpen={setEdit}
                    title="EDIT"
                  />
                </ListItem>
              );
            })}
          </List>
        ) : (
          <Box
            sx={{
              height: "20vh",
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            <Alert severity="info">You don't have any appoinments</Alert>
          </Box>
        )}
      </Box>
    </Box>
  );
}

export function DialogAppointment({ open, setOpen, appoint, title }) {
  return (
    <Dialog open={open} fullWidth={true} maxWidth="md">
      <DialogTitle>
        {title} APPOINTMENT
        <IconButton
          aria-label="close"
          onClick={() => {
            setOpen(false);
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
        <AppointmentUser patient={appoint} />
      </DialogContent>
    </Dialog>
  );
}
