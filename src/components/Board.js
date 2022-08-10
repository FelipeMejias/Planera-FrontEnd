import { useState,useEffect, useContext } from "react"
import styled from 'styled-components'
import GroupContext from "../contexts/GroupContext"
import PlanerContext from "../contexts/PlanerContext"
import UserContext from "../contexts/UserContext"

export default function Board({inGroup,now,habits,setDetails,setPopUp}){
    const [daysData,setDaysData]=useState([])
    const {preferences}=useContext(UserContext)
    const {with_sab_dom,scale}=preferences
    const colorCodes=['#f7a471','#e8d361','#67e57e','#719ef7','#d3a1e0']
    const colorNames=['red','yellow','green','blue','purple']
    const daysNames=['DOM','SEG','TER','QUA','QUI','SEX','SAB']
    function separateHabits(){
        let days=daysNames.map((name,index)=>({
            name,content:habits.filter((habit)=>habit.day===index)
        }))
        days=days.filter((day)=>(!with_sab_dom?day.name!=='DOM'&&day.name!=='SAB':true))
        setDaysData(days)
    }
    const hours=[]
    for(let i=1;i<24;i++){hours.push(i)}

    function define_width_position(obj,list){
        let width='92';let position='';let c=false
        for(let k=0;k<list.length;k++){
            const j=list[k]
            if(j.floor<obj.floor && obj.floor<j.floor+j.size){
                let e=false
                for(let p=0;p<list.length;p++){
                    const v=list[p]
                    if((v.floor<j.size && j.floor<v.floor+v.size)||(j.floor===v.floor && j.size>v.size)){
                        width='44.2';position='left:4%';e=true
                    }
                }
                if(e){break}
                width='44.2';position='right:4%';c=true
            }
            if(j.floor===obj.floor){
                if(obj.size>j.size){width='44.2';position='right:4%';c=true}
                if(obj.size<j.size){width='44.2';position='left:4%'}
            }
        }
        for(let k=0;k<list.length;k++){
            if(c){break}
            const j=list[k]
            if(j.floor>obj.floor && obj.floor+obj.size>j.floor){width='44.2';position='left:4%'}
        }
        return {width,position}
    }
    const days=daysData.map((day,index)=>(
            <Day scale={scale}>

                {index===(with_sab_dom?now.day:now.day-1)?<NowIndicator level={now.level*4.16}></NowIndicator>:<></>}
                {hours.map(i=>(<Marks level={i*4.16} ></Marks>))}
                {index===0?hours.map(i=>(<Hours level={i*4.16-0.8} side={false}><span>{i}</span></Hours>)):<></>}
                {index===(with_sab_dom?6:4)?hours.map(i=>(<Hours level={i*4.16-0.8} side={true}><span>{i}</span></Hours>)):<></>}

                <p>{day.name}</p>

                {day.content.map(habit=>{
                    const {floor,size,color,title,tag}=habit
                    const {width,position}=define_width_position(habit,day.content)
                    return(
                    <Habit width={width} position={position} level={floor*0.0416} size={size*0.0416} color={colorCodes[colorNames.indexOf(color)]} 
                        onClick={()=>{setPopUp('detailing');setDetails(habit)}} >
                        <h1>{inGroup?tag:title}</h1>
                    </Habit>
                )})}
            </Day>)
        )
    useEffect(separateHabits,[habits,preferences])
    return (
        <Content className="board">
            <ul>
                {days}
            </ul>
        </Content>
    )
}
const NowIndicator=styled.div`
height:3px;width:92%;background-color:red;
position:absolute;top:calc(${props=>props.level}% - 1.5px);z-index:5;
border-radius:1.5px
`

const Hours=styled.div`
height:0.1px;width:3%;background-color:#d3b28b;display:flex;justify-content:flex-${props=>props.side?'start':'end'};
position:absolute;top:${props=>props.level}%;z-index:1;
${props=>props.side?'right':'left'}:-3%;
@media(max-width:614px){
    ${props=>props.side?'right':'left'}:-2.6px;
}
span{color:#6b491a;position:absolute;top:3px;font-size:12px;font-family: 'PT Sans Narrow', sans-serif;}
`
const Marks=styled.div`height:0.9px;width:100%;background-color:#d3b28b;
position:absolute;top:${props=>props.level}%;z-index:1;left:0;
span{color:#6b491a;position:absolute;top:3px;font-size:8px}
`

const Habit=styled.div`
box-shadow: -1.5px 1.5px 1.5px rgba(0, 0, 0, 0.15);
    width:${props=>props.width}%;height:${props=>props.size}%;background-color:${props=>props.color};
    border-radius:7px;
    display:flex;flex-direction:column;align-items:center;justify-content:center;
    position:absolute;top:${props=>props.level}%;${props=>props.position};z-index:2;
    h1{ text-align: center;font-size:15px;font-family: 'PT Sans Narrow', sans-serif;}
`

const Day =styled.div`
    width: 21.4%;
    height: ${props=>props.scale}px;
    margin-left: 0.9px;margin-right: 0.9px;

    background-color:#f7debb;
    display:flex;flex-direction:column;align-items:center;
    position:relative;
p{
    font-size:13px;
    color:#CC9139;top:2.7vh;z-index:8;position:fixed;
    @media(max-width:900px){
        top:11.0vh
    }

}.divz{width:18px;display:flex;justify-content:center;
    height:18px;position:absolute;right:0.6vw;border-radius:50%;
    background-color:#d3b28b;position:absolute;top:-9px;
    left:calc(50% - 18px);
}

`
const Content=styled.div`
width: 95vw;max-width:1050px;
height: 95vh;overflow:hidden;overflow-y:scroll;box-sizing:border-box;
background-color: #d3b28b;
border:0.3vh solid #6b491a;
border-top:2vh solid #6b491a;
padding-left:11px;padding-right:11px;
border-radius: 1.5vh;
position:relative;
@media(max-width:900px){
    width:96vw;height:85vh;
}
@media(max-width:614px){
    width:96vw;height:80vh;
}
ul{display:flex;width:100%}
::-webkit-scrollbar {
    width: 0px;
  }
`