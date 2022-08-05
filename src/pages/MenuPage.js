
import styled from 'styled-components'
import { useNavigate} from 'react-router-dom'

import { IconContext } from "react-icons";
import { useContext } from 'react';
import TokenContext from "../contexts/TokenContext.js";
import UserContext from "../contexts/UserContext.js";

export default function MenuPage(){
    const navigate=useNavigate()
    const {setToken}=useContext(TokenContext)
    const {setUser}=useContext(UserContext)
    function logOut(){
        navigate('/signin')
        localStorage.removeItem("user");
        localStorage.removeItem("token");
        setUser(null)
        setToken(null)
    }
    return(
      <Content>
      <IconContext.Provider value={{ className: "react-icons" }}>
      <h6>PlanerA</h6>
        <Button color='#6B491A' onClick={()=>navigate('/')}><h1>Agenda</h1></Button>
        <Button className='logOut' color='brown' onClick={logOut} >Log out</Button>
      </IconContext.Provider>
      </Content>
    )
}
const Content=styled.div`
h6{font-family: 'Amatic SC', cursive;margin:40px 0 20px 0;font-size:80px;}
width: 100%;box-sizing:border-box;height:100vh;
background-color: #CC9139;
display: flex;flex-direction:column;
align-items: center;
.logOut{margin:170px 0 0 0}
div{display:flex}
`
const Button=styled.button`margin:30px 0 0 0;
background-color:red;max-width:400px;
width:150px;height:70px;background-color:${props=>props.color};
  display:flex;flex-direction:column;justify-content:space-evenly;align-items:center;
  border:0;border-radius:10px;
  color:white;font-size:25px;
  box-shadow: -2.5px 2.5px 2.5px rgba(0, 0, 0, 0.15);
`