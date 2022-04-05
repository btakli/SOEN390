import { React } from 'react';
import Button from '@mui/material/Button';
import Box from '@mui/material/Box';
import Image from "../../media/UberEats.jpg"; 
import Image2 from "../../media/DoorDash.jpg"; 
import Image3 from "../../media/LufaFarms.jpg"; 
import Image4 from "../../media/HelloFresh.jpg"; 
import { styled } from '@mui/material/styles';
import Grid from '@mui/material/Grid';
import Paper from '@mui/material/Paper';
import SendIcon from '@mui/icons-material/Send';
import Typography from '@mui/material/Typography';

const GroceryItem = styled(Paper)(({ theme }) => ({
    backgroundColor: theme.palette.mode === 'dark' ? '#1A2027' : '#fff',
    ...theme.typography.body2,
    padding: theme.spacing(1),
    textAlign: 'center',
    color: theme.palette.text.secondary,
  }));

function RequestGroceryHelp () {

    return (
        <Grid 
            container 
            rowSpacing={1} 
            columnSpacing={{ xs: 1, sm: 2, md: 3 }} 
            justifyContent="center"
            alignItems="center"
            columns={12}
            sx={{ marginBottom: 3,}}
        >
        <Grid item xs={5}>
          <GroceryItem>
            <Box
                    sx={{
                    marginLeft: 17,
                    width: 280,
                    height: 250,
                    backgroundColor: 'primary.dark',
                    backgroundImage: `url(${Image})`,
                    backgroundSize: "cover",
                    backgroundPosition: "center",
                    }}
                />
            <Typography variant="body2" color="text.secondary" position="right">
              "An easy way to get the food you love. Find what you're craving, 
              place your order, and deliver right at your door!"
            </Typography>

            <Button 
                ariant="contained" 
                endIcon={<SendIcon />} 
                position= "left" 
                color="success"
                a href="https://www.ubereats.com">
                Go
            </Button> 
          </GroceryItem>
        </Grid>

        <Grid item xs={5}>
          <GroceryItem>
          <Box
                    sx={{
                    marginLeft: 17,
                    width: 280,
                    height: 250,
                    backgroundColor: 'primary.dark',
                    backgroundImage: `url(${Image2})`,
                    backgroundSize: "cover",
                    backgroundPosition: "center",
                    }}
                />

            <Typography variant="body2" color="text.secondary" position="right">
              "Connecting more businesses to more people. We want to shrink every 
              city by bringing people anything—faster, fresher, and from far away!"
            </Typography>

            <Button 
                ariant="contained" 
                endIcon={<SendIcon />} 
                position= "left" 
                color="success"
                a href="https://www.doordash.com/en-CA">
                Go
            </Button> 
          </GroceryItem>
        </Grid>

        <Grid item xs={5}>
          <GroceryItem>
          <Box
                    sx={{
                    marginLeft: 17,  
                    width: 280,
                    height: 250,
                    backgroundColor: 'primary.dark',
                    backgroundImage: `url(${Image3})`,
                    backgroundSize: "cover",
                    backgroundPosition: "center",
                    }}
                />
            
            <Typography variant="body2" color="text.secondary" position="right">
              "We deliver directly to our customers thousands of food baskets 
               filled with our rooftop-grown veggies and local partners."
            </Typography>

            <Button 
                ariant="contained" 
                endIcon={<SendIcon />} 
                position= "left" 
                color="success"
                a href="https://montreal.lufa.com/en">
                Go
            </Button>
          </GroceryItem>
        </Grid>
        <Grid item xs={5}>
          <GroceryItem>
          <Box
                    sx={{
                    marginLeft: 17,
                    width: 280,
                    height: 250,
                    backgroundColor: 'primary.dark',
                    backgroundImage: `url(${Image4})`,
                    backgroundSize: "cover",
                    backgroundPosition: "center",
                    }}
                />

          <Typography variant="body2" color="text.secondary" position="right">
            "Aims to provide each and every household in its 9 markets with the 
            opportunity to enjoy wholesome home-cooked meals with no hassle!"
          </Typography>

            <Button 
                ariant="contained" 
                endIcon={<SendIcon />} 
                position= "left" 
                color="success"
                a href ="https://www.hellofresh.ca/meal-kit/canada">
                Go
            </Button>
          </GroceryItem>
        </Grid>
      </Grid>
        
    );

}
export default RequestGroceryHelp; 