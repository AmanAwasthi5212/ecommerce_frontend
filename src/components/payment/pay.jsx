import {useState,useEffect} from "react";
import { loadStripe } from "@stripe/stripe-js";
import { Elements } from "@stripe/react-stripe-js";
import { ElementsConsumer,PaymentElement } from "@stripe/react-stripe-js";

import CheckoutForm from "./checkoutForm";
import { useLocation } from "react-router-dom";
import styled from "styled-components";

const H1 = styled.h1`
    color: black;
    text-align: center;
    padding: 15px;
`;

const KEY = "pk_test_51NMXCrSFs3phF9GMPYtvPtCnIyemly102PN8ycahA0lXVUuBBS7wGCeLHtCZSqOvj1QLSbwXLT7uG9t0NLcUuyoj002Sc1w97b";

const Pay = () => {

    const [stripePromise,setStripePromise] = useState(null);
    const [clientSecret,setClientSecret] = useState("");

    const {state} = useLocation();
    const { price } = state; // Read values passed on state

    useEffect(()=>{
        setStripePromise(loadStripe(KEY));
        console.log(state);
    },[]);

    useEffect(()=>{
        fetch("http://localhost:5000/api/checkout/create-payment-intent",{
            method:"POST",
            headers: {
                "Content-Type": "application/json",
            },
            body:JSON.stringify({price:state.price, }),
        }).then(async(response)=>{
            const {clientSecret} = await response.json();
            console.log(clientSecret);
            setClientSecret(clientSecret)
        });
    },[]);

    return (
        <div>
            <H1>Enter Card Details</H1>

            {
                stripePromise && clientSecret &&
                (
                    <Elements stripe={stripePromise} options={{clientSecret}}>
                        <CheckoutForm amount={state.price}/>
                    </Elements>
                )
            }
        </div>
    );
};

export default Pay;