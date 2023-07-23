import { useEffect,useState } from "react";
import { useStripe,useElements } from "@stripe/react-stripe-js";
import { PaymentElement } from "@stripe/react-stripe-js";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";
import { useSelector } from "react-redux";

const CheckoutForm = (props)=>{

    const stripe = useStripe();
    const elements = useElements();
    const navigate = useNavigate();
    
    const {isFetching, error,currentUser} = useSelector((state) => state.user);

    const [message,setMessage] = useState(null);
    const [isProcessing,setIsProcessing] = useState(null);

    const placeOrder = async (stripeID)=>{
        const accessToken = currentUser.accessToken;
        const response = await fetch("http://localhost:5000/api/orders/fromCart",{
            method:"POST",
            headers: {
                "Content-Type": "application/json",
            },
            body:JSON.stringify({
                accessToken,
                amount:props.amount,
                stripeID,
            }),
        });
        const body = await response.json();
        console.log(body);
    }

    const handleSubmit = async(e)=>{
        e.preventDefault();

        if(!stripe || !elements) return;

        setIsProcessing(true);

       stripe.confirmPayment({
            elements,
            redirect:"if_required"
            // confirmParams:{
            //     return_url:`${window.location.origin}/completion`,
            // },
        }).then((result)=>{
            if(result.error){
                setMessage(result.error.message);
            }else{
                setIsProcessing(false);
                placeOrder(result.paymentIntent.id);
                // navigate("/cart");
            }
        });


    }

    const style={
        width:"20em",
        heigt:"30em",
        
    }

    const divStyle={
        width:"100%",
        height:"100%",
        display:"flex",
        flexDirection:"column",
        alignItems:"center",
        justifyContent:"center",
    }

    const Button = styled.button`
    width: 40%;
    border: none;
    padding: 15px 20px;
    background-color: teal;
    color: white;
    cursor: pointer;
    margin-bottom: 10px;
`;



    return (
        <div style={divStyle}>
            <form id="payment-form" onSubmit={handleSubmit} style={style}>
                <PaymentElement/><br/><br/>
                <Button disabled={isProcessing} id="submit">
                    <span id="button-text">
                        {isProcessing ? "Processing ..." : "Pay now"}
                    </span>
                </Button>
            </form>
        </div>
    );
}

export default CheckoutForm;