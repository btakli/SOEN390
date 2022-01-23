import logo from "./logo.svg";
import "./App.css";

function handleSubmit() {
  //This is a test function, use it as a template for future requests
  var data = { username: "admin", password: "superuser" };
  fetch("http://localhost:8000/token-auth/", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
  })
    .then((res) => res.json())
    .then((json) => {
      console.log(json);
    });
}

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <p>
          Edit <code>src/App.js</code> and save to reload.
        </p>
        <a
          className="App-link"
          href="https://reactjs.org"
          target="_blank"
          rel="noopener noreferrer"
        >
          Learn React
        </a>
        <button type="button" onClick={handleSubmit}>
          Click me
        </button>
      </header>
    </div>
  );
}

export default App;
