import { useState } from "react"; 

import "./PriorityToggle.css";

function PriorityToggle({ initial }){
  const [priority, setPriority] = useState(initial);

  const togglePriority = () => {
    setPriority(!priority);
  };

  return (
    <div className="toggle-container" onClick={togglePriority}> 
      <div className={`dialog-button ${priority ? "" : "disabled"}`}>
        {priority ? "YES" : "NO"} 
      </div>
    </div>
  );
}

export default PriorityToggle;