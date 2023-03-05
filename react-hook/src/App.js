import logo from "./logo.svg";
import "./App.css";
import LikeButton from "./components/LikeButton";
import MouseTracker from "./components/MouseTracker";
import DogShow from "./components/DogShow";
import DogShowWithHook from "./components/DogShowWithHook";
import CatShowWithHook from "./components/CatShowWithHook";
import useMousePosition from "./hooks/useMousePosition";

function App() {
  const position = useMousePosition();

  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <h1>{position.x}</h1>
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
        <DogShow />
        <DogShowWithHook />
        <CatShowWithHook />
        <MouseTracker />
        <LikeButton />
      </header>
    </div>
  );
}

export default App;
