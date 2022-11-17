import { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import { Elements } from '@stripe/react-stripe-js';
import { loadStripe } from "@stripe/stripe-js";

import { selectCartTotal } from "../../store/cart/cart.selector";

import BillingShippingForm from "../billing-shipping-form/billing-shipping-form.component";
import CardPaymentForm from "../card-payment-form/card-payment-form.component"; 
import OrderConfirmation from "../order-confirmation/order-confirmation.component";

import { Button } from "../button/button.component";

const CheckoutSteps = () =>{
  const amount = useSelector(selectCartTotal);

  const [checkOutStep, setcheckOutStep] = useState('Billing Information');

  const [stripePromise, setStripePromise] = useState(null);
  const [clientSecret, setClientSecret] = useState(null);

  //load stripe and get stripePromise object
  useEffect(() => {
    setStripePromise( loadStripe( process.env.REACT_APP_STRIPE_PUBLISHABLE_KEY ) );
  }, []);

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

  //check if user was redirected after payment and show order confirmation instead of card payment form
  useEffect(() => {
    const clientSecret = new URLSearchParams(window.location.search).get("payment_intent_client_secret");
    console.log('query param clientSecret: ', clientSecret);
    if (!clientSecret) {
      return;
    }
    setcheckOutStep('Order Confirmation');
  }, []);

  const continueToPaymentHandler = () => {
    setcheckOutStep('Payment Details');
  }

  const appearance = {
    theme: 'stripe',
    variables: {
      colorPrimary: '#089ddd',
      colorBackground: '#ffffff',
      colorText: '#2e2f38',
    },
  };
  const options = {
    clientSecret,
    appearance,
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

          {stripePromise && clientSecret && (
            <Elements stripe={stripePromise} options={{options}}>
              {checkOutStep === 'Payment Details' && (
                <CardPaymentForm/>
              )}
              {checkOutStep === 'Order Confirmation' && (
                <OrderConfirmation />
              )}
            </Elements>
          )}

          

        </div>
      </div>
    </div>
  )
}

export default CheckoutSteps;