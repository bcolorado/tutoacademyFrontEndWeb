import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { Login } from "./components/login";
import { Home } from "./components/home/home.jsx";




function App() {
  return (
    <Router>
      <Routes>
        <Route exact path="/" element={<Login />} />
        <Route exact path="/home" element={<Home />} />
      </Routes>
    </Router>
  );
}

export default App;