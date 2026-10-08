import Dashboard from "./pages/Dashboard";
import Investigation from "./pages/Investigation";
import "./App.css";

function App() {
  const path = window.location.pathname;

  if (path === "/investigations") {
    return <Investigation />;
  }

  return <Dashboard />;
}

export default App;