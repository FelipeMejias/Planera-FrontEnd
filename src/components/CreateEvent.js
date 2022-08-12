import styled from 'styled-components'
import { useState } from 'react'
import { useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import TokenContext from '../contexts/TokenContext';
import { postEvent, putHabit } from '../api';
import PlanerContext from '../contexts/PlanerContext';
import { AiOutlineArrowLeft, AiOutlineCheck, AiOutlineCheckCircle, AiOutlineClockCircle, AiOutlineSave } from 'react-icons/ai';
import GroupContext from '../contexts/GroupContext';
	
    
export default function CreateEvent({setFace,groupId}){
    const navigate=useNavigate()
    const {token} = useContext(TokenContext)
    const {group,chosen,setChosen}=useContext(GroupContext)
    const [title,setTitle]=useState('')
    const [begin,setBegin]=useState('')
    const [end,setEnd]=useState('')
    const [day,setDay]=useState(null)
    const daysNames=['DOM','SEG','TER','QUA','QUI','SEX','SAB']
    function saveEvent(){
        const eventData={title,begin,end,day,chosen}
        const promise=postEvent(eventData,groupId,token)
        promise.then(()=>{
            setFace('main')
            setChosen([])
        })
        promise.catch((e)=>{console.log(e)})
    }
    return(
        <Content>
            <Header>
                <ButtonIcon onClick={()=>setFace('main')}><AiOutlineArrowLeft /></ButtonIcon>
                <h1>criar evento em {group.name}</h1>
            </Header>
            <DataInsertion>
                <ul>
                    {daysNames.map((name,index)=>(
                        <DayButton onClick={()=>setDay(index)} selected={day===index}>{name}</DayButton>
                    ))}
                </ul>
                <Form>
                    <span>
                        <div>
                            <input value={begin} onChange={(e)=>setBegin(e.target.value)} placeholder='horário início' type='number' ></input>
                            <input value={end} onChange={(e)=>setEnd(e.target.value)} placeholder='horário final'  type='number' ></input>
                            <input value={title} onChange={(e)=>setTitle(e.target.value)} placeholder='título' ></input>        
                        </div>  
                        <ActionButton onClick={()=>{}}><AiOutlineClockCircle/></ActionButton>
                        <ActionButton onClick={saveEvent}><AiOutlineSave/></ActionButton>
                    </span>
                </Form>
            </DataInsertion>
            <MemberBox>

            </MemberBox>
        </Content>
    )
}
const ButtonIcon=styled.button`
width:50px;height:50px;border-radius:10px;position:relative;
    display:flex;justify-content:center;align-items:center;
background-color:#cc9139;
color:#6b491a;
font-size:28px;border:0vh solid black;
h2{font-size:18px}
`
const ActionButton=styled.button`
display:flex;justify-content:center;align-items:center;
width:100px;height:100px;border-radius:50%;
background-color:#cc9139;
color:#6b491a;
font-size:60px;border:0;
`
const DayButton=styled.button`border-radius:50%;font-size:13px;
height:40px;color:${props=>props.selected?'white':'black'};width:40px;border:0;
background-color:${props=>props.selected?'green':'#B1CACE'};margin-right:3px;
`
const MemberBox=styled.div`position:relative;margin-top:2px;
display:flex;flex-direction:column;align-items:center;
width:400px;height:320px;background-color:#c18736;border-radius:5px;padding:10px 0 10px 0;
`
const Form=styled.div`
display:flex;flex-direction:row;justify-content:space-evenly;padding-left:30px;
    input{
        height:35px;width:92%;font-size:18px;margin:10px 0 10px 0;padding-left:6px;
        background-color:#6B491A;box-sizing:border-box;color:white;border:0;border-radius:5px
    }
    div{display:flex;flex-direction:column}
    span{display:flex;align-items:center;width:100%;justify-content:center;}
`
const DataInsertion=styled.div`
height:240px;width:500px;
display:flex;padding:10px;box-sizing:border-box;flex-direction:column;
    justify-content:space-between;align-items:center;
    ul{display:flex;justify-content:space-between;align-items:center;width:400px;}
    .sabdom{width:38%}
`
const Header=styled.section`
height:10vh;width:96vw;display:flex;align-items:center;
h1{font-size:27px;color:#6b491a}
`
const Content=styled.div`
display:flex;flex-direction:column;align-items:center;
`
