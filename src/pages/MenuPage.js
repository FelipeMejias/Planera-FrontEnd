
import styled from 'styled-components'
import { useNavigate} from 'react-router-dom'

import { IconContext } from "react-icons";
import { useContext, useEffect, useState } from 'react';
import TokenContext from "../contexts/TokenContext.js";
import UserContext from "../contexts/UserContext.js";
import { aceptInvitation, getEnvitation, getGroups, postGroup, rejectInvitation } from '../api.js';
import Modal from '../components/Modal.js';
import { AiFillFolderAdd, AiOutlineBackward, AiOutlineClear, AiOutlineClose, AiOutlineCloseCircle, AiOutlineFolderAdd, AiOutlineGroup, AiOutlineMore, AiOutlinePlus, AiOutlinePlusSquare, AiOutlineRollback, AiOutlineUngroup, AiOutlineUsergroupAdd, AiTwotoneFolderAdd } from 'react-icons/ai';

export default function MenuPage(){
  const navigate=useNavigate()
  const {setToken,token}=useContext(TokenContext)
  const {setUser}=useContext(UserContext)
  const [name,setName]=useState('')
  const [creatingGroup,setCreatingGroup]=useState(false)
  const [error,setError]=useState('')
  const [groups,setGroups]=useState([])
  const [invitation,setInvitation]=useState(<></>)
  function logOut(){
    navigate('/signin')
        localStorage.removeItem("user")
        localStorage.removeItem("token")
        setUser(null)
        setToken(null)
  }
  function saveGroup(event){
      event.preventDefault()
      if(!token)return navigate('/signin')
      if(!name)return setError('Escolha o nome do grupo')
      const groupData={name}
      const promise=postGroup(groupData,token)
      promise.then(()=>{
          setCreatingGroup(false)
          getMyGroups()
      })
      promise.catch(e=>{if(e.message){setError(e.message)}else{console.log(e)}})
  }
  function er(e){console.log(e)}
  function getMyGroups(){
    getGroups(token).catch(e=>console.log(e)).then((res)=>{
      setGroups(res.data)
      findEnvitations()
  })}
  function respondInvitation(id,response){
    const promise=response?aceptInvitation(id,token):rejectInvitation(id,token)
    promise.then(()=>{
      setInvitation(<></>)
      getMyGroups()
    })
    promise.catch(e=>console.log(e))
  }
  function findEnvitations(){
    const promise=getEnvitation(token)
    promise.then(res=>{
      const {invitationId,groupName}=res.data
      if(invitationId){
        setInvitation(<Modal buttons={true}
           functionNo={()=>respondInvitation(invitationId,false)} 
           functionYes={()=>respondInvitation(invitationId,true)} 
           text={`Você foi convidado ao grupo: ${groupName}. Aceita participar?`}/>
        )
    }})
    promise.catch(e=>console.log(e))
  }
  useEffect(getMyGroups,[])
    return(
      <Content>
      {invitation}
      {!creatingGroup?
        <Menu>
          <h6>PlanerA</h6>
          <Button color='#6B491A' onClick={()=>navigate('/')}><h1>Agenda</h1></Button>
          <span><h5>grupos</h5><ButtonIcon color='#6B491A' onClick={()=>setCreatingGroup(true)}><AiOutlinePlus/></ButtonIcon></span>
            {groups.map((group)=>(
              <Button color={group.color} onClick={()=>navigate(`/group/${group.id}`)}><h1>{group.name}</h1></Button>
            ))}
          <Button className='logOut' color='brown' onClick={logOut} >Log out</Button>
        </Menu>:
        <CreateGroup>
          <div>
            <p>Novo grupo:</p>
            <input onChange={(e)=>setName(e.target.value)} placeholder='título' value={name} />
          </div>
          <span>
            <Button color='brown' className='cancel' onClick={()=>setCreatingGroup(false)}><AiOutlineClose/></Button>
            <Button color='#6B491A' onClick={saveGroup}>Salvar</Button>
          </span>
        </CreateGroup>
      }
        
      </Content>
    )
}
const Menu =styled.section`
display: flex;flex-direction:column;
align-items: center;
font-family: 'Amatic SC', cursive;
h6{margin:40px 0 40px 0;font-size:80px;}
h5{font-size:50px;}
span{margin:30px 0 30px 0;width:140px}
button{box-shadow: -2.5px 2.5px 2.5px rgba(0, 0, 0, 0.15)}
`
const Content=styled.div`
width: 100%;box-sizing:border-box;height:100vh;
background-color: #CC9139;
display: flex;flex-direction:column;
align-items: center;
.logOut{margin:100px 0 0 0}
span{display:flex;justify-content:space-between;align-items:center}
`
const ButtonIcon=styled.button`display:flex;justify-content:center;
width:35px;height:35px;border-radius:50%;position:relative;
    display:flex;justify-content:center;align-items:center;
background-color:#6B491A;
color:#CC9139;
font-size:46px;border:0vh solid black;
`
const Button=styled.button`margin:0 0 10px 0;
background-color:red;max-width:400px;
width:150px;height:50px;background-color:${props=>props.color};
  display:flex;justify-content:center;align-items:center;
  border:0;border-radius:5px;
  color:white;font-size:25px;
`
const CreateGroup=styled.section`
display:flex;flex-direction:column;align-items:center;
input{width:260px;height:50px;background-color:#6B491A;position:relative;
  margin-top:85px;padding:0 0 0 5px ;box-sizing:border-box;
  color:white;font-size:25px;border:0;border-radius:5px}
p{font-size:23px;position:absolute;color:#6B491A;margin-top: 50px ;}
.cancel{width:50px;}
span{width:260px;margin:35px 0 0 0;}
`