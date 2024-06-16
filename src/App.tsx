import { useState } from "react";
import { invoke } from "@tauri-apps/api/tauri";
import "./App.css";

function App() {
  const [greetMsg, setGreetMsg] = useState("");
  const [name, setName] = useState("");

  async function greet() {
    setGreetMsg("Loading...");
    try {
      setGreetMsg(await invoke("greet", { name }));
    }
    catch(error: any) {
      setGreetMsg("Error: " + error as string);
    }
  }

  const [isPrime, setIsPrime] = useState("");
  const [numToCheck, setNumToCheck] = useState<number | undefined>(undefined);

  async function checkPrime() {
    setIsPrime("Loading...");
    try {
      let result: boolean = await invoke("is_prime", { number: numToCheck });
      setIsPrime(result.toString());
    }
    catch(error: any) {
      setIsPrime("Error: " + error as string);
    }
  }

  return (
    <div className="container">
      <h1>Welcome to Tauri!</h1>

      <form
        className="row"
        onSubmit={(e) => {
          e.preventDefault();
          greet();
        }}
      >
        <input
          id="greet-input"
          onChange={(e) => setName(e.currentTarget.value)}
          placeholder="Enter a name..."
        />
        <button type="submit">Greet</button>
      </form>

      <p>{greetMsg}</p>

      <form
        className="row"
        onSubmit={(e) => {
          e.preventDefault();
          checkPrime();
        }}
      >
        <input
          id="prime-input"
          type="number"
          onChange={(e) => setNumToCheck(parseInt(e.currentTarget.value))}
          placeholder="Enter a number..."
        />
        <button type="submit">Is Prime?</button>
      </form>

      <p>{isPrime}</p>
    </div>
  );
}

export default App;
