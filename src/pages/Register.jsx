import React from 'react'
import styled from 'styled-components';
import { mobile } from '../responsive';

const Container = styled.div`
    width: 100vw;
    height: 100vh;
    background: linear-gradient(
        rgba(94, 94, 94, 0.5),
        rgba(94, 94, 94, 0.5)),
    url("https://images.unsplash.com/photo-1561365452-adb940139ffa?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1156&q=80") center;
    background-repeat:no-repeat ;
    background-size: cover;
    background-position: center;

    display: flex;
    align-items: center;
    justify-content: center;
`;

const Wrapper = styled.div`
    width: 40%;
    padding: 20px;
    background-color: white;
    ${mobile({width: "75%"})}
`;

const Form = styled.form`
    display: flex;
    flex-wrap: wrap;
`;
const Title = styled.h1`
    font-size: 24px;
    font-weight: 300;
`;

const Input = styled.input`
    flex: 1;
    min-width:40% ;
    margin: 20px 10px 0px 0px;
    padding: 10px;
`;
const Agreement = styled.span`
    font-size: 12px;
    margin: 20px 0px;
`;

const Button = styled.button`
    width: 40%;
    border: none;
    padding: 15px 20px;
    background-color: teal;
    color: white;
    cursor: pointer;
`;

const Register = () => {

    const handleRegister = async (e)=>{
        e.preventDefault();
        const username = document.getElementById("username").value;
        const password = document.getElementById("password").value;
        const email = document.getElementById("email").value;
        const confirmPassword = document.getElementById("confirm_password").value;

        const response = await fetch("http://localhost:5000/api/auth/register",{
            method:"POST",
            headers: {
                "Content-Type": "application/json",
            },
            body:JSON.stringify({
                username : username,
                password : password,
                email : email,
            }),
        });
        const body = await response.json();
        console.log(body);
    }

  return (
    <Container>
      <Wrapper>
        <Title>CREATE AN ACCOUNT</Title>
        <Form>
            <Input placeholder="First Name" id="fname" />
            <Input placeholder="Last Name" id="lname"/>
            <Input placeholder="Username" id="username"/>
            <Input placeholder="Email" id="email"/>
            <Input placeholder="Password" id="password"/>
            <Input placeholder="Confirm Password" id="confirm_password"/>
            <Agreement>
                By creating an account, I consent to the processing of my personal
                data in accordance with the <p>PRIVACY POLICY.</p>
            </Agreement>
            <Button onClick={handleRegister}>CREATE</Button>
        </Form>
      </Wrapper>
    </Container>
  )
}

export default Register;
