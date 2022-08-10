import {useState,useEffect,useContext} from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import dayjs from 'dayjs'
import styled from 'styled-components'
import { AiFillCalendar, AiFillContacts, AiFillSetting, AiOutlineCalendar, AiOutlineContacts, AiOutlineMenu, AiOutlineUserAdd, AiTwotoneContacts } from "react-icons/ai";

import TokenContext from '../contexts/TokenContext'

import Board from '../components/Board'
import UserContext from '../contexts/UserContext';
import { getGroup, sendEnvitation } from '../api';
import GroupContext from '../contexts/GroupContext';
	
export default function ActionsPage(){
    const {token} = useContext(TokenContext)
    const {participants,chosen,setChosen}=useContext(GroupContext)
    const {groupId}=useParams()
    const navigate=useNavigate()
    const [creating,setCreating]=useState(false)
    function handleSelection(num){
        if(chosen.includes(num)){
            setChosen(chosen.filter(i=>i!==num))
        }else{setChosen([...chosen,num])}
    }
    const allSelected=chosen.length===participants.length
    
    return(
        <Content>
            {!creating?
            <SelectChosen>
                <Button onClick={()=>setChosen(allSelected?[]:participants.map(p=>p.id))} className='selections'>
                    {allSelected?'limpar seleções':'selecionar todos'}
                </Button>
                {participants.map((participant,i)=>(
                    <Participant selected={chosen.includes(participant.id)}
                    onClick={()=>handleSelection(participant.id)}>
                        <h1>{participant.name}</h1>
                    </Participant>
                ))}
                <span>
                    <Button onClick={()=>navigate(`/group/${groupId}/board`)}>
                        <AiFillCalendar/>
                    </Button>
                </span>
            </SelectChosen>
            :
            <>
                
            </>
            }
        </Content>
    )
}

const SelectChosen=styled.section`
`

const ButtonIcon=styled.button`display:flex;justify-content:center;align-items:center;
width:7vh;height:7vh;border-radius:10px;position:relative;
    display:flex;justify-content:center;align-items:center;
background-color:#cc9139;
color:#6b491a;
font-size:35px;border:0vh solid black;
h2{font-size:18px}
`

const Button=styled.button`margin:30px 0 0 0;max-width:400px;
width:120px;height:50px;background-color:#6b491a;
  display:flex;flex-direction:column;justify-content:space-evenly;align-items:center;
  border:0;border-radius:10px;
  color:white;font-size:25px;
  box-shadow: -2.5px 2.5px 2.5px rgba(0, 0, 0, 0.15);

`

const Participant=styled.div`
background-color:${props=>props.selected?'green':'#B1CACE'};
display:flex;align-items:center;width:65%;
h1{font-size:25px;margin:0 0 0 7px;}
font-size:25px;
box-sizing:bordex-box;padding:5px;border-radius:5px;
margin:5px 0 5px 0
`

const Content=styled.div`
span{display:flex;justify-content:space-between;width:200px}
.cancel{width:50px;background-color:red};
width: 100%;box-sizing:border-box;height:100vh;
background-color: #cc9139;
display: flex;flex-direction:column;
align-items: center;
input{width:260px;height:50px;background-color:#6B491A;margin-right:2vw;border:0;
    color:white;font-size:25px;border:0;border-radius:5px}
`
