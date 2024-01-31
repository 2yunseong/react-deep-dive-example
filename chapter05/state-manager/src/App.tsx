import "./App.css";
import { useStore } from "./state/useStore";
import { createStore } from "./state/state";

const store = createStore({ count: 0 });

function App() {
  const [state, setState] = useStore(store);

  function handleClick() {
    setState((prev) => ({ count: prev.count + 1 }));
  }
  return (
    <div className='App'>
      <header className='App-header'>
        <p>{state.count}</p>
        <button onClick={handleClick}>Increment</button>
      </header>
    </div>
  );
}

export default App;
