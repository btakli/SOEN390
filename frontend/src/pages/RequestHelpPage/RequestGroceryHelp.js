import { React, Fragment } from "react";

import UberEats from "../../media/UberEats.jpg";
import DoorDash from "../../media/DoorDash.jpg";
import LufaFarms from "../../media/LufaFarms.jpg";
import HelloFresh from "../../media/HelloFresh.jpg";

import {
  Button,
  Box,
  Typography,
  ImageList,
  ImageListItem,
  Grid,
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
      <ImageList cellHeight={160} cols={2}>
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

            />
            <Typography
              sx={{ m: 1 }}
              variant="body2"
              color="text.secondary"
              position="right"
            >
              {tile.text}
            </Typography>

            <Button
              ariant="contained"
              endIcon={<SendIcon />}
              position="left"
              color="success"
              href={tile.href}
            >
              Go
            </Button>
          </ImageListItem>
        ))}
      </ImageList>
    </Fragment>
  );
}
export default RequestGroceryHelp;
