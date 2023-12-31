import { Badge } from '@material-ui/core';
import { Search, ShoppingCartOutlined } from '@material-ui/icons';
import React from 'react'
import styled from 'styled-components';
import {mobile} from "../responsive";
import {useSelector} from "react-redux";
import { Link, useNavigate } from 'react-router-dom';
import { useState } from 'react';
import { useEffect } from 'react';
import { useRef } from 'react';

const Container = styled.div`
    height: 60px;
    margin-bottom: 3em;
    ${mobile({height: "50px"})}
`;

const Wrapper = styled.div`
    padding: 10px 20px;
    display: flex;
    justify-content: space-between;
    align-items: center;
    ${mobile({padding: "10px 0px"})}
`;

const Left = styled.div`
    flex:1;
    display:flex;
    align-items: center;
`;

const Language = styled.span`
    font-size:14px;
    cursor: pointer;
    ${mobile({display: "none"})}
`;

const SearchContainer = styled.div`
    border: 0.5px solid lightgray;
    display: flex;
    align-items: center;
    margin-left: 25px;
    padding : 5px;
`;

const Input = styled.input`
    border: none;
    ${mobile({width: "50px"})}
`;

const Center = styled.div`
    flex:1;
    text-align: center;
    font-family: cinzel,Arial, Helvetica, sans-serif;
    color: teal;
    font-size: 1.25rem;
`;

const Logo = styled.h1`
    font-weight: bold;
    ${mobile({fontSize: "24px"})}
    color: teal;
`;

const Right = styled.div`
    flex:1;
    display:flex;
    align-items: center;
    justify-content: flex-end;
    ${mobile({flex: 2, justifyContent: "center"})}
` ;

const MenuItem = styled.div`
    font-size: 14px;
    cursor: pointer;
    margin-right: 25px;
    ${mobile({fontSize: "12px",marginLeft: "10px"})}
`;

const Navbar = () => {
    const quantity = useSelector(state=>state.cart.quantity);
    const navigate = useNavigate();
    let user = JSON.parse(localStorage.getItem('user-info'));


    const {isFetching, error,currentUser} = useSelector((state) => state.user);
    const [curUser,setCurUser] = useState(null);
    const ref = useRef();
    ref.curUser = curUser;

    useEffect(()=>{
        const user = JSON.parse(localStorage.getItem('user'));
        setCurUser(user);
    },[]);

    const handleLogOut = ()=>{
        localStorage.removeItem('user');
        setCurUser(null);
        navigate("/");
    }

    const handleUserAuthButtonDisplay = ()=>{
        if(!ref.curUser) {
            return (
                <>
                    <Link to="/register"><MenuItem>REGISTER</MenuItem></Link>
                    <Link to="/login"><MenuItem>LOGIN</MenuItem></Link>
                </>
            )
        }
        else {
            return <MenuItem onClick={handleLogOut}>LOGOUT</MenuItem>
        }
    }

  return (
    <Container>
     <Wrapper>
        <Left> 
            <Language>EN</Language>
            <SearchContainer>
                <Input placeholder="Search"/>
                <Search style = {{color:"gray",fontSize:16}}/>
            </SearchContainer>
        </Left>
        <Center>
            <Link to="/"><Logo>EasyShop</Logo></Link>
            </Center>
        <Right>
            {handleUserAuthButtonDisplay()}
            <Link to="/cart">
                <MenuItem>
                <Badge badgeContent={quantity} color="primary">
                <ShoppingCartOutlined />
                </Badge>
                </MenuItem>
            </Link>
        </Right>
    </Wrapper>
    </Container>
  );
};

export default Navbar;
