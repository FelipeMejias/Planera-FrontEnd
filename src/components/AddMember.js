import { useState,useEffect, useContext } from "react"
import { AiOutlineClose } from "react-icons/ai"
import styled from 'styled-components'
import { sendEnvitation } from "../api"
import TokenContext from "../contexts/TokenContext"
import UserContext from "../contexts/UserContext"

export default function AddMember({setFace,groupId}){
    const {token} = useContext(TokenContext)
    const [guest,setGuest]=useState('')
    const [error,setError]=useState('')
    function addMember(){
        const promise=sendEnvitation({guest},parseInt(groupId),token)
        promise.then(()=>{
            setFace('main')
            setError('convite enviado!')
        })
        promise.catch(e=>{if(e.message){setError(e.message)}else{console.log(e)}})
    }
    
    return(
        <Content>
            <div>
                <p>Novo membro:</p>
                <input onChange={(e)=>setGuest(e.target.value)} value={guest} placeholder='convidado...'/>
            </div>
            <span>
                <Button className='cancel' onClick={()=>setFace('main')}><AiOutlineClose/></Button>
                <Button onClick={addMember} >Convidar</Button>
            </span>
        </Content>
    )
}

const Content=styled.div`
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