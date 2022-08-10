import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { useState } from "react";

import UserContext from "./contexts/UserContext.js";
import TokenContext from "./contexts/TokenContext.js";
import GroupContext from "./contexts/GroupContext.js";
import { IconContext } from "react-icons";

import MenuPage from "./pages/MenuPage";
import EntryPage from "./pages/EntryPage";
import RegisterPage from "./pages/RegisterPage";
import PlanerPage from "./pages/PlanerPage.js";
import GroupPage from "./pages/GroupPage.js";
import ActionsPage from "./pages/ActionsPage.js";
import GroupBoardPage from "./pages/Group_BoardPage.js";

const App = () => {

  const [user, setUser] = useState(JSON.parse(localStorage.getItem("user")));
  const [token, setToken] = useState(JSON.parse(localStorage.getItem("token")));
  const [preferences,setPreferences]=useState(JSON.parse(localStorage.getItem("preferences"))||{with_sab_dom:false,scale:1000})
  
  const [members,setMembers]=useState([])
  const [chosen,setChosen]=useState([])
  const [popUp,setPopUp]=useState('')
  const [group,setGroup]=useState({})
  
  return (

    <TokenContext.Provider value={{ token, setToken }}>
      <UserContext.Provider value={{ user, setUser ,preferences,setPreferences}}>
        <IconContext.Provider value={{ className: "react-icons" }}>
          <GroupContext.Provider value={{group,setGroup, popUp,setPopUp,members, setMembers,chosen,setChosen}}>
            <Router>
              <Routes>
                <Route path="/signin" element={<EntryPage />} />
                <Route path="/signup" element={<RegisterPage />} />
                <Route path="/menu" element={<MenuPage />} />
                <Route path='/' element={<PlanerPage/>}/>
                <Route path='/group/:groupId' element={<GroupPage/>}/>
                <Route path='/group/:groupId/actions' element={<ActionsPage/>}/>
                <Route path='/group/:groupId/board' element={<GroupBoardPage/>}/>
              </Routes>
            </Router>
          </GroupContext.Provider>
        </IconContext.Provider>
      </UserContext.Provider>
    </TokenContext.Provider>
  );
};

export default App;
