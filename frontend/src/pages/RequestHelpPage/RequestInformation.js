import { React, Fragment } from "react";

import CanadaGov from "../../media/CanadaGov.jpg";
import WHO from "../../media/WHO.jpg";
import CDC from "../../media/CDC.jpg";

import { Box, Typography, Grid, Card } from "@mui/material";

const tileData = [
  {
    img: CanadaGov,
    href: "https://www.canada.ca/en/public-health/services/diseases/coronavirus-disease-covid-19.html",
    body1: "Government of Canada Health Response",
    body2: "Canada's guide and information on the Covid19 pandemic",
  },
  {
    img: WHO,
    href: "https://www.who.int/",
    body1: "World Health Organization",
    body2: "Global response to Covid19 health crisis",
  },
  {
    img: CDC,
    href: "https://www.cdc.gov/",
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
      <Box sx={{ p: 2 }}>
        <Grid container rowSpacing={1} columnSpacing={{ xs: 1, sm: 2, md: 3 }}>
          {tileData.map((tile, i) => (
            <Grid key={"_"+i} item xs={12} sm={12} md={4} >
              <Card key={i} sx={{ p: 2 }}>
                <a key={i+"0"} target="_blank" href={tile.href}>
                  <Box
                    key={i+"01"}
                    component="img"
                    sx={{
                      maxHeight: { xs: 50, md: 100 },
                    }}
                    alt={tile.alt}
                    src={tile.img}
                  />
                </a>
                
                <Typography
                  key={i+"1"}
                  sx={{ m: 1, pu: 3 }}
                  variant="h5"
                  color="text.secondary"
                >
                  {tile.body1}
                </Typography>

                <Typography
                  key={i+"2"}
                  sx={{ m: 1, pu: 3 }}
                  color="text.secondary"
                >
                  {tile.body2}
                </Typography>
              </Card>
            </Grid>
          ))}
        </Grid>
      </Box>
    </Fragment>
  );
}
export default RequestInformation;
