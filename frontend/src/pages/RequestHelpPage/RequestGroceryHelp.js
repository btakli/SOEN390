import { React, Fragment } from "react";

import UberEats from "../../media/UberEats.jpg";
import DoorDash from "../../media/DoorDash.jpg";
import LufaFarms from "../../media/LufaFarms.jpg";
import HelloFresh from "../../media/HelloFresh.jpg";

import {
  Button,
  Box,
  Typography,
  Grid,
  Card,
} from "@mui/material";
import SendIcon from "@mui/icons-material/Send";

const tileData = [
  {
    img: UberEats,
    text: '"An easy way to get the food you love. Find what you\'re craving, place your order, and deliver right at your door!"',
    href: "https://www.ubereats.com",
  },
  {
    img: DoorDash,
    text: '"Connecting more businesses to more people. We want to shrink every city by bringing people anything—faster, fresher, and from far away!"',
    href: "https://www.doordash.com/en-CA",
  },
  {
    img: LufaFarms,
    text: '"We deliver directly to our customers thousands of food baskets filled with our rooftop-grown veggies and local partners."',
    href: "https://montreal.lufa.com/en",
  },
  {
    img: HelloFresh,
    text: '"Aims to provide each and every household in its 9 markets with the opportunity to enjoy wholesome home-cooked meals with no hassle!"',
    href: "https://www.hellofresh.ca/meal-kit/canada",
  },
];

function RequestGroceryHelp() {
  return (
    <Fragment>
      <Typography sx={{ m: 2 }} variant="h4">
        Grocery Assistance
      </Typography>
      <Box sx={{ p: 2 }}>
        <Grid container rowSpacing={1} spacing={{ xs: 1, sm: 2, md: 3 }}>
          {tileData.map((tile, i) => (
            <Grid key={"_"+i} item xs={12} sm={12} md={6}>
              <Card key={i} sx={{ p: 2 }}>
                <Box
                  key={i+"0"}
                  component="img"
                  sx={{
                    maxHeight: { xs: 350, md: 250 },
                  }}
                  alt={tile.alt}
                  src={tile.img}

                />
                <Typography
                  key={i+"1"}
                  sx={{ m: 1, py: 3, px: 20 }}
                  color="text.secondary"
                >
                  {tile.text}
                </Typography>

                <Button
                  key={i+"2"}
                  ariant="contained"
                  endIcon={<SendIcon />}
                  color="success"
                  target="_blank"
                  href={tile.href}
                >
                  Go
                </Button>
              </Card>
            </Grid>
          ))}
        </Grid>
      </Box>
    </Fragment>
  );
}
export default RequestGroceryHelp;
