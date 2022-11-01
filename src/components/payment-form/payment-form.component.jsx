import { useState } from "react";
import { useSelector } from "react-redux";
import { CardElement, useStripe, useElements } from "@stripe/react-stripe-js";

import { selectCartTotal } from "../../store/cart/cart.selector";
import { selectCurrentUser } from "../../store/user/user.selector";

import { Button } from "../button/button.component";

const PaymentForm = () =>{
  const stripe = useStripe();
  const elements = useElements();
  const amount = useSelector(selectCartTotal);
  const currentUser = useSelector(selectCurrentUser);
  const [isProcessingPayment, setIsProcessingPayment] = useState(false);
  const [paymentErrorMessage, setPaymentErrorMessage] = useState(null);

  const paymentHandler = async (e) => {
    e.preventDefault();
    //clear any previous validation errors
    setPaymentErrorMessage(null);

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
      // console.log("Payment Error:", paymentResult.error);
      setPaymentErrorMessage(paymentResult.error.message);
    }else{
      if(paymentResult.paymentIntent.status === 'succeeded'){
        // console.log(paymentResult);
        alert('Payment Successful');
      }
    }

  }


  return (
    <div className="payment-form-container">
      <form onSubmit={paymentHandler}>
        <h2>Card Payment</h2>
        {paymentErrorMessage && 
          <div className="payment-error-message">
            {paymentErrorMessage}
          </div>
        }
        <CardElement></CardElement>
        <Button isLoading={isProcessingPayment} className="main">Pay Now</Button>
      </form>
    </div>
  )
}

export default PaymentForm;