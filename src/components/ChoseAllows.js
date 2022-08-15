import { useState,useEffect, useContext } from "react"
import { AiFillDelete, AiFillEdit, AiFillEye, AiOutlineArrowLeft, AiOutlineClose, AiOutlineCloseSquare, AiOutlineDelete, AiOutlineDeleteColumn, AiOutlineEye, AiOutlineEyeInvisible, AiOutlineLogout, AiOutlineUngroup, AiOutlineUsergroupAdd, AiOutlineUsergroupDelete, AiTwotoneEdit } from "react-icons/ai"
import { useNavigate } from "react-router-dom"
import styled from 'styled-components'
import { exitGroup, findAllows, getEvents, getHabits, postAllow, rejectInvitation } from "../utils/api"
import GroupContext from "../contexts/GroupContext"
import TokenContext from "../contexts/TokenContext"
import Modal from "./Modal"

export default function ChooseAllows({setFace,groupId}){
    const navigate=useNavigate()
    const {token} = useContext(TokenContext)
    const {group}=useContext(GroupContext)
    const [allows,setAllows]=useState([])
    const [tag,setTag]=useState('')
    const [tagging,setTagging]=useState('')
    const [myColors,setMyColors]=useState([])
    const colorCodes=['#f7a471','#e8d361','#67e57e','#719ef7','#d3a1e0','#fca50f','#f45ace','#53ceed']
    const colorNames=['red','yellow','green','blue','purple','orange','pink','aqua']
    const [leavingGroup,setLeavingGroup]=useState(<></>)
    function buildMyColors(){
        const promise1=getHabits(token)
        promise1.then(res1=>{
            const promise2=getEvents(token)
            promise2.then(res2=>{
                const habits=[...res1.data,...res2.data]
                const colors=[]
                for (let item of habits)if(!colors.includes(item.color))colors.push(item.color)
                setMyColors(colors)
            })
            promise2.catch((e)=>{console.log(e)})
        })
        promise1.catch((e)=>{console.log(e)})
    }
    function getAllows(){
        const promise=findAllows(groupId,token)
        promise.then(res=>{
            setAllows(res.data)
            buildMyColors()
        })
    }
    function changeAllow(color){
        const promise=postAllow({color},groupId,token)
        promise.then(getAllows)
    }
    function changeTag(){
        const changeData={
            color:tagging,tag
        }
        const promise=postAllow(changeData,groupId,token)
        promise.then(()=>{
            setTagging('');setTag('')
            getAllows()
        })
    }
    function leaveGroup(){
        const promise=exitGroup(groupId,token)
        promise.then(()=>{
            setFace('main')
            setLeavingGroup(<></>)
            navigate('/menu')
        })
    }
    function prepareModal(){
        setLeavingGroup(<Modal buttons={true}
            functionNo={()=>setLeavingGroup(<></>)} 
            functionYes={()=>leaveGroup()} 
            text={`Você deseja deixar o grupo: ${group.name} ?`}/>
         )
    }
    useEffect(getAllows,[])
    return(
        <Content>
            {leavingGroup}
            {!tagging?
            <>
                <Header>
                    <ButtonIcon onClick={()=>setFace('main')}><AiOutlineArrowLeft /></ButtonIcon>
                    <h1>configurações em {group.name}</h1>
                </Header>
                    {myColors.map((color,i)=>{
                        let colorAllow=false
                        for (let allow of allows)if(allow.color===color)colorAllow=allow
                        return (
                            <ColorAllow>
                                {colorAllow?<ButtonIcon></ButtonIcon>:<></>}
                                <ColorSquare color={colorCodes[colorNames.indexOf(color)]} onClick={()=>changeAllow(color)}>
                                {colorAllow?
                                    <>
                                        <AiFillEye/>
                                        <h1>{colorAllow.tag||<small>{'(nome do evento)'}</small>}</h1>
                                    </>
                                    :<AiOutlineEyeInvisible/>
                                }
                                </ColorSquare>
                                {colorAllow?<ButtonIcon onClick={()=>setTagging(color)}><AiFillEdit/></ButtonIcon>:<></>}
                            </ColorAllow>
                    )})}
                <ActionButton onClick={prepareModal} ><AiOutlineCloseSquare/></ActionButton>
            </>:
            <ChoseTag>
                <div>
                <p>Etiqueta dos eventos de cor</p>
                <div>
                    <ColorBall color={colorCodes[colorNames.indexOf(tagging)]} /><h5>no grupo <strong>{group.name}</strong> :</h5>
                </div>
                <input onChange={(e)=>setTag(e.target.value)} value={tag} placeholder='etiqueta...'/>
            </div>
            <span>
                <Button className='cancel' onClick={()=>{setTagging('');setTag('')}}><AiOutlineClose/></Button>
                <Button onClick={changeTag} >Definir</Button>
            </span>
            </ChoseTag>
            }
        </Content>
    )
}

const ActionButton=styled.button`
position:absolute;bottom:30px;
display:flex;justify-content:center;align-items:center;
width:100px;height:100px;border-radius:50%;
background-color:#cc9139;
color:#6b491a;
font-size:60px;border:0;
`
const Content=styled.div`
display:flex;align-items:center;
    flex-direction:column;
    button{cursor:pointer;}
`
const ColorBall=styled.div`width:22px;height:22px;border-radius:50%;
border:0.3vh solid black;margin-right:1vh;
background-color:${props=>props.color};
position:absolute;margin-top: 50px ;
`
const ColorAllow=styled.div`
    display:flex;align-items:center;
    margin-top:20px;
    `
const ColorSquare=styled.button`border:0;
    width:130px;height:50px;background-color:${props=>props.color};border-radius:5px;
    display:flex;justify-content:center;align-items:center;flex-direction:column;
    small{font-size:13px;color:#4f4f4f}
    `

const Header=styled.section`
h1{font-size:27px;color:#6b491a}
    height:10vh;width:96vw;display:flex;align-items:center;
    `
    const ButtonIcon=styled.button`
    width:50px;height:50px;border-radius:10px;position:relative;
        display:flex;justify-content:center;align-items:center;
    background-color:#cc9139;
    color:#6b491a;
    font-size:28px;border:0vh solid black;
    h2{font-size:18px}
    `
    const ChoseTag=styled.div`
display:flex;flex-direction:column;align-items:center;
input{width:260px;height:50px;background-color:#6B491A;position:relative;
  margin-top:85px;padding:0 0 0 5px ;box-sizing:border-box;
  color:white;font-size:25px;border:0;border-radius:5px}
p{font-size:23px;position:absolute;color:#6B491A;margin-top: 20px ;}
h5{font-size:23px;position:absolute;color:#6B491A;margin: 50px 0 0 32px;}
strong{font-weight:600}
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