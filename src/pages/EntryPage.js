import {useState,useEffect} from 'react'
import styled from 'styled-components'
import { useNavigate } from 'react-router-dom'
import { useContext } from 'react';
import TokenContext from "../contexts/TokenContext.js";
import UserContext from "../contexts/UserContext.js";
import { signIn } from '../utils/api.js';
import Modal from '../components/Modal.js';


export default function EntryPage(){
    const { setToken } = useContext(TokenContext);
    const { user,setUser } = useContext(UserContext);
    const navigate=useNavigate()
    const [name,setName]=useState('')
    const [password,setPassword]=useState('')
    const [error,setError]=useState('')
    function logIn(event){
        event.preventDefault()
        const formData={name,password}
        const promise=signIn(formData)
        promise.then(res=>{
            const {token,user}=res.data
            setToken(token)
            setUser(user)
            localStorage.setItem("token", JSON.stringify(token))
            localStorage.setItem("user", JSON.stringify(user))
            navigate('/menu')
        })
        promise.catch(e=>{
          console.log(e)
          if(e.response && e.response.data){
            return setError(e.response.data)
          }
          setError('Desculpe. Nosso servidor está fora do ar')
        })
    }
    
    useEffect(()=>{
        if(user)setName(user.name)
    },[user])
    return(
        <Content>
          {error?<Modal buttons={false} text={error} functionYes={()=>setError('')} />:<></>}
          <h6>PlanerA</h6>
            <form onSubmit={logIn}>
              <input value={name} onChange={e=>setName(e.target.value)}  placeholder='nome...'></input>
              <input type='password' value={password} onChange={e=>setPassword(e.target.value)}  placeholder='senha...'></input>
              <MainButton type='submit'>Entrar</MainButton>
            </form>
            <Button onClick={()=>navigate('/signup')}>
              Criar conta
            </Button>
            <Button onClick={()=>{setToken('visiting');navigate('/menu')}}>
              Visitar site
            </Button>
        </Content>
    )
}

const MainButton=styled.button`
width:42vw;height:70px;background-color:#6B491A;margin-top:40px;
  display:flex;flex-direction:column;justify-content:space-evenly;align-items:center;
  border:0;border-radius:10px;
  color:white;font-size:25px;max-width:280px;
`
const Content=styled.div`
h6{font-family: 'Amatic SC', cursive;margin:20px 0 0 0;font-size:80px;}

width: 100%;box-sizing:border-box;height:100vh;
background-color: #CC9139;
display: flex;flex-direction:column;
align-items: center;
button{cursor:pointer}

  input{padding-left:13px;width:100%;height:50px;background-color:#6B491A;margin-top:40px;
    color:white;font-size:25px;border:0;border-radius:5px}
  
  h1{color:white;font-size:25px}
  ion-icon{color:white;font-size:50px}
  form{width:80vw;display:flex;flex-direction:column;align-items:center;
  position:relative;
    max-width:500px
}
  
`
const Button=styled.button`
background-color:#CC9139;width:50vw;height:50px;margin-top:40px;
display:flex;flex-direction:column;justify-content:space-evenly;align-items:center;
border:0;border-radius:10px;
color:#6B491A;font-size:25px;
`