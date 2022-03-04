import "./App.css";
import RoutesManager from "./RoutesManager";
import { BrowserRouter as Router } from "react-router-dom";

function App() {
  return (
    <div className="App">
      <Router>
        <RoutesManager />
      </Router>
    </div>
  );
}

export default App;
