import { React } from "react";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import QRCode from 'react-qr-code';

import {
    Typography,
    Card,
    CardContent,
    Divider,
    Button,
  } from "@mui/material";


function QRCodeDisplay(props){

  const onImageCownload = () => {
    const svg = document.getElementById("QRCode");
    const svgData = new XMLSerializer().serializeToString(svg);
    const canvas = document.createElement("canvas");
    const ctx = canvas.getContext("2d");
    const img = new Image();
    img.onload = () => {
      canvas.width = img.width;
      canvas.height = img.height;
      ctx.drawImage(img, 0, 0);
      const pngFile = canvas.toDataURL("image/png");
      const downloadLink = document.createElement("a");
      downloadLink.download = "QRCode";
      downloadLink.href = `${pngFile}`;
      downloadLink.click();
    };
    img.src = `data:image/svg+xml;base64,${btoa(svgData)}`;
  };

  return (    
    <Card>
      <CardContent>
        <Typography
          variant="h5"
          align="left"
          gutterBottom
          component="div"   

        >
          {props.auth.userData.first_name}'s QR Code
        </Typography>

        <Divider/>

        <QRCode id="QRCode" value="need to import value of html" />
        <Divider/>
        <Button color="primary" variant="contained" onClick={onImageCownload} >
          Download QR
        </Button>

      </CardContent>
    </Card>
  );
}

QRCodeDisplay.propTypes = {
    auth: PropTypes.object.isRequired,
};

const mapStateToProps = (state) => ({
    auth: state.authReducer,
}); 

export default connect(mapStateToProps)(QRCodeDisplay);
