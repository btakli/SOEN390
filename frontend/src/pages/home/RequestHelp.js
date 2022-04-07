import React from "react";

import RequestGroceryHelp from "../../pages/RequestHelpPage/RequestGroceryHelp";
import RequestInformation from "../../pages/RequestHelpPage/RequestInformation";
import RequestByInfected from "../../pages/RequestHelpPage/RequestByInfected";
import Typography from "@mui/material/Typography";
import { Card } from "@mui/material";

function RequestHelp() {
  return (
    <Card>
      <RequestByInfected />
      <RequestGroceryHelp />
      <RequestInformation />
    </Card>
  );
}
export default RequestHelp;
