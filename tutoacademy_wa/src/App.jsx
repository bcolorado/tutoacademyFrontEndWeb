import { Router,Route, Routes } from "react-router-dom";
import {Login} from "./components/login";


function App() {
  return (
    <Router>
      <Routes>
        <Route exact path="/" component={Login} />
      </Routes>
    </Router>
  );
}

export default App;