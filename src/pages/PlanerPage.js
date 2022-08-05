import {useState,useEffect,useContext} from 'react'
import { useNavigate } from 'react-router-dom'
import dayjs from 'dayjs'
import styled from 'styled-components'
import { AiFillSetting, AiOutlineCalendar, AiOutlineMenu } from "react-icons/ai";

import TokenContext from '../contexts/TokenContext'
import { getHabits } from '../api'
import Board from '../components/Board'
import HabitDetails from '../components/HabitDetails';
import CreateHabit from '../components/CreateHabit';
import Preferences from '../components/Preferences';
import PlanerContext from '../contexts/PlanerContext';
	
export default function PlanerPage(){
    const {token} = useContext(TokenContext)
    const navigate=useNavigate()

    const [details,setDetails]=useState({})
    const [popUp,setPopUp]=useState('')
    const [habits,setHabits]=useState([])

    const [preferences,setPreferences]=useState(JSON.parse(localStorage.getItem("preferences"))||{with_sab_dom:false,scale:1000})

    function defineNow(){
        const now=dayjs().format('HH:mm-d');
        const day=parseInt(now[6])
        const level=parseInt(now[0]+now[1])+parseInt(now[3]+now[4])/60
        setNow({level,day})
        return level
    }
    const [now,setNow]=useState({day:7,scrollIndex:0})

    function findHabits(scroll,size=preferences.size){
    if(scroll){
        scrollBoard(scroll,size)
    }else{
        const promessa=getHabits(token)
        promessa.then((res)=>{
            const habits=res.data
            setHabits(habits)
            findIndex_scrollBoard(habits,size)
        })}
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
        if(!token)navigate('/signin')
        getHabits(defineNow())
        setInterval(defineNow,60000)
    },[token])

    return(
        <Content>
            <PlanerContext.Provider value={{ popUp, setPopUp }}>
            {popUp==='creating'?<CreateHabit create={true} findHabits={findHabits}/>:<></>}
            {popUp==='detailing'?<HabitDetails setDetails={setDetails} details={details} findHabits={findHabits}/>:<></>}
            {popUp==='prefering'?<Preferences  findHabits={findHabits} preferences={preferences} setPreferences={setPreferences} />:<></>}
            <div className='orgAgenda'>
                <span className='reto'>
                    <Button onClick={()=>setPopUp('prefering')}>
                        <AiFillSetting />
                    </Button>
                    <Button onClick={()=>setPopUp('creating')}>
                        <AiOutlineCalendar/>
                    </Button>
                    <Button onClick={()=>navigate('/menu')}>
                        <AiOutlineMenu/>
                    </Button>
                </span>
            </div>
            <div className='orgAgenda2'>
                <Board now={now} habits={habits} setDetails={setDetails} preferences={preferences} />
            </div>
            </PlanerContext.Provider>
        </Content>
    )
}

const Button=styled.button`display:flex;justify-content:center;align-items:center;
button{width:7vh;height:7vh;border-radius:10px;position:relative;
    display:flex;justify-content:center;align-items:center;
background-color:#cc9139;
color:#6b491a;
font-size:35px;border:0vh solid black;}
h2{font-size:18px}
`

const Content=styled.div`
width: 100%;box-sizing:border-box;height:100vh;
background-color: #cc9139;
display: flex;justify-content:center;
align-items: center;
.orgAgenda{
    height:95vh;width:9vh;display:flex;flex-direction:column;align-items:center;}
.orgAgenda2{height:95vh;display:flex;justify-content:space-between;flex-wrap:wrap}
.reto{display:flex;height:24vh;justify-content:space-between;width:85%;flex-direction:column}
@media(max-width:900px){
    flex-direction:column;justify-content:flex-start;align-items:center;
    .orgAgenda{height:10vh;width:96vw;display:flex;flex-direction:row;margin:0 0 10px 0;}
    .reto{
        flex-direction:row;width:96vw;height:7vh;justify-content:space-between;align-items:center;}
}
`
/*
   function procurarConvites(){
        const promessa=axios.get(`${link}/convites`,h)
        promessa.then((res)=>{let y=10000
            if(res.data){
                for(let k=0;k<res.data.length;k++){
                    if(res.data[k].inicio<y){y=res.data[k].inicio}
                    setResposta([...resposta,res.data[k]])
                }
        setConvitesOn(true)
        const q=(y)*4.16/100*preferencias.tamoia-(preferencias.tamoia/50)

            document.querySelector('.aScrolar').scrollBy(0,-2000)
            document.querySelector('.aScrolar').scrollBy(0,q)
       }   })}
    

<Botao cor='#6b491a'>
                        <button onClick={()=>{if(convitesOn){setConvitesOn(false);procurar()}else{procurarConvites()}}}>
                            <ion-icon name="mail"></ion-icon>
                        </button>
                    </Botao>*/