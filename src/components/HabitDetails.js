import styled from 'styled-components'
import {  useState } from 'react'
import { useContext } from 'react';


import {  AiOutlineClose,  AiOutlineDelete, AiOutlineEdit } from "react-icons/ai";
import { putHabit } from '../api'
import TokenContext from '../contexts/TokenContext'
import CreateHabit from './CreateHabit';
import PlanerContext from '../contexts/PlanerContext';
    
export default function HabitDetails({details,setDetails,findHabits}){
    const {id,title,begin,end,day,color}=details
    const {token} = useContext(TokenContext)
    const {setPopUp,popUp} = useContext(PlanerContext)
    const [coloring,setColoring]=useState(false)

    function changeColor(color){
        putHabit(id,{color},token).then(()=>{
            setDetails({...details,color})
        })
        setColoring(false)
    }
    const colorNames=['#f7a471','#e8d361','#67e57e','#719ef7','#d3a1e0']
    const dayNames=['DOM','SEG','TER','QUA','QUI','SEX','SAB']
    const colorList=<ul>{colorNames.map((color,index)=>(
        <ChoseColor onClick={()=>changeColor(color)} color={color} position={index*3}/>
    ))}</ul>

    
    return(
        <>
        {/*popUp==='deleting'?<ExclusaoEvento setDeleting={setDeleting} setDetails={setDetails} details={details} />:<></>*/}
        {popUp==='editing'?<CreateHabit create={false} details={details} findHabits={findHabits} />:<></>}
        <Content>
            <span>
                <ul>
                    <div className='corpessoa'>
                        {coloring?<ColorBall onClick={()=>{setColoring(true)}} color={color} />:colorList}
                        <h1>{title}</h1>
                    </div>
                    <Button color='white' onClick={()=>setPopUp('')}><AiOutlineClose/></Button>
                </ul>
                <div>
                    <p>{begin} ~ {end}</p>
                    <p>{dayNames[day]}</p>
                </div>
            </span>
            <span>
                <ul>
                    <Button color='red' onClick={()=>setPopUp('deleting')}><AiOutlineDelete/></Button>
                    <Button color='orange' onClick={()=>setPopUp('editing')}><AiOutlineEdit/></Button>
                </ul>
            </span>
        </Content>
        </>
    )
}
const Content=styled.div`.corpessoa{display:flex}
display:flex;padding:10px;box-sizing:border-box;
width:90vw;position:fixed;max-width:500px;
height:30vh;z-index:6;top:8vh;left:20vw;
    background-color: white;
    flex-direction:column;justify-content:space-between;
    border-radius: 1.5vh;
    border:0.3vh solid black;
h1{font-size:25px;font-weight:900;margin-bottom:6px;}
h2{font-size:25px}
span{width:100%;display:flex;flex-direction:column;justify-content:space-between}
p{font-size:22px;margin:5px 0  0;
strong{font-weight:700;font-size:20px;}}
input{height:28px;width:97%;font-size:20px;margin-top:1vh;margin-bottom:1vh;}
.orgDetalhesEvento{display:flex}
ul{display:flex;margin-top:1vh;align-items:center;width:100%;justify-content:space-between}
@media(max-width:900px){
    position:fixed;top:18vh;z-index:6;width:90vw;left:5vw;height:220px
}
`
const Button=styled.div`
button{height:40px;
    width:40px;border-radius:10px;
    ;background-color:white;
font-size:23px;border:0;
display:flex;align-items:center;
color:${props=>props.color};
}
`
const ColorBall=styled.div`width:22px;height:22px;border-radius:50%;
border:0.3vh solid black;margin-right:1vh;
background-color:${props=>props.color}
`
const ChoseColor=styled.div`width:22px;height:22px;border-radius:50%;
border:0.3vh solid black;margin-right:1vh;
background-color:${props=>props.color}
`
/*
function buscarIntegrantes(){
    const promessa=axios.post(`${link}/integrantes`,detalhes,h)
    promessa.then(res=>setIntegrantes(res.data))
}
function alterarTexto (){
    const promessa=axios.put(`${link}/quadro/${detalhes.id}`,{
        texto:input
    },h)
    promessa.then(()=>procurar())
}   
function renderScreen(){
        if(editando)return(<EdicaoEvento detalhes={detalhes} setEditando={setEditando} h={h} procurar={procurar} setDetalhes={setDetalhes} />)
        if(fliped)return(
            <Caixa>
                <ul >
                <div className='corpessoa'>
                        <BotaoFechar onClick={()=>setFliped(false)}><AiOutlineArrowLeft/></BotaoFechar>
                        <h1>{etiqueta}</h1>
                    </div>
                    <BotaoFechar onClick={()=>setDetalhes(false)}><AiOutlineClose/></BotaoFechar>
                </ul>
                <p><strong>criador:</strong> {detalhes.owner}</p>
                <div>
                <p><strong>integrantes:</strong> </p>
                <p>{integrantes}</p>
                </div>
                
            </Caixa>
        )

function renderEditButton(){
        if(owner || owner===null)return(<BotaoAlterar cor='blue'><button className='edi'  onClick={()=>{setFliped(true)}}><AiOutlineContacts/></button></BotaoAlterar>)
        if(!copyed)return(<BotaoAlterar cor='orange'><button className='edi'  onClick={()=>setEditando(true)}><AiOutlineEdit/></button></BotaoAlterar>)
        return(<></>)
        


         <span>
            
                {alterando?<input 
                value={input} onChange={(e)=>setInput(e.target.value)}/>:<p>{texto}</p>}
                <div className='orgDetalhesEvento'>
                {alterando?<BotaoAlterar cor='red'><button className='cancD' onClick={()=>{setAlterando(false);setInput(detalhes.texto)}}><AiOutlineClose/></button></BotaoAlterar>:<></>}
                {alterando?<BotaoAlterar cor='green'><button className='goodD' onClick={()=>{alterarTexto();setAlterando(false);setDetalhes({...detalhes,texto:input})}}><AiOutlineCheck/></button></BotaoAlterar>:<></>}
            </div>
                
            
                {!alterando&& !copyed &&!owner&&owner!==null? <BotaoAlterar cor='black'><button onClick={()=>setAlterando(true)}><AiOutlineEdit/></button></BotaoAlterar>:<></>}
                {<BotaoAlterar cor='#6b491a'><button onClick={()=>{navigate(`/eventos/${detalhes.id}`)}}><ion-icon name="people"></ion-icon></button></BotaoAlterar>
       }     </span>
*/