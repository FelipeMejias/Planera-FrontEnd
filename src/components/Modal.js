import styled from "styled-components";

export default function Modal({ buttons, functionNo, functionYes, text }) {
    console.log(text)
    return (
        <Overlay>
            {buttons?
            <Content>
                <h3>{text}</h3>
                <span>
                    <ButtonNo onClick={()=>functionNo()}><p>não</p></ButtonNo>
                    <ButtonYes onClick={()=>functionYes()}><p>sim</p></ButtonYes>
                </span>
            </Content>:
            <Content>
                <h3>{text}</h3>
                <ButtonYes onClick={()=>functionYes()}><p>OK</p></ButtonYes>
            </Content>
            }
        </Overlay>
    )
}

const Overlay = styled.div`
    display:flex;
    align-items:center;
    justify-content:center;
    position:fixed;z-index:14;
    top:0;left:0;
    width:100vw;
    height:100vh;
    background-color: rgba(255, 255, 255, 0.6);
`;

const Content = styled.div`
    display:flex;
    flex-direction:column;
    align-items:center;
    justify-content:space-evenly;
    width: 400px;
    height: 200px;
    background-color: #333333;
    border-radius: 50px;
    padding:0 20px 0 20px;
    span{width:300px;display:flex;flex-direction:row;};
    h3{color:white;
        font-family: 'Lato';
        font-style: normal;
        font-weight: 700;
        font-size: 23px;
        text-align: center;
        position:block;
    }
    p{
        font-family: 'Lato';
        font-style: normal;
        font-weight: 700;
        font-size: 18px;
        line-height: 22px;
    }
    button{cursor:pointer}
`;

const ButtonNo = styled.button`
    color:#1877F2;
    background-color: #FFFFFF;
    width: 134px;
    height: 37px;
    border-radius: 5px;
    border:0;
    margin-right:20px;
`;

const ButtonYes = styled.button`
    color:#FFFFFF;
    background-color:#1877F2;
    width: 134px;
    height: 37px;
    border-radius: 5px;
    border:0;
`;