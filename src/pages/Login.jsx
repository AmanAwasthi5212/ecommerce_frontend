import React, { useEffect, useState } from 'react'
import styled from 'styled-components';
import { mobile } from '../responsive';
import { login } from '../redux/apiCalls';
import { useDispatch, useSelector } from 'react-redux';
import { Navigate, useNavigate } from 'react-router-dom';

const Container = styled.div`
    width: 100vw;
    height: 100vh;
    background: linear-gradient(
        rgba(94, 94, 94, 0.5),
        rgba(94, 94, 94, 0.5)),
    url("https://images.unsplash.com/photo-1523194258983-4ef0203f0c47?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1170&q=80") center;
    background-repeat:no-repeat ;
    background-size: cover;
    background-position: center;

    display: flex;
    align-items: center;
    justify-content: center;
`;
const Wrapper = styled.div`
    width: 25%;
    padding: 20px;
    background-color: white;
    ${mobile({width: "75%"})}
`;

const Form = styled.form`
    display: flex;
    flex-direction: column;
`;
const Title = styled.h1`
    font-size: 24px;
    font-weight: 300;
`;

const Input = styled.input`
    flex: 1;
    min-width:40% ;
    margin: 10px 0px;
    padding: 10px;
`;

const Button = styled.button`
    width: 40%;
    border: none;
    padding: 15px 20px;
    background-color: teal;
    color: white;
    cursor: pointer;
    margin-bottom: 10px;
    &:disabled {
        color: green;
        cursor: not-allowed;
    }
`;

const Link = styled.a`
    margin: 5px 0px;
    font-size: 12px;
    text-decoration: underline;
    cursor: pointer;
`;

const Error = styled.span`
    color: red;
`

const Login = () => {
    const navigate = useNavigate();
    const [username,setUsername] = useState("");
    const [password,setPassword] = useState("");
    const dispatch = useDispatch();
    const {isFetching, error,currentUser} = useSelector((state) => state.user);
    const [user,setUser] = useState(null);

    const handleClick =async (e) =>{
        e.preventDefault();
        // login(dispatch, { username, password });

        const response = await fetch("http://localhost:5000/api/auth/login",{
            method:"POST",
            headers: {
                "Content-Type": "application/json",
            },
            body:JSON.stringify({
                username,
                password
            }),
        });

        const body = await response.json();
        if(body !="Wrong Credentials!"){
            localStorage.setItem('user',JSON.stringify(body));
            setUser(body);
            console.log(body);
            navigate("/");
        }

    };

    useEffect(()=>{
        const user =JSON.parse(localStorage.getItem('user'));
        if(user) navigate("/");
    },[]);

  return (
    <Container>
      <Wrapper>
        <Title>SIGN IN</Title>
        <Form>
            <Input placeholder="Username" onChange={(e) => setUsername(e.target.value)}/>
            <Input placeholder="Password"
            type='password'
            onChange={(e) => setPassword(e.target.value)}/>
            <Button onClick={handleClick } disabled={isFetching} >LOGIN</Button>
            {error && <Error>Something went wrong....</Error>}
            <Link>Forgot Password ?</Link>
            <Link>Create Account</Link>
        </Form>
      </Wrapper>
    </Container>

  )
}

export default Login;
