import {useState,useEffect,useContext} from 'react'
import { useNavigate } from 'react-router-dom'
import dayjs from 'dayjs'
import styled from 'styled-components'
import { AiFillHome, AiFillSetting, AiOutlineCalendar, AiOutlineFileAdd, AiOutlineMenu } from "react-icons/ai";

import TokenContext from '../contexts/TokenContext'
import { getEvents, getHabits } from '../utils/api'
import Board from '../components/Board'
import HabitDetails from '../components/HabitDetails';
import CreateHabit from '../components/CreateHabit';
import Preferences from '../components/Preferences';
import PlanerContext from '../contexts/PlanerContext';
import Modal from '../components/Modal';
import UserContext from '../contexts/UserContext';
	
export default function PlanerPage(){
    const {token} = useContext(TokenContext)
    const {user,preferences}=useContext(UserContext)
    const navigate=useNavigate()
    const [myHabits,setMyHabits]=useState([])
    const [details,setDetails]=useState({})
    const [popUp,setPopUp]=useState('')

    function defineNow(){
        const now=dayjs().format('HH:mm-d');
        const day=parseInt(now[6])
        const level=parseInt(now[0]+now[1])+parseInt(now[3]+now[4])/60
        setNow({level,day})
        return level
    }
    const [now,setNow]=useState({day:null,scrollIndex:null})

    function findHabits(scroll,size=preferences.size){
        const promise1=getHabits(token)
        promise1.then(res1=>{
            const promise2=getEvents(token)
            promise2.then(res2=>{
                const habits=[...res1.data,...res2.data]
                setMyHabits(habits)
                if(scroll){
                    scrollBoard(scroll,size) 
                }else{
                findIndex_scrollBoard(habits,size)}
            })
            promise2.catch((e)=>{console.log(e)})
        })
        promise1.catch((e)=>{console.log(e)})
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

    useEffect(()=>{if(!token)navigate('/signin')},[token])

    return(
        <Content>
            <PlanerContext.Provider value={{ popUp, setPopUp,findHabits }}>
            {popUp==='creating'?<CreateHabit create={true}/>:<></>}
            {popUp==='detailing'||popUp==='deleting'?<HabitDetails setDetails={setDetails} details={details}/>:<></>}
            {popUp==='prefering'?<Preferences findHabits={findHabits} setPopUp={setPopUp}/>:<></>}
            {popUp==='editing'?<CreateHabit create={false} details={details} />:<></>}
            {popUp==='loading habits'?<Modal buttons={false} text={`carregando agenda de ${user.name}`}/>:<></>}
            <Header>
                <span>
                    <Button onClick={()=>navigate('/menu')}><AiFillHome/></Button>
                    <Button onClick={()=>setPopUp('creating')}><AiOutlineFileAdd/></Button>
                    <Button onClick={()=>setPopUp('prefering')}><AiFillSetting /></Button>
                </span>
            </Header>
            <BoardContainer>
                <Board inGroup={false} now={now} habits={myHabits} setDetails={setDetails} setPopUp={setPopUp} />
            </BoardContainer>
            </PlanerContext.Provider>
        </Content>
    )
}

const Button=styled.button`display:flex;justify-content:center;align-items:center;
width:7vh;height:7vh;border-radius:10px;position:relative;
justify-content:center;align-items:center;
background-color:#cc9139;
color:#6b491a;
font-size:35px;border:0vh solid black;
h2{font-size:18px}
`
const Header=styled.section`
height:95vh;width:9vh;display:flex;flex-direction:column;align-items:center;
span{display:flex;height:24vh;justify-content:space-between;width:85%;flex-direction:column}
@media(max-width:900px){
    height:10vh;width:96vw;display:flex;flex-direction:row;margin:0 0 10px 0;
    span{flex-direction:row;width:96vw;height:7vh;justify-content:space-between;align-items:center;}
}`
const BoardContainer=styled.section`
height:95vh;display:flex;justify-content:space-between;flex-wrap:wrap
`
const Content=styled.div`
width: 100%;height:100vh;
background-color: #cc9139;
display: flex;justify-content:center;
align-items: center;
@media(max-width:900px){
    flex-direction:column;justify-content:flex-start;align-items:center;
}
button{cursor:pointer}
`