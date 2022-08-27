import { Box, Grid, Paper, Button } from "@mui/material";
import Logo from "../../../images/logo.jpg";

export function GridPatient({ url, patient, setOpen, disabled }) {
  return (
    <Box sx={{ backgroundColor: "white", m: 2, p: 2 }}>
      <Grid container spacing={3} columns={{ xs: 2, sm: 4, md: 6 }}>
        <Grid item xs={2} sm={2} md>
          <Grid container flexDirection={"column"}>
            <Grid item>
              <Paper
                elevation={4}
                sx={{
                  height: 255,
                  width: 255,
                  backgroundImage: url ? `url(${url})` : `url(${Logo})`,
                  backgroundPosition: "center",
                  backgroundRepeat: "no-repeat",
                  backgroundSize: "contain",
                  mb: 1,
                }}
              />
              <Button
                onClick={() => {
                  setOpen(true);
                }}
              >
                Edit Image
              </Button>
            </Grid>
            <GridItem label="Name" title={patient.name} />
            <br />
            <GridItem label="Email" title={patient.email} />
            <br />
          </Grid>
        </Grid>
        <Grid item xs={2} sm={2} md>
          <Grid container flexDirection={"column"}>
            <GridItem label="Address" title={patient.address} />
            <br />
            <GridItem label="Province" title={patient.province} />
            <br />
            <GridItem label="City" title={patient.city} />
            <br />
            <GridItem label="Day of Birth" title={patient.birth} />
            <br />
            <GridItem label="Age" title={patient.age} />
          </Grid>
        </Grid>
        <Grid item xs={2} sm={2} md>
          <Grid container flexDirection={"column"}>
            <GridItem label="Blood" title={patient.blood} />
            <br />
            <GridItem label="Gender" title={patient.gender} />
            <br />
            <GridItem label="Height" title={patient.height} />
            <br />
            <GridItem label="Weight" title={patient.weight} />
            <br />
            <GridItem label="Status" title={patient.maritalStatus} />
          </Grid>
        </Grid>
      </Grid>
      <div style={{ textAlign: "center", marginTop: "20px" }}>
        <Button
          variant="contained"
          size="large"
          disabled={disabled}
          sx={{ width: 1 / 3 }}
        >
          Edit Profile
        </Button>
      </div>
    </Box>
  );
}

export function GridItem({ label, title }) {
  return (
    <Grid item>
      <div style={{ padding: "2px 10px" }}>{label}</div>
      <Paper elevation={3} sx={{ p: 1.5 }}>
        {title}
      </Paper>
    </Grid>
  );
}
