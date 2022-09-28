import { useState } from "react";
import { useSelector } from "react-redux";
import { CardElement, useStripe, useElements } from "@stripe/react-stripe-js";

import { selectCartTotal } from "../../store/cart/cart.selector";
import { selectCurrentUser } from "../../store/user/user.selector";

import { Button, BUTTON_TYPE_CLASSES } from "../button/button.component";

import "./payment-form.styles.scss";


const PaymentForm = () =>{
  const stripe = useStripe();
  const elements = useElements();
  const amount = useSelector(selectCartTotal);
  const currentUser = useSelector(selectCurrentUser);
  const [isProcessingPayment, setIsProcessingPayment] = useState(false);

  const paymentHandler = async (e) => {
    e.preventDefault();
    if(!stripe || !elements){
      return;
    }
    setIsProcessingPayment(true);

    const response = await fetch('/.netlify/functions/create-payment-intent', {
      method:'post',
      headers: {
        'Content-type':'application/json'
      },
      body: JSON.stringify({amount: amount * 100})
    }).then(res => res.json());
    
    const clientSecret = response.paymentIntent.client_secret;

    const paymentResult = await stripe.confirmCardPayment(clientSecret, {
      payment_method: {
        card: elements.getElement(CardElement), 
        billing_details: {
          name: currentUser ? currentUser.displayName : 'Guest',
        }
      }
    });

    setIsProcessingPayment(false);

    if(paymentResult.error){
      alert(paymentResult.error);
    }else{
      if(paymentResult.paymentIntent.status === 'succeeded'){
        alert('Payment Successful');
      }
    }

  }


  return (
    <div class="payment-form-container">
      <form onSubmit={paymentHandler}>
        <h2>Card Payment</h2>
        <CardElement></CardElement>
        <Button isLoading={isProcessingPayment} buttonType={BUTTON_TYPE_CLASSES.inv}>Pay Now</Button>
      </form>
    </div>
  )
}

export default PaymentForm;