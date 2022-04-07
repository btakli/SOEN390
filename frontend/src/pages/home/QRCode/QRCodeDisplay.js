import { React } from "react";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import QRCode from "react-qr-code";
import { jsPDF } from "jspdf";

import {
  Typography,
  Card,
  CardContent,
  Divider,
  Button,
  Box,
} from "@mui/material";

function QRCodeDisplay(props) {

  if (!props.auth.user.is_patient) {
    // history.pushState();
    return (
      <Card>
        <CardContent>
          <Typography variant="h5" align="left" gutterBottom component="div">
            You must be logged in as a Patient to have a QR Code
          </Typography>
        </CardContent>
      </Card>
    );
  }

  const base_url = location.protocol + "//" + location.host;

  const onPDFDownload = () => {
    const svg = document.getElementById("QRCode");
    const svgData = new XMLSerializer().serializeToString(svg);
    const canvas = document.createElement("canvas");
    const ctx = canvas.getContext("2d");
    const img = new Image();
    const pdf = new jsPDF("p", "mm", "letter");
    img.onload = () => {
      canvas.width = img.width;
      canvas.height = img.height;
      ctx.drawImage(img, 0, 0);
      const png = canvas.toDataURL("image/png");
      pdf.text("CovidTracker QR Code", 10, 20);
      pdf.text(
        `Patient Name: ${props.auth.userData.first_name} ${props.auth.userData.last_name}`,
        10,
        30
      );
      pdf.addImage(png, "PNG", 44, 70, img.width / 2, img.height / 2);
      pdf.text(
        "Copyright © CovidTracker 2022.",
        pdf.canvas.width / 2,
        pdf.canvas.height - 40
      );
      pdf.save(
        `CovidTracker_${props.auth.userData.first_name}_${props.auth.userData.last_name}_QRCode`
      );
    };
    img.src = `data:image/svg+xml;base64,${btoa(svgData)}`;
  };

  const patient_uri = btoa(btoa(props.auth.userData.user));

  return (
    <Card>
      <CardContent>
        <Typography variant="h5" align="left" gutterBottom component="div">
          {props.auth.userData.first_name} {props.auth.userData.last_name}'s QR Code
        </Typography>
        <Divider />
        <Box m={3} pt={4}>
          <QRCode id="QRCode" value={`${base_url}/qr_code/${patient_uri}`} />
        </Box>
        <Divider />
        <Box m={3} pt={2}>
          <Button color="primary" variant="contained" onClick={onPDFDownload}>
            Download QR
          </Button>
        </Box>
      </CardContent>
    </Card>
  );
}

QRCodeDisplay.propTypes = {
  auth: PropTypes.object.isRequired,
};

const mapStateToProps = (state) => ({ auth: state.authReducer });

export default connect(mapStateToProps)(QRCodeDisplay);
