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

function Home() {
  return (
    <div className="App">
      <header className="App-header">
        <button type="button" onClick={handleSubmit}>
          Click me
        </button>
      </header>
    </div>
  );
}

export default Home;
