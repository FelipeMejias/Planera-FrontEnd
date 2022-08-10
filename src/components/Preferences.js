import styled from 'styled-components'
import { useContext } from 'react';
import {  AiOutlineClose } from 'react-icons/ai';
import PlanerContext from '../contexts/PlanerContext';
import UserContext from '../contexts/UserContext';
export default function Preferences({findHabits,setPopUp}){
    const {preferences,setPreferences}=useContext(UserContext)
    const {scale,with_sab_dom}=preferences
    function changeScale(value){
        savePreference({...preferences,scale:value})
        findHabits(null,value)
    }
    function change_sab_dom(value){
        savePreference({...preferences,with_sab_dom:value})
    }
    function savePreference(pref){
        setPreferences(pref)
        localStorage.setItem("pref", JSON.stringify(pref))
    }
    return(
        <Content>
            <Button onClick={()=>setPopUp('')}><AiOutlineClose/></Button>
            <h1>sab e dom:</h1>
                <ul>
                    <Choice onClick={()=>change_sab_dom(false)} selected={!with_sab_dom}>OFF</Choice>
                    <Choice onClick={()=>change_sab_dom(true)} selected={with_sab_dom}>ON</Choice>
                </ul>
            <h1>tamanho:</h1>
                <ul>
                    <Choice onClick={()=>changeScale(700)} selected={scale===700}>P</Choice>
                    <Choice onClick={()=>changeScale(1000)} selected={scale===1000}>M</Choice>
                    <Choice onClick={()=>changeScale(1400)} selected={scale===1400}>G</Choice>
                </ul>
        </Content>             
    )
}
const Button=styled.div`border:0;background-color:white;font-size:25px;
position:absolute;top:5px;right:10px
`
const Choice=styled.div`border-radius:10px;font-size:15px;height:35px;color:white;width:30%;border:0;
display:flex;justify-content:center;align-items:center;margin:5px;
background-color:${props=>props.selected?'blue':'gray'};
@media(max-width:900px){width:35px}
`

const Content=styled.div`
span{display:flex;justify-content:space-between;align-items:center;}
div{display:flex;align-items:center;}
ul{display:flex;align-items:center;}
position:fixed;
z-index:1;top:8vh;left:20vw;
display:flex;padding:10px;box-sizing:border-box;width:17vw;
    background-color: white;
    flex-direction:column;justify-content:space-between;
    border-radius: 1.5vh;
    border:1.5px solid black;
    height:20vh;
    button{width:48%;border-radius:10px;font-size:15px;height:40px;
        background-color:#6B491A;color:white;border:0}
    ul{
        display:flex;justify-content:center;align-items:center;
        
    }
    input{width:80%}
    @media(max-width:900px){
        position:fixed;top:calc(17vh - 30px);z-index:10;width:60vw;left:20vw;height:40vh;min-height:240px
    
    }
`