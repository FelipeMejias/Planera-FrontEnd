import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { useState } from "react";

import UserContext from "./contexts/UserContext.js";
import TokenContext from "./contexts/TokenContext.js";
import { IconContext } from "react-icons";

import MenuPage from "./pages/MenuPage";
import EntryPage from "./pages/EntryPage";
import RegisterPage from "./pages/RegisterPage";
import PlanerPage from "./pages/PlanerPage.js";

const App = () => {
  const [user, setUser] = useState(JSON.parse(localStorage.getItem("user")));
  const [token, setToken] = useState(JSON.parse(localStorage.getItem("token")));
  return (

    <TokenContext.Provider value={{ token, setToken }}>
      <UserContext.Provider value={{ user, setUser }}>
      <IconContext.Provider value={{ className: "react-icons" }}>
        <Router>
          <Routes>
            <Route path="/signin" element={<EntryPage />} />
            <Route path="/signup" element={<RegisterPage />} />
            <Route path="/menu" element={<MenuPage />} />
            <Route path='/' element={<PlanerPage/>}/>
          </Routes>
        </Router>
        </IconContext.Provider>
      </UserContext.Provider>
    </TokenContext.Provider>
  );
};

export default App;
