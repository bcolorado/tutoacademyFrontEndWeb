import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { Login } from "./components/login";
import { Home } from "./components/home/home.jsx";
import {Profile} from "./components/profile"
import {Chat} from './components/chat';
import { CreateProfile } from "./components/createProfile";
import { RequireAuth } from "react-auth-kit";




function App() {
  return (

    <Router>

      <Routes>
        <Route exact path="/" element={<Login />} />
        <Route exact path="/home" element={<RequireAuth loginPath="/">
            <Home />
          </RequireAuth>} />

        <Route exact path="/profile/:id" element={<RequireAuth loginPath="/">
          <Profile />
        </RequireAuth>} />       

        <Route exact path="/createProfile" element={<RequireAuth loginPath="/">
          <CreateProfile />
        </RequireAuth>} />   

        <Route exact path="/chats" element={<RequireAuth loginPath="/">
          <Chat />
        </RequireAuth>} />   


        
      </Routes>


    </Router>

    
  );
}

export default App;