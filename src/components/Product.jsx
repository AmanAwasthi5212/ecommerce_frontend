import { FavoriteBorderOutlined, SearchOutlined, ShoppingCartOutlined } from '@material-ui/icons';
import React from 'react'
import { Link } from 'react-router-dom';
import styled from 'styled-components';
import { useSelector } from 'react-redux'
import { useRef } from 'react';
import { useEffect } from 'react';
import { useState } from 'react';

const Info = styled.div`
    opacity: 0;
    width: 100%;
    height: 100%;
    position: absolute;
    top: 0;
    left: 0;
    background: rgba(0,0,0,0.2);
    z-index: 3;
    display: flex;
    align-items: center;
    justify-content: center;
    transition: all 0.5 ease;
    cursor: pointer;
`;

const Container = styled.div`
    flex: 1;
    margin: 5px;
    min-width:280px;
    max-width:280px;
    min-height: 280px;
    height: 350px;
    display: flex;
    align-items: flex-start;
    justify-content: center;
    background-color: #f5fbfd;
    position: relative;

    &:hover ${Info}{
        opacity: 1;
    }
`;

const Circle = styled.div`
    width: 200px;
    height: 200px;
    border-radius: 50%;
    background-color: white;
    position: absolute;

`;

const Image = styled.img`
    height: 75%;
    width: 100%;
    object-fit: fill;
    z-index: 2;
`;

const Icon = styled.div`
    width: 40px;
    height: 40px;
    border-radius: 50%;
    background-color: white;
    display: flex;
    align-items: center;
    justify-content: center;
    margin: 10px;
    transition:all 0.5s ease;

    &:hover {
        background-color: #e9f5f5;
        transform: scale(1.1);
    }
`;

const Product = ({item}) => {

    const {isFetching, error,currentUser} = useSelector((state) => state.user);
    const [user,setUser] = useState(null);
    const ref = useRef();
    ref.user = user;

    useEffect(()=>{
        const curUser = JSON.parse(localStorage.getItem('user'));
        setUser(curUser);
    },[]);

    const handleAddToCart = async()=>{
        await fetch("http://localhost:5000/api/carts/addToCart",{
            method:"POST",
            headers: {
                "Content-Type": "application/json",
            },
            body:JSON.stringify({
                accessToken:ref.user.accessToken,
                productId:item._id,
                quantity:1,
            }),
        });
    }

  return (
    <Container>
      <Circle/>
      <Image src={item.img}/>
      <Info>
        <Icon onClick={handleAddToCart}>
            <ShoppingCartOutlined/>
        </Icon>
        <Icon>
            <Link to={`/product/${item._id}`}>
            <SearchOutlined/>
            </Link>
        </Icon>
        <Icon>
            <FavoriteBorderOutlined/>
        </Icon>
      </Info>
    </Container>
  )
}

export default Product;
