import { React, Fragment } from "react";

import CanadaGov from "../../media/CanadaGov.jpg";
import WHO from "../../media/WHO.jpg";
import CDC from "../../media/CDC.jpg";

import { Box, Typography, ImageList, ImageListItem, Grid } from "@mui/material";

const tileData = [
  {
    img: CanadaGov,
    href: "https://www.canada.ca/en/public-health/services/diseases/coronavirus-disease-covid-19.html",
    body1: "Government of Canada Health Response",
    body2: "Canada's guide and information on the Covid19 pandemic",
  },
  {
    img: WHO,
    href: "https://www.doordash.com/en-CA",
    body1: "World Health Organization",
    body2: "Global response to Covid19 health crisis",
  },
  {
    img: CDC,
    href: "https://montreal.lufa.com/en",
    body1: "Center for Diseases Control",
    body2: "Reliable information from medical experts",
  },
];

function RequestInformation() {
  return (
    <Fragment>
      <Typography sx={{ m: 2 }} variant="h4">
        Additional Information
      </Typography>
      <ImageList cellHeight={160} cols={3}>
        {tileData.map((tile) => (
          <ImageListItem>
            <Box
              component="img"
              sx={{
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                width: 350,
                maxWidth: { xs: 350, md: 250 },
                backgroundSize: "contain",
                backgroundRepeat: "no-repeat",
              }}
              alt={tile.alt}
              src={tile.img}
              href={tile.href}
            />
            <Typography gutterBottom variant="h5" component="div">
              {tile.body1}
            </Typography>
            <Typography variant="body2" color="text.secondary">
              {tile.body2}
            </Typography>
          </ImageListItem>
        ))}
      </ImageList>
    </Fragment>
  );
}
export default RequestInformation;
