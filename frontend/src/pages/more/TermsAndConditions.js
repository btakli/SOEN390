import {
  Box,
  Typography,
  Card,
  CardContent,
  Divider,
  List,
  ListItem,
} from "@mui/material";

function TermsAndConditions() {
  return (
    <Card>
      <CardContent>
        <Box sx={{ width: "100%" }} pb={2}>
          <Typography variant="h5" align="left" gutterBottom component="div">
            Terms and Conditions
          </Typography>
          <Divider />
        </Box>
        <Box sx={{ width: "100%" }} pb={2}>
          <Typography align="left" gutterBottom component="div">
            {" "}
            Links to websites not under the control of CovidTracker, including
            those to any CovidTracker social media accounts, are provided solely
            for the convenience of our website visitors. We are not responsible
            for the accuracy, currency or reliability of the content of such
            websites. CovidTracker does not offer any guarantee in that regard
            and is not responsible for the information found through these
            links, and does not endorse the sites and their content. Visitors
            should also be aware that information offered by non-CovidTracker
            sites to which this website links is not subject to the Privacy Act
            or the Official Languages Act and may not be accessible to persons
            with disabilities. The information offered may be available only in
            the language(s) used by the sites in question. With respect to
            privacy, visitors should research the privacy policies of these
            non-government websites before providing personal information.
            Ownership and usage of content provided on this site Materials on
            this website were produced and/or compiled for the purpose of
            providing CovidTracker customers with access to information about
            the programs and services offered by CovidTracker.
          </Typography>
          <Typography variant="h6" align="left" gutterBottom component="div">
            Trademark notice
          </Typography>
          <Typography align="left" gutterBottom component="div">
            The official symbols of CovidTracker, whether for commercial or
            non-commercial purposes, are not to be used without prior written
            authorization.
          </Typography>
          <Typography variant="h6" align="left" gutterBottom component="div">
            Our commitment to accessibility
          </Typography>
          <Typography align="left" gutterBottom component="div">
            CovidTracker is committed to achieving a high standard of
            accessibility as defined in the Standard on Web Accessibility and
            the Standard on Optimizing Websites and Applications for Mobile
            Devices. In the event of difficulty using our web pages,
            applications or device-based mobile applications, contact us for
            assistance or to obtain alternative formats such as regular print,
            Braille or another appropriate format. Interacting with us on social
            media
          </Typography>
          <Typography variant="h6" align="left" gutterBottom component="div">
            Information
          </Typography>
          <Typography align="left" gutterBottom component="div">
            We might use your personal information to:
            <List>
              <ListItem>- respond to your enquiries</ListItem>
              <ListItem>- compile statistics and reports</ListItem>
              <ListItem>
                - consult you about topics that might interest you
              </ListItem>
              <ListItem>
                - enable you to participate in outreach activities
              </ListItem>
              <ListItem>
                - allow for the sharing of opinions, knowledge, expertise and
                best practices
              </ListItem>
              <ListItem>- evaluate programs</ListItem>
            </List>
          </Typography>
        </Box>
      </CardContent>
    </Card>
  );
}

export default TermsAndConditions;
