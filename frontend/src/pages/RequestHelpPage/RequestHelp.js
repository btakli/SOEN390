import React from "react";

import RequestGroceryHelp from "./RequestGroceryHelp";
import RequestInformation from "./RequestInformation";
import RequestByInfected from "./RequestByInfected";
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
