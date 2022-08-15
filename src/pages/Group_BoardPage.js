import {useState,useEffect,useContext} from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import dayjs from 'dayjs'
import styled from 'styled-components'
import { AiFillSetting, AiOutlineArrowLeft, AiOutlineCalendar, AiOutlineFileAdd, AiOutlineMenu } from "react-icons/ai";

import TokenContext from '../contexts/TokenContext'
import { findGroupHabits, getHabits } from '../utils/api'
import Board from '../components/Board'
import HabitDetails from '../components/HabitDetails';
import CreateHabit from '../components/CreateHabit';
import Preferences from '../components/Preferences';
import PlanerContext from '../contexts/PlanerContext';
import Modal from '../components/Modal';
import UserContext from '../contexts/UserContext';
import GroupContext from '../contexts/GroupContext';
import OnGroupDetails from '../components/OnGroupDetails';
	
export default function GroupBoardPage(){
    const {token} = useContext(TokenContext)
    const {preferences}=useContext(UserContext)
    const {chosen,members,popUp,setPopUp}=useContext(GroupContext)

    const navigate=useNavigate()
    const [details,setDetails]=useState({})
    const [habits,setHabits]=useState([])
    const {groupId}=useParams()
    function defineNow(){
        const now=dayjs().format('HH:mm-d');
        const day=parseInt(now[6])
        const level=parseInt(now[0]+now[1])+parseInt(now[3]+now[4])/60
        setNow({level,day})
        return level
    }
    const [now,setNow]=useState({day:null,scrollIndex:null})

    function findHabits(scroll,size=preferences.size){
        const chosenData =  {chosen} 
        const promise=findGroupHabits(chosenData,groupId,token)
        promise.then((res)=>{
            const habits=res.data
            setHabits(habits)
            if(scroll){
                scrollBoard(scroll,size) 
            }else{
                findIndex_scrollBoard(habits,size)}
        })
        promise.catch((e)=>{console.log(e)})
        
    }
    function definePageName(){
        const len=chosen.length
        if(len===members.length)return 'todos os membros'
        if(len!==1)return `${len} membros`
        for(let part of members)if(part.id===chosen[0])return `${part.name}`
    }
    function findIndex_scrollBoard(habits,size){
        let earlierHabit=Infinity
        for(let habit of habits){
            if(habit.graphBegin < earlierHabit)earlierHabit=habit.graphBegin
        }
        scrollBoard(earlierHabit,size) 
    }
    function scrollBoard(rawIndex,size){
        const board=document.querySelector('.board')
        const finalIndex=(rawIndex)*4.16/100*size-(size/50)
        board.scrollBy(0,-2000)
        board.scrollBy(0,finalIndex)
    }
    useEffect(()=>{
        findHabits(defineNow())
        setInterval(defineNow,60000)
    },[])
    return(
        <Content>
            {popUp==='detailing'?<OnGroupDetails setDetails={setDetails} details={details} />:<></>}
            {popUp==='prefering'?<Preferences findHabits={findHabits} setPopUp={setPopUp}/>:<></>}
            <Header>
                <Button onClick={()=>navigate(`/group/${groupId}`)}><AiOutlineArrowLeft/></Button>
                <h1>{definePageName()}</h1>
                <Button onClick={()=>setPopUp('prefering')}><AiFillSetting /></Button>
            </Header>
            <BoardContainer>
                <Board inGroup={true} now={now} habits={habits} setDetails={setDetails}  setPopUp={setPopUp}/>
            </BoardContainer>
        </Content>
    )
}
const Header=styled.section`
h1{font-size:27px;color:#6b491a}
display:flex;align-items:center;justify-content:space-between;
    height:10vh;width:96vw;display:flex;margin:0 0 10px 0;
`

const Button=styled.button`display:flex;justify-content:center;align-items:center;
width:7vh;height:7vh;border-radius:10px;position:relative;
    display:flex;justify-content:center;align-items:center;
background-color:#cc9139;
color:#6b491a;
font-size:35px;border:0vh solid black;
h2{font-size:18px}
`
const BoardContainer=styled.section`
height:10vh;width:96vw;display:flex;flex-direction:row;margin:0 0 10px 0;
`
const Content=styled.div`
width: 100%;box-sizing:border-box;height:100vh;
background-color: #cc9139;
display: flex;flex-direction:column;
align-items: center;
.orgAgenda{
    height:95vh;width:9vh;display:flex;flex-direction:column;align-items:center;}
.orgAgenda2{height:95vh;display:flex;justify-content:space-between;flex-wrap:wrap}
.buttonGB{display:flex;
    width:96vw;height:7vh;justify-content:space-between;align-items:center;}
}
button{cursor:pointer}
`