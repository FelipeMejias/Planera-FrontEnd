import styled from 'styled-components'
import { useState } from 'react'
import { useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import TokenContext from '../contexts/TokenContext';
import { postHabit, putHabit } from '../api';
import PlanerContext from '../contexts/PlanerContext';
	
    
export default function CreateHabit({create,details}){
    const navigate=useNavigate()
    const {token} = useContext(TokenContext)
    const {setPopUp,findHabits}=useContext(PlanerContext)
    const [title,setTitle]=useState(create?'':details.title)
    const [begin,setBegin]=useState(create?'':details.begin.replace(':','.'))
    const [end,setEnd]=useState(create?'':details.end.replace(':','.'))
    const [day,setDay]=useState(create?null:details.day)
    const [errorMsg,setErrorMsg]=useState('')
    function checkPattern(string){
        const c=string.length
        if(c===1||c===2||c===4||c===5)return false
        return true
    }
    function saveHabit(event){
        event.preventDefault()
        if(!token)return navigate('/signin')
        if(checkPattern(begin))return setErrorMsg('Escreva a hora de início corretamente')
        if(checkPattern(end))return setErrorMsg('Escreva a hora do final corretamente')
        if(!day)return setErrorMsg('Escolha ao menos um dia da semana')
        if(!title)return setErrorMsg('Escolha um título')
        const habitData={title,begin,end,day}

        const promise=create?postHabit(habitData,token):putHabit(details.id,habitData,token)
        promise.then(()=>{
            setPopUp('')
            findHabits()
        })
        promise.catch((e)=>{console.log(e)})
    }
    
    const daysNames=['DOM','SEG','TER','QUA','QUI','SEX','SAB']
    return(
        <Content>
            <ul>
                {daysNames.map((name,index)=>(
                    <DayButton onClick={()=>setDay(index)} selected={day===index}>{name}</DayButton>
                ))}
            </ul>
            
            <Form>
                <div>
                    <input type='number' onChange={(e)=>setBegin(e.target.value)} placeholder='horário início' value={begin}></input>
                    <input type='number' onChange={(e)=>setEnd(e.target.value)} placeholder='horário final' value={end}></input>            
                </div>  
                <div>
                    <input onChange={(e)=>setTitle(e.target.value)} placeholder='título' value={title}></input>
                    <span>
                        <button className='canc' onClick={()=>setPopUp(create?'':'detailing')}>x</button>
                        <button onClick={saveHabit}>Salvar</button>
                    </span>
                </div>
            </Form>
        </Content>
    )
}
const DayButton=styled.button`border-radius:50%;font-size:13px;
height:40px;color:white;width:40px;border:0;
background-color:${props=>props.selected?'blue':'gray'};margin-right:3px;margin-bottom:3px;
`
const Form=styled.div`
display:flex;flex-direction:row;justify-content:space-evenly;
button{max-width:100px;width:24vw;border-radius:10px;font-size:15px;height:35px;margin:10px 0 10px 0;
    background-color:blue;color:white;border:0;margin-right:5px}
    .canc{background-color:brown;width:35px;margin-right:25px}
    input{height:28px;width:92%;font-size:18px;margin:10px 0 10px 0;padding-left:6px}
    div{display:flex;flex-direction:column}
    span{display:flex}
`
const Content=styled.div`min-height:190px;
position:fixed;z-index:10;width:90vw;height:30vh;top:8vh;left:20vw;
max-width:500px;
display:flex;padding:10px;box-sizing:border-box;flex-direction:column;
    background-color: white;
    justify-content:space-evenly;
    border-radius: 1.5vh;
    border:0.3vh solid black;
    ul{
        display:flex;justify-content:space-between;align-items:center;
    }.sabdom{width:38%}
    @media(max-width:900px){
        position:fixed;top:18vh;z-index:6;width:90vw;left:5vw;
    }
    button{cursor:pointer}
`

    
   
