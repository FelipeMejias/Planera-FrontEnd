import {useState} from 'react'

import styled from 'styled-components'

import { useNavigate } from 'react-router-dom'
import { useContext } from 'react';
import { signUp } from '../api';
import UserContext from '../contexts/UserContext';

    
export default function Cadastro({setNomeCad,setH}){
    const {setUser} = useContext(UserContext)
    const [errorMsg,setErrorMsg]=useState('')
    const navigate=useNavigate()
    const [name,setName]=useState('')
    const [password,setPassword]=useState('')
    function register(event){
      event.preventDefault()
      if(!name||!password){return setErrorMsg('preencha seu nome e senha')}
      const formData={name,password}
      const promessa=signUp(formData)
      promessa.then(res=>{
        setUser({name})
        navigate('/signin')
      })
      promessa.catch(err=>{
        if(err.response.status===409){setErrorMsg('Esse nome já está em uso')}
    })
      
    }
    return(
        <Content>
            <form onSubmit={register}>
              <input value={name} onChange={e=>setName(e.target.value)}  placeholder='seu nome...'></input>
              <input  type='password' value={password} onChange={e=>setPassword(e.target.value)}  placeholder='sua senha...'></input>
              <button type='submit'>Cadastrar</button>
              <Alert>{errorMsg}</Alert>
            </form>
            <Button onClick={()=>navigate('/signin')}>
              Voltar ao login
            </Button>
            <Button onClick={()=>navigate('/menu')}>
              Visitar site
            </Button>
              
        </Content>
    )
}
const Alert=styled.p`
position:absolute;top:100px;left:0;font-size:20;color:yellow;
`
const Content=styled.div`
width: 100%;box-sizing:border-box;height:100vh;
background-color: #CC9139;
display: flex;flex-direction:column;
align-items: center;
button{width:42vw;height:70px;background-color:#6B491A;margin-top:40px;
  display:flex;flex-direction:column;justify-content:space-evenly;align-items:center;
  border:0;border-radius:10px;
  color:white;font-size:25px;
}
input{padding-left:13px;width:100%;height:50px;background-color:#6B491A;margin-top:40px;
  color:white;font-size:25px;border:0;border-radius:5px}

  h1{color:white;font-size:25px}
  ion-icon{color:white;font-size:50px}
  form{width:80vw;display:flex;flex-direction:column;align-items:center;
    position:relative}
`
const Button=styled.div`
cursor:pointer;
background-color:#CC9139;width:50vw;height:50px;margin-top:40px;
display:flex;flex-direction:column;justify-content:space-evenly;align-items:center;
border:0;border-radius:10px;
color:#6B491A;font-size:25px;
`