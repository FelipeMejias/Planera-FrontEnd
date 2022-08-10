import {useState,useEffect,useContext} from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import dayjs from 'dayjs'
import styled from 'styled-components'
import { AiFillContacts, AiFillSetting, AiOutlineCalendar, AiOutlineClose, AiOutlineContacts, AiOutlineMenu, AiOutlineUserAdd, AiTwotoneContacts } from "react-icons/ai";

import TokenContext from '../contexts/TokenContext'

import Board from '../components/Board'
import UserContext from '../contexts/UserContext';
import { getGroup, sendEnvitation } from '../api';
import GroupContext from '../contexts/GroupContext';
	
export default function GroupPage(){
    const {token} = useContext(TokenContext)
    const {groupId}=useParams()
    const {members,setMembers,setChosen,group,setGroup}=useContext(GroupContext)
    const navigate=useNavigate()
    const [guest,setGuest]=useState('')
    const [face,setFace]=useState('main')
    const [error,setError]=useState('')
    const [coloring,setColoring]=useState(false)
    function getMembers(){
        const promise=getGroup(parseInt(groupId),token)
        promise.then(res=>{
            const {group,participants}=res.data
            setGroup(group)
            setMembers(participants)
        })
        promise.catch((e)=>{
            console.log(e)
        })
    }
    function addMember(){
        const promise=sendEnvitation({guest},parseInt(groupId),token)
        promise.then(()=>{
            setFace('main')
        })
        promise.catch(e=>{if(e.message){setError(e.message)}else{console.log(e)}})
    }
    function choseMember(member){
        const {id}=member
        setChosen([id])
        navigate(`/group/${groupId}/board`)
    }
    const colorCodes=['#f7a471','#e8d361','#67e57e','#719ef7','#d3a1e0']
    const colorNames=['red','yellow','green','blue','purple']

    const colorList=<ul>{colorCodes.map((color,i)=>(
        <ChoseColor onClick={()=>changeColor(colorNames[i])} color={color} position={i*3}/>
    ))}</ul>

    function changeColor(color){
        /*const promise=putHabit(id,{color},token)
        promise.then(()=>{
            setGroup({...details,color})
            setColoring(false)
        })
        promise.catch((e)=>{console.log(e)})*/
    }
    useEffect(getMembers,[])
    return(
        <Content>
            {face==='main'?
                <GroupMenu>
                    <Header>
                        <span>
                            <ButtonIcon onClick={()=>navigate('/menu')}><AiOutlineMenu/></ButtonIcon>
                            <ButtonIcon onClick={()=>setFace('adding')}><AiOutlineUserAdd/></ButtonIcon>
                            <ButtonIcon onClick={()=>setFace('tagging')}><AiFillSetting /></ButtonIcon>
                        </span>
                    </Header>
                    <h1>{group.name}</h1>
                    {!coloring?<ColorBall onClick={()=>{setColoring(true)}} color={colorCodes[colorNames.indexOf(group.color)]} />:colorList}
                    {members.map((member,i)=>(
                        <Member onClick={()=>choseMember(member)}>
                            <AiOutlineCalendar />
                            <h1>{member.name}</h1>
                        </Member>
                    ))}
                    <Button onClick={()=>navigate(`/group/${groupId}/actions`)} >Selecionar</Button>
                </GroupMenu>
            :<></>}
            {face==='adding'?
                <AddMember>
                    <div>
                        <p>Novo membro:</p>
                        <input onChange={(e)=>setGuest(e.target.value)} value={guest} placeholder='convidado...'/>
                    </div>
                    <span>
                        <Button className='cancel' onClick={()=>setFace('main')}><AiOutlineClose/></Button>
                        <Button onClick={addMember} >Convidar</Button>
                    </span>
                </AddMember>
            :<></>}
            {face==='tagging'?
                <></>//######################
            :<></>}
        </Content>
    )
}
const Header=styled.section`
height:10vh;width:96vw;display:flex;flex-direction:row;margin:0 0 10px 0;
    span{display:flex;width:96vw;height:7vh;justify-content:space-between;align-items:center;}
`
const ButtonIcon=styled.button`display:flex;justify-content:center;align-items:center;
width:7vh;height:7vh;border-radius:10px;position:relative;
    display:flex;justify-content:center;align-items:center;
background-color:#cc9139;
color:#6b491a;
font-size:35px;border:0vh solid black;
h2{font-size:18px}
`
const AddMember=styled.section`
display:flex;flex-direction:column;align-items:center;
input{width:260px;height:50px;background-color:#6B491A;position:relative;
  margin-top:85px;padding:0 0 0 5px ;box-sizing:border-box;
  color:white;font-size:25px;border:0;border-radius:5px}
p{font-size:23px;position:absolute;color:#6B491A;margin-top: 50px ;}
.cancel{width:50px;background-color:brown}
span{width:260px;margin:35px 0 0 0;display:flex;justify-content:space-between;}
`
const Button=styled.button`margin:0 0 10px 0;
background-color:red;max-width:400px;
width:150px;height:50px;background-color:#6B491A;
  display:flex;justify-content:center;align-items:center;
  border:0;border-radius:5px;
  color:white;font-size:25px;
  `
const GroupMenu=styled.section`
display:flex;flex-direction:column;align-items:center;
h1{font-size:35px;margin:40px 0 20px 0;}
span{}
`
const Member=styled.div`
background-color:#b1cace;
display:flex;align-items:center;width:65%;
h1{font-size:25px;margin:0 0 0 7px;}
font-size:25px;
box-sizing:bordex-box;padding:5px;border-radius:5px;
margin:5px 0 5px 0
`

const Content=styled.div`

width: 100%;box-sizing:border-box;height:100vh;
background-color: #cc9139;
display: flex;flex-direction:column;
align-items: center;

`
const ColorBall=styled.div`width:22px;height:22px;border-radius:50%;
border:0.3vh solid black;margin-right:1vh;
background-color:${props=>props.color}
`
const ChoseColor=styled.div`width:22px;height:22px;border-radius:50%;
border:0.3vh solid black;margin-right:1vh;
background-color:${props=>props.color}
`

