import styled from 'styled-components'
import {  useState } from 'react'
import { useContext } from 'react';


import {  AiOutlineArrowLeft, AiOutlineClose,  AiOutlineContacts,  AiOutlineDelete, AiOutlineEdit } from "react-icons/ai";
import { deleteHabit, findEventParticipants, putHabit } from '../utils/api'
import TokenContext from '../contexts/TokenContext'
import PlanerContext from '../contexts/PlanerContext';
import Modal from './Modal';
    
export default function HabitDetails({details,setDetails}){
    const {groupId,id,title,begin,end,day,color,name}=details
    const {token} = useContext(TokenContext)
    const {setPopUp,findHabits,popUp} = useContext(PlanerContext)
    const [coloring,setColoring]=useState(false)
    const [showing,setShowing]=useState(false)
    const [participants,setParticipants]=useState([])
    const colorCodes=['#f7a471','#e8d361','#67e57e','#719ef7','#d3a1e0']
    const colorNames=['red','yellow','green','blue','purple']
    const dayNames=['DOM','SEG','TER','QUA','QUI','SEX','SAB']
    const colorCodes2=['#fca50f','#f45ace','#53ceed']
    const colorNames2=['orange','pink','aqua']
    function showParticipants(){
        const promise=findEventParticipants(id,token)
        promise.then(res=>{
            const {data}=res
            let string=''
            for(let k=0;k<data.length;k++){
                if(k!==data.length-1){
                    string+=`${data[k]}, `
                }else{
                    string+=`${data[k]}.`
                }
            }
            setParticipants(string)
        })
        promise.catch((e)=>{console.log(e)})
    }
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
    
    const colorList=<ul>{colorCodes.map((color,i)=>(
        <ChoseColor onClick={()=>changeColor(colorNames[i])} color={color} position={i*3}/>
    ))}</ul>

    return(
        
        <Content>
        {popUp==='deleting'?<Modal buttons={true} text={`deletar ${title} ?`} functionYes={()=>eraseHabit()} functionNo={()=>setPopUp('detailing')} />:<></>}
        {showing?
        <Container>
            <div className='corpessoa'>
                <Button color='black' onClick={()=>setShowing(false)}><AiOutlineArrowLeft/></Button>
                <p>participantes do evento:</p>
            </div>
            <p>{participants}</p>
        </Container>
        :
            <Container>
            <span>
                <ul>
                    <div className='corpessoa'>
                        {!coloring?<ColorBall onClick={()=>{if(!groupId)setColoring(true)}} color={colorCodes[colorNames.indexOf(color)]||colorCodes2[colorNames2.indexOf(color)]} />:colorList}
                        <h1>{title}</h1>
                    </div>
                    <Button color='black' onClick={()=>setPopUp('')}><AiOutlineClose/></Button>
                </ul>
                <div>
                    <p>{begin} ~ {end}</p>
                    <p>{dayNames[day]}</p>
                    {name?<p>grupo: {name}</p>:<></>}
                </div>
            </span>
            <span>
                {groupId?
                    <ul>
                    <Button color='blue' onClick={()=>{setShowing(true);showParticipants()}}><AiOutlineContacts/></Button>
                </ul>
                :
                <ul>
                    <Button color='red' onClick={()=>setPopUp('deleting')}><AiOutlineDelete/></Button>
                    <Button color='orange' onClick={()=>setPopUp('editing')}><AiOutlineEdit/></Button>
                </ul>}
            </span>
            </Container>
            }
        </Content>
    )
}
const Container=styled.div`
display:flex;flex-direction:column;justify-content:space-between;
`

const Content=styled.div`.corpessoa{display:flex}
display:flex;padding:10px;box-sizing:border-box;
width:90vw;position:fixed;max-width:500px;
height:30vh;z-index:6;top:18vh;left:5vw;
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
ul{display:flex;align-items:center;justify-content:space-between}

`
const Button=styled.button`
height:40px;
    width:40px;border-radius:10px;
    ;background-color:white;
font-size:23px;border:0;
display:flex;align-items:center;
color:${props=>props.color};
`
const ColorBall=styled.button`width:22px;height:22px;border-radius:50%;
border:0.3vh solid black;margin-right:1vh;
background-color:${props=>props.color}
`
const ChoseColor=styled.button`width:22px;height:22px;border-radius:50%;
border:0.3vh solid black;margin-right:1vh;
background-color:${props=>props.color}
`
