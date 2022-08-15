import {useState,useEffect,useContext} from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import dayjs from 'dayjs'
import styled from 'styled-components'
import { AiFillContacts, AiFillHome, AiFillSetting, AiOutlineAim, AiOutlineArrowLeft, AiOutlineCalendar, AiOutlineClose, AiOutlineContacts, AiOutlineFileAdd, AiOutlineHome, AiOutlineMenu, AiOutlineMenuFold, AiOutlineMenuUnfold, AiOutlineOrderedList, AiOutlineTool, AiOutlineUnorderedList, AiOutlineUserAdd, AiOutlineUsergroupAdd, AiTwotoneContacts } from "react-icons/ai";

import TokenContext from '../contexts/TokenContext'

import Board from '../components/Board'
import UserContext from '../contexts/UserContext';
import { changeGroupColor, getGroup, sendEnvitation } from '../utils/api';
import GroupContext from '../contexts/GroupContext';
import ChooseAllows from '../components/ChoseAllows';
import AddMember from '../components/AddMember';
import CreateEvent from '../components/CreateEvent';
	
export default function GroupPage(){
    const {token} = useContext(TokenContext)
    const {groupId}=useParams()
    const {members,setMembers,setChosen,group,setGroup,chosen}=useContext(GroupContext)
    const navigate=useNavigate()
    const [face,setFace]=useState('main')
    const [coloring,setColoring]=useState(false)
    const allSelected=chosen.length===members.length
    const noChosen=chosen.length===0
    const colorCodes=['#fca50f','#f45ace','#53ceed']
    const colorNames=['orange','pink','aqua']

    function getMembers(){
        const promise=getGroup(parseInt(groupId),token)
        promise.then(res=>{
            const {group:newGroupInfos,participants}=res.data
            setGroup({...group,...newGroupInfos})
            setMembers(participants)
        })
        promise.catch((e)=>{
            console.log(e)
        })
    }

    function changeColor(color){
        const promise=changeGroupColor({color},groupId,token)
        promise.then(()=>{
            setGroup({...group,color})
            setColoring(false)
        })
        promise.catch((e)=>{console.log(e)})
    }
    function handleSelection(num){
        if(chosen.includes(num)){
            setChosen(chosen.filter(i=>i!==num))
        }else{setChosen([...chosen,num])}
    }
    function resetGroupInfos_NavigateMenu(){
        setMembers([]);setChosen([]);setGroup({})
        navigate('/menu')
    }

    const colorList=<ul>{colorCodes.map((color,i)=>(
        <ChoseColor onClick={()=>changeColor(colorNames[i])} color={color} position={i*3}/>
    ))}</ul>

    useEffect(getMembers,[])
    return(
        <Content>
            {face==='adding'?<AddMember setFace={setFace} groupId={groupId} />:<></>}
            {face==='allowing'?<ChooseAllows setFace={setFace} groupId={groupId} />:<></>}
            {face==='creating'?<CreateEvent setFace={setFace} groupId={groupId} />:<></>}
            {face==='main'?
                <GroupMenu>
                    <Header>
                        <span>
                            <ButtonIcon onClick={resetGroupInfos_NavigateMenu}><AiFillHome/></ButtonIcon>
                            <h1>{group.name}</h1>
                            
                            <ButtonIcon onClick={()=>setFace('allowing')}><AiFillSetting /></ButtonIcon>
                        </span>
                        {!coloring?<ColorBall onClick={()=>{setColoring(true)}} color={colorCodes[colorNames.indexOf(group.color)]} />:colorList}
                    </Header>
                    
                    <MemberBox>
                        <ToogleSelectAll onClick={()=>setChosen(allSelected?[]:members.map(p=>p.id))}>
                            {allSelected?'limpar seleções':'selecionar todos'}
                        </ToogleSelectAll>
                        {members.map((member,i)=>(
                            <Member selected={chosen.includes(member.id)}
                                onClick={()=>handleSelection(member.id)}>
                                <h1>{member.name}</h1>
                            </Member>
                        ))}
                    </MemberBox>
                    {noChosen?
                        <ActionButton onClick={()=>setFace('adding')} ><AiOutlineUsergroupAdd/></ActionButton>
                    :
                        <span>
                            <ActionButton onClick={()=>navigate(`/group/${groupId}/board`)} ><AiOutlineCalendar/></ActionButton>
                            <ActionButton onClick={()=>setFace('creating')} ><AiOutlineFileAdd/></ActionButton>
                        </span>
                    }
                    </GroupMenu>
            :<></>}
        </Content>
    )
}

const ActionButton=styled.button`
display:flex;justify-content:center;align-items:center;
width:100px;height:100px;border-radius:50%;margin:15px 20px 0 20px;
background-color:#cc9139;
color:#6b491a;
font-size:60px;border:0;
`
const ToogleSelectAll=styled.button`
position:absolute;top:-50px;
display:flex;justify-content:center;align-items:center;
width:200px;height:50px;border-radius:50%;
background-color:#cc9139;
color:#6b491a;
font-size:20px;border:0;
`

const MemberBox=styled.div`position:relative;
display:flex;flex-direction:column;align-items:center;
width:350px;height:370px;background-color:#c18736;border-radius:5px;padding:10px 0 10px 0;
`

const Header=styled.section`
h1{font-size:27px;color:#6b491a}
height:11vh;width:96vw;display:flex;flex-direction:column;align-items:center;
margin-bottom:80px;
    span{display:flex;width:96vw;
        height:7vh;justify-content:space-between;align-items:center;}
`
const ButtonIcon=styled.button`display:flex;justify-content:center;align-items:center;
width:7vh;height:7vh;border-radius:10px;position:relative;
    display:flex;justify-content:center;align-items:center;
background-color:#cc9139;
color:#6b491a;
font-size:35px;border:0vh solid black;
h2{font-size:18px}
`


const GroupMenu=styled.section`
display:flex;flex-direction:column;align-items:center;
ul{display:flex;}
span{display:flex;}
`
const Member=styled.button`
background-color:${props=>props.selected?'green':'#B1CACE'};
display:flex;align-items:center;width:230px;;
h1{font-size:25px;margin:0 0 0 7px;}
font-size:25px;color:${props=>props.selected?'white':'black'};
box-sizing:bordex-box;padding:5px;border-radius:5px;
margin:5px 0 5px 0;border:0
`

const Content=styled.div`
button{cursor:pointer}
width: 100%;box-sizing:border-box;height:100vh;
background-color: #cc9139;
display: flex;flex-direction:column;
align-items: center;

`
const ColorBall=styled.button`width:22px;height:22px;border-radius:50%;
border:0.3vh solid black;margin-right:1vh;
background-color:${props=>props.color}
`
const ChoseColor=styled.button`width:22px;height:22px;border-radius:50%;
border:0.3vh solid black;margin-right:1vh;
background-color:${props=>props.color}
`

