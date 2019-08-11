import React, { useState } from "react";
import ReactDOM from "react-dom";
import CountryView from "./components/CountryView";
import CountryList from "./components/CountryList";
import "./style/main.scss";

function App() {
  const [code, setCode] = useState(null);

  return (
    <div className="App">
      <div className="App__left">
        <CountryList onSelect={code => setCode(code)} />
      </div>

      <div className="App__right">
        <CountryView code={code} />
      </div>
    </div>
  );
}

const rootElement = document.getElementById("root");
ReactDOM.render(<App />, rootElement);
