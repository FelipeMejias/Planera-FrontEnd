import styled from 'styled-components'
import {  useState } from 'react'
import { useContext } from 'react';


import {  AiOutlineClose,  AiOutlineDelete, AiOutlineEdit } from "react-icons/ai";
import { deleteHabit, putHabit } from '../api'
import TokenContext from '../contexts/TokenContext'
import PlanerContext from '../contexts/PlanerContext';
import Modal from './Modal';
    
export default function HabitDetails({details,setDetails}){
    const {id,title,begin,end,day,color}=details
    const {token} = useContext(TokenContext)
    const {setPopUp,findHabits,popUp} = useContext(PlanerContext)
    const [coloring,setColoring]=useState(false)
    function changeColor(color){
        const promise=putHabit(id,{color},token)
        promise.then(()=>{
            setDetails({...details,color})
            findHabits()
            setColoring(false)
        })
        promise.catch((e)=>{console.log(e)})
    }
    function eraseHabit(){
        const promise=deleteHabit(id,token)
        promise.then(()=>{
            setDetails({})
            setPopUp('')
            findHabits()
        })
        promise.catch((e)=>{console.log(e)})
    }
    const colorCodes=['#f7a471','#e8d361','#67e57e','#719ef7','#d3a1e0']
    const colorNames=['red','yellow','green','blue','purple']
    const dayNames=['DOM','SEG','TER','QUA','QUI','SEX','SAB']

    const colorList=<ul>{colorCodes.map((color,i)=>(
        <ChoseColor onClick={()=>changeColor(colorNames[i])} color={color} position={i*3}/>
    ))}</ul>

    return(
        
        <Content>
        {popUp==='deleting'?<Modal buttons={true} text={`deletar ${title} ?`} functionYes={()=>eraseHabit()} functionNo={()=>setPopUp('detailing')} />:<></>}
            <span>
                <ul>
                    <div className='corpessoa'>
                        {!coloring?<ColorBall onClick={()=>{setColoring(true)}} color={colorCodes[colorNames.indexOf(color)]} />:colorList}
                        <h1>{title}</h1>
                    </div>
                    <Button color='black' onClick={()=>setPopUp('')}><AiOutlineClose/></Button>
                </ul>
                <div>
                    <p>{begin} ~ {end}</p>
                    <p>{dayNames[day]}</p>
                </div>
            </span>
            <span>
                <ul>
                    <Button color='red' onClick={()=>setPopUp('deleting')}><AiOutlineDelete/></Button>
                    <Button color='orange' onClick={()=>setPopUp('editing')}><AiOutlineEdit/></Button>
                </ul>
            </span>
        </Content>
    )
}
const Content=styled.div`.corpessoa{display:flex}
display:flex;padding:10px;box-sizing:border-box;
width:90vw;position:fixed;max-width:500px;
height:30vh;z-index:6;top:8vh;left:20vw;
    background-color: white;
    flex-direction:column;justify-content:space-between;
    border-radius: 1.5vh;
    border:0.3vh solid black;
h1{font-size:25px;font-weight:900;margin-bottom:6px;}
h2{font-size:25px}
span{width:100%;display:flex;flex-direction:column;justify-content:space-between}
p{font-size:22px;margin:5px 0  0;
strong{font-weight:700;font-size:20px;}}
input{height:28px;width:97%;font-size:20px;margin-top:1vh;margin-bottom:1vh;}
.orgDetalhesEvento{display:flex}
ul{display:flex;align-items:center;width:100%;justify-content:space-between}
@media(max-width:900px){
    position:fixed;top:18vh;z-index:6;width:90vw;left:5vw;height:220px
}
`
const Button=styled.button`
height:40px;
    width:40px;border-radius:10px;
    ;background-color:white;
font-size:23px;border:0;
display:flex;align-items:center;
color:${props=>props.color};
`
const ColorBall=styled.div`width:22px;height:22px;border-radius:50%;
border:0.3vh solid black;margin-right:1vh;
background-color:${props=>props.color}
`
const ChoseColor=styled.div`width:22px;height:22px;border-radius:50%;
border:0.3vh solid black;margin-right:1vh;
background-color:${props=>props.color}
`
