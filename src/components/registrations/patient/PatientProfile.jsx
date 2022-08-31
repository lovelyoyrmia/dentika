import {
  Box,
  Paper,
  Input,
  Button,
  Dialog,
  DialogTitle,
  useMediaQuery,
  DialogContent,
  DialogActions,
  CircularProgress,
} from "@mui/material";
import { useTheme } from "@mui/material/styles";
import {
  ref,
  uploadBytesResumable,
  getDownloadURL,
  deleteObject,
} from "firebase/storage";
import React from "react";
import { useState } from "react";
import { useEffect } from "react";
import { ROLE } from "../../../constant/role";
import { patientAxios, setAuthToken } from "../../../services/axios";
import { useAuth } from "../../../services/FirebaseAuthContext";
import { handleAccessToken } from "../../../utils/utils";
import Logo from "../../../images/logo.jpg";
import { storage } from "../../../config/firebase-config";
import { GridPatient } from "./GridPatient";
import { useNavigate, Outlet } from "react-router";
import { ToastContainer, toast } from "react-toastify";
import { ROUTES } from "../../../constant/routes";

export default function PatientProfile() {
  const theme = useTheme();
  const fullScreen = useMediaQuery(theme.breakpoints.down("md"));

  const { currentUser } = useAuth();
  const [open, setOpen] = useState(false);
  const [loading, setLoading] = useState(false);
  const [url, setUrl] = useState("");
  const [state, setState] = useState({
    currentFile: null,
    previewImage: null,
    progress: null,
  });
  const [patient, setPatient] = useState({});
  const token = handleAccessToken(currentUser);
  const metadata = {
    contentType: "image/*",
  };
  const navigate = useNavigate();

  const selectFile = (event) => {
    setState({
      currentFile: event.target.files[0],
      previewImage: URL.createObjectURL(event.target.files[0]),
    });
    console.log(event.target.files[0]);
  };
  const handleClose = () => {
    setOpen(false);
    setState({
      currentFile: null,
      previewImage: null,
    });
  };
  const uploadFileStorage = () => {
    const storageRef = ref(storage, `images/${state.currentFile.name}`);
    const uploadTask = uploadBytesResumable(
      storageRef,
      state.currentFile,
      metadata
    );
    uploadTask.on(
      "state-changed",
      (snapshot) => {
        const progress =
          (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
        setOpen(false);
        setLoading(true);
        setState({ progress: progress.toFixed(2) });
        switch (snapshot.state) {
          case "paused":
            alert("Upload is paused");
            break;
          case "running":
            console.log("Upload is running");
            console.log(progress.toFixed(2));
            break;
          default:
            break;
        }
      },
      (error) => {
        switch (error.code) {
          case "storage/unauthorized":
            alert("You don't have permission");
            break;
          case "storage/canceled":
            alert("You canceled the upload");
            break;
          case "storage/unknown":
            alert("No such storage");
            break;
          default:
            break;
        }
      },
      () => {
        getDownloadURL(uploadTask.snapshot.ref).then((url) => {
          setUrl(url);
          const data = {
            email: currentUser.email,
            role: {
              PATIENT: ROLE.patient,
            },
            image_url: url,
          };
          patientAxios.put("/updateData/" + currentUser.uid, data);
        });
        setLoading(false);
      }
    );
  };
  const deleteFile = () => {
    const storageRef = ref(storage, url || patient.image_url);
    setLoading(true);
    const data = {
      email: currentUser.email,
      role: {
        PATIENT: ROLE.patient,
      },
      image_url: "",
    };
    patientAxios
      .put("/updateData/" + currentUser.uid, data)
      .then((res) => {
        if (res.status === 200) {
          deleteObject(storageRef);
          setUrl("");
          setPatient({ ...patient, image_url: "" });
          toast.success("Delete Successfully", {
            autoClose: 3000,
            position: "top-center",
            pauseOnHover: false,
          });
          setLoading(false);
        }
      })
      .catch((error) => {
        alert(error.response.data.message);
      });
  };

  useEffect(() => {
    const req = {
      role: {
        PATIENT: ROLE.patient,
      },
      email: currentUser.email,
    };
    setAuthToken(patientAxios, token);
    setLoading(true);
    patientAxios
      .post("/getData/" + currentUser.uid, req)
      .then((res) => {
        const dataPatient = res.data["data"];
        if (res.status === 200) {
          setPatient((user) => ({ ...user, ...dataPatient }));
          setLoading(false);
          localStorage.setItem("Patient", JSON.stringify(dataPatient));
        }
      })
      .catch((error) => {
        alert(error.message);
      });
  }, [currentUser.email, currentUser.uid, token]);
  return (
    <Box sx={{ width: "100%", height: "100%" }}>
      {patient && !loading && (
        <GridPatient
          url={url}
          patient={patient}
          setOpen={setOpen}
          disabled={url || patient.image_url ? false : true}
          deleteButton={deleteFile}
          editButton={() => {
            navigate(ROUTES.EDIT_PROFILE);
          }}
        />
      )}
      <Dialog
        open={loading}
        sx={{
          "& .MuiPaper-root": {
            backgroundColor: "transparent",
            boxShadow: "none",
            overflow: "hidden",
          },
        }}
      >
        <CircularProgress />
        {state.progress && <div>{state.progress} %</div>}
      </Dialog>
      <Dialog
        open={open}
        onClose={handleClose}
        fullScreen={fullScreen}
        maxWidth="lg"
      >
        <DialogTitle sx={{ textAlign: "center" }}>Upload Image</DialogTitle>
        <DialogContent>
          <Box sx={{ display: "flex" }}>
            <Paper
              elevation={4}
              sx={{
                height: 250,
                width: 250,
                backgroundImage:
                  state.previewImage == null
                    ? `url(${Logo})`
                    : `url(${state.previewImage})`,
                backgroundPosition: "center",
                backgroundRepeat: "no-repeat",
                backgroundSize: "contain",
                mr: 3,
              }}
            />
            <div
              style={{
                height: 250,
                display: "flex",
                alignItems: "center",
              }}
            >
              <label htmlFor="btn-upload">
                <Input
                  id="btn-upload"
                  name="btn-upload"
                  type="file"
                  accept="image"
                  style={{ display: "none" }}
                  onChange={selectFile}
                />
                <Box
                  component="span"
                  sx={{
                    cursor: "pointer",
                    mr: 2,
                    border: 1,
                    p: 1,
                    borderRadius: 2,
                  }}
                >
                  Choose Image
                </Box>
              </label>
              {state.currentFile ? state.currentFile.name : null}
            </div>
          </Box>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>Cancel</Button>
          <Button
            disabled={state.currentFile ? false : true}
            onClick={uploadFileStorage}
          >
            Upload
          </Button>
        </DialogActions>
      </Dialog>
      <ToastContainer />
      <Outlet />
    </Box>
  );
}
