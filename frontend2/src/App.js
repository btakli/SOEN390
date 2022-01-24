import './App.css';
import React, {useState, useEffect} from "react";

function App() {
  const [data, setData] = useState(null);

  useEffect(async () => {
    const response = await fetch('http://127.0.0.1:8000/api/person/');
    const api_data = await response.json();
    console.log(api_data);
    setData(JSON.stringify(api_data[0]));
  }, []);


  return (
    <div className="App">
      <div>{data}</div>
    </div>
  );
}

export default App;
