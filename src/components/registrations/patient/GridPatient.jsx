import { Box, Grid, Paper, Button, IconButton } from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";
import Logo from "../../../images/logo.jpg";

export function GridPatient({
  url,
  patient,
  setOpen,
  disabled,
  deleteButton,
  editButton,
}) {
  return (
    <Box sx={{ backgroundColor: "white", m: 2, p: 2 }}>
      <Grid container spacing={3} columns={{ xs: 2, sm: 4, md: 6 }}>
        <Grid item xs={2} sm={2} md>
          <Grid container flexDirection={"column"}>
            <Grid item>
              <Paper
                elevation={4}
                sx={{
                  height: 215,
                  backgroundImage:
                    url || patient.image_url
                      ? `url(${url || patient.image_url})`
                      : `url(${Logo})`,
                  backgroundPosition: "center",
                  backgroundRepeat: "no-repeat",
                  backgroundSize: "contain",
                  mb: 1,
                }}
              />
              <Box
                sx={{
                  display: "flex",
                  width: "100%",
                  justifyContent: "space-between",
                }}
              >
                <Button
                  onClick={() => {
                    setOpen(true);
                  }}
                  disabled={!patient.is_verified}
                >
                  {patient.is_verified ? "Edit Image" : "Wait for verification"}
                </Button>
                <IconButton disabled={disabled} onClick={deleteButton}>
                  <DeleteIcon />
                </IconButton>
              </Box>
            </Grid>
            <GridItem label="Name" title={patient.name} />
            <GridItem label="Email" title={patient.email} />
            <GridItem label="Phone Number" title={patient.phone_number} />
          </Grid>
        </Grid>
        <Grid item xs={2} sm={2} md>
          <Grid container flexDirection={"column"}>
            <GridItem label="Address" title={patient.address} />
            <GridItem label="Province" title={patient.province} />
            <GridItem label="City" title={patient.city} />
            <GridItem label="Day of Birth" title={patient.birth} />
            <GridItem label="Age" title={patient.age} />
            <GridItem label="Blood" title={patient.blood} />
          </Grid>
        </Grid>
        <Grid item xs={2} sm={2} md>
          <Grid container flexDirection={"column"}>
            <GridItem label="Gender" title={patient.gender} />
            <GridItem label="Height" title={patient.height} />
            <GridItem label="Weight" title={patient.weight} />
            <GridItem label="Status" title={patient.marital_status} />
          </Grid>
        </Grid>
      </Grid>
      <div style={{ textAlign: "center", marginTop: 10 }}>
        <Button
          variant="contained"
          size="large"
          disabled={disabled}
          sx={{ width: { md: 1 / 3, sm: 1 / 2 } }}
          onClick={editButton}
        >
          {patient.is_verified ? "Edit Profile" : "Wait for verification"}
        </Button>
      </div>
    </Box>
  );
}

export function GridItem({ label, title }) {
  return (
    <Grid item>
      <div style={{ padding: "2px 10px" }}>{label}</div>
      <Paper elevation={3} sx={{ p: 1.5, mb: 1.5 }}>
        {title}
      </Paper>
    </Grid>
  );
}
