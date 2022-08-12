import {useState,useEffect} from 'react'
import styled from 'styled-components'
import { useNavigate } from 'react-router-dom'
import { useContext } from 'react';
import TokenContext from "../contexts/TokenContext.js";
import UserContext from "../contexts/UserContext.js";
import { signIn } from '../api.js';


export default function EntryPage(){
    const { setToken } = useContext(TokenContext);
    const { user,setUser } = useContext(UserContext);
    const navigate=useNavigate()
    const [name,setName]=useState('')
    const [password,setPassword]=useState('')
    const [errorMsg,setErrorMsg]=useState('')
    function logIn(event){
        event.preventDefault()
        if(!name||!password){return setErrorMsg('preencha seu nome e senha')}
        const formData={name,password}
        signIn(formData)
        .then(res=>{
            const {token,user}=res.data
            setToken(token)
            setUser(user)
            localStorage.setItem("token", JSON.stringify(token))
            localStorage.setItem("user", JSON.stringify(user))
            navigate('/menu')
        })
        .catch(err=>{
            if(err.response.status===401){setErrorMsg('Nome ou senha incorretos.')}
        })
    }
    
    useEffect(()=>{
        if(user)setName(user.name)
    },[user])
    return(
        <Tela>
          <h6>PlanerA</h6>
            <form onSubmit={logIn}>
              <input value={name} onChange={e=>setName(e.target.value)}  placeholder='nome...'></input>
              <input type='password' value={password} onChange={e=>setPassword(e.target.value)}  placeholder='senha...'></input>
              <button type='submit'>Entrar</button>
              <Alert>{errorMsg}</Alert>
            </form>
            <Button onClick={()=>navigate('/signup')}>
              Criar conta
            </Button>
            <Button onClick={()=>navigate('/menu')}>
              Visitar site
            </Button>
        </Tela>
    )
}

const Alert=styled.p`
position:absolute;top:20px;left:0;font-size:20;color:blue;
`
const Tela=styled.div`
h6{font-family: 'Amatic SC', cursive;margin:20px 0 0 0;font-size:80px;}

width: 100%;box-sizing:border-box;height:100vh;
background-color: #CC9139;
display: flex;flex-direction:column;
align-items: center;
button{width:42vw;height:70px;background-color:#6B491A;margin-top:40px;
  display:flex;flex-direction:column;justify-content:space-evenly;align-items:center;
  border:0;border-radius:10px;
  color:white;font-size:25px;cursor:pointer
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
background-color:#CC9139;width:250px;height:50px;margin-top:40px;
display:flex;flex-direction:column;justify-content:space-evenly;align-items:center;
border:0;border-radius:10px;
color:#6B491A;font-size:25px;
`