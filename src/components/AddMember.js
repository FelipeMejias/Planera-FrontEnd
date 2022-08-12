import { useState,useEffect, useContext } from "react"
import { AiOutlineClose } from "react-icons/ai"
import styled from 'styled-components'
import { getPendent, sendEnvitation } from "../utils/api"
import TokenContext from "../contexts/TokenContext"
import UserContext from "../contexts/UserContext"

export default function AddMember({setFace,groupId}){
    const {token} = useContext(TokenContext)
    const [guest,setGuest]=useState('')
    const [pendents,setPendents]=useState([])
    const [error,setError]=useState('')
    function addMember(){
        const promise=sendEnvitation({guest},parseInt(groupId),token)
        promise.then(()=>{
            setFace('main')
            setError('convite enviado!')
        })
        promise.catch(e=>{if(e.message){setError(e.message)}else{console.log(e)}})
    }
    function getPendentEnvitations(){
        const promise=getPendent(groupId,token)
        promise.then(res=>{
            console.log(res.data)
            setPendents(res.data)
        })
    }
    useEffect(getPendentEnvitations,[])
    return(
        <Content>
            <div>
                <h1>Novo membro:</h1>
                <h2>Convites pendentes:</h2>
                <input onChange={(e)=>setGuest(e.target.value)} value={guest} placeholder='convidado...'/>
            </div>
            <span>
                <Button className='cancel' onClick={()=>setFace('main')}><AiOutlineClose/></Button>
                <Button onClick={addMember} >Convidar</Button>
            </span>
            <MemberBox>
                {pendents.map(pendent=>(
                    <Member>
                        <p>{pendent}</p>
                    </Member>
                ))}
            </MemberBox>
        </Content>
    )
}
const MemberBox=styled.div`margin-top:56px;
display:flex;flex-direction:column;align-items:center;
width:260px;height:320px;background-color:#c18736;border-radius:5px;
padding:10px 0 10px 0;

`
const Member=styled.div`
background-color:#B1CACE;padding:5px;
display:flex;align-items:center;width:230px;;
font-size:25px;color:black;border-radius:5px;
margin:5px 0 5px 0;border:0
`

const Content=styled.div`
display:flex;flex-direction:column;align-items:center;
input{width:260px;height:50px;background-color:#6B491A;position:relative;
  margin-top:85px;padding:0 0 0 5px ;box-sizing:border-box;
  color:white;font-size:25px;border:0;border-radius:5px}
h1{font-size:23px;position:absolute;color:#6B491A;margin-top: 50px ;}
h2{font-size:23px;position:absolute;color:#6B491A;margin-top: 250px ;}
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