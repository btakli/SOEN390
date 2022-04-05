import React from 'react';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Typography from '@mui/material/Typography';
import { CardActionArea } from '@mui/material';
import { Container } from '@mui/material';



function RequestInformation () {
    return (
    <Container 
        sx={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            marginBottom: 3,
        }}  
    > 
        <Card sx={{ maxWidth: 345, px: 3, py: 3,}} >
            <CardActionArea a href = 'https://www.canada.ca/en/public-health/services/diseases/coronavirus-disease-covid-19.html'>
                <CardMedia
                    component="img"
                    height="120"
                    image={require("../../media/CanadaGov.jpg")}
                    alt="canadagov"
                    
                />
                <CardContent>
                    <Typography gutterBottom variant="h5" component="div">
                    Government of Canada
                    </Typography>

                    <Typography variant="body2" color="text.secondary">
                    Canada's guide to Covid-19 pandemic
                    </Typography>
                </CardContent>
            </CardActionArea>
        </Card>

        <Card  sx={{ maxWidth: 345, px: 3, py: 3,}}>
            <CardActionArea a href ='https://www.who.int/emergencies/diseases/novel-coronavirus-2019/technical-guidance'>
                <CardMedia
                    component="img"
                    height="120"
                    image={require("../../media/WHO.jpg")}
                    alt="canadagov"
                />
                <CardContent>
                    <Typography gutterBottom variant="h5" component="div">
                    World Health Organization
                    </Typography>

                    <Typography variant="body2" color="text.secondary">
                    Global response to Covid19 health crisis
                    </Typography>
                </CardContent>
            </CardActionArea>
        </Card>

        <Card  sx={{ maxWidth: 345, px: 3, py: 3,}}>
            <CardActionArea a href = 'https://www.cdc.gov/coronavirus/2019-ncov/if-you-are-sick/steps-when-sick.html'>
                <CardMedia
                    component="img"
                    height="120"
                    image={require("../../media/CDC.jpg")}
                    alt="canadagov"
                />
                <CardContent>
                    <Typography gutterBottom variant="h5" component="div">
                    Centers for Diseases Control
                    </Typography>

                    <Typography variant="body2" color="text.secondary">
                    Reliable information from medical experts
                    </Typography>
                </CardContent>
            </CardActionArea>
        </Card>
      </Container>
    );
}
export default RequestInformation; 