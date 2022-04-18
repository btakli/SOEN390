import {
  Box,
  Typography,
  Card,
  CardContent,
  Divider,
  Link,
} from "@mui/material";

function About() {
  return (
    <Card align="center">
      <CardContent>
        <Box sx={{ width: "100%" }} pb={2}>
          <Typography variant="h5" align="left" gutterBottom component="div">
            About CovidTracker
          </Typography>
          <Divider />
        </Box>

        <Typography variant="h6" align="left" gutterBottom component="div">
          CovidTracker is here to provide a meaningful service to Patients,
          Doctors and Immigration Officers!
        </Typography>

        <Typography variant="h6" align="left" gutterBottom component="div">
          Patients can plan appointments, update their health and immigration
          status, be up to date on Covid-19 data and get the help they need.
        </Typography>

        <Typography variant="h6" align="left" gutterBottom component="div">
          Doctors can set availabilities and view their patients' status.
        </Typography>

        <Typography variant="h6" align="left" gutterBottom component="div">
          Immigration Officers can view their immigrants' status.
        </Typography>

        <Typography variant="h4" align="left" gutterBottom component="div">
          ... and much MORE!
        </Typography>

        <Typography variant="body" gutterBottom component="div">
          refer to the{" "}
          <Link href="https://github.com/btakli/SOEN390">
            GitHub Repository
          </Link>{" "}
          for more details
        </Typography>
      </CardContent>
    </Card>
  );
}

export default About;
