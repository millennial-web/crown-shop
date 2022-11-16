import { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import { Elements } from '@stripe/react-stripe-js';
import { loadStripe } from "@stripe/stripe-js";

import { selectCartTotal } from "../../store/cart/cart.selector";

import CardPaymentForm from "../card-payment-form/card-payment-form.component"; 
import BillingShippingForm from "../billing-shipping-form/billing-shipping-form.component";

import { Button } from "../button/button.component";

const CheckoutSteps = () =>{
  const amount = useSelector(selectCartTotal);

  const [checkOutStep, setcheckOutStep] = useState('Billing Information');

  const [stripePromise, setStripePromise] = useState(null);
  const [clientSecret, setClientSecret] = useState(null);

  //load stripe
  useEffect(() => {
    setStripePromise( loadStripe( process.env.REACT_APP_STRIPE_PUBLISHABLE_KEY ) );
  }, []);

  //clientSecret changed
  useEffect(() => {
    console.log('clientSecret changed:', clientSecret)
  }, [clientSecret])

  //make the request to the backend to create paymentIntent instance
  useEffect(() => {
    fetch('/.netlify/functions/create-payment-intent', {
      method:'post',
      headers: {
        'Content-type':'application/json', 
      },
      body: JSON.stringify({
        amount
      })
    }).then( async (response) => {
      //get the clientSecret handshake token to use when we confirm payment later
      const body = await response.json();
      setClientSecret(body.paymentIntent.client_secret);
      console.log(body);
    });
  }, [amount]);

  const continueToPaymentHandler = () => {
    setcheckOutStep('Card Payment Details');
  }

  const options = {
    clientSecret,
    appearance: {
      theme: 'stripe',
      variables: {
        colorPrimary: '#089ddd',
        colorBackground: '#ffffff',
        colorText: '#2e2f38',
      },
    }
  };

  return (
    <div className="payment-form-container">
      <div className="form-wrapper"> 
        <h1 className="payment-form-header ">
          {checkOutStep}
        </h1>
        <div className="form-content">
          {checkOutStep === 'Billing Information' && (
            <>
              <BillingShippingForm/>
              <div className="btns-container">
                <Button 
                  isLoading={false} 
                  className="main"
                  onClick={continueToPaymentHandler}  
                >Continue to Payment</Button>
              </div>
            </> 
          )}

          {checkOutStep === 'Card Payment Details' && stripePromise && clientSecret && (
            <Elements stripe={stripePromise} options={{options}}>
              <CardPaymentForm/>
            </Elements>
          )}

        </div>
      </div>
    </div>
  )
}

export default CheckoutSteps;