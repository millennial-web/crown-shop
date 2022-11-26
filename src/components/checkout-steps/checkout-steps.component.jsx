import { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import { Elements } from '@stripe/react-stripe-js';
import { loadStripe } from "@stripe/stripe-js";
import { selectCartTotal } from "../../store/cart/cart.selector";
import BillingShippingForm from "../billing-shipping-form/billing-shipping-form.component";
import CardPaymentForm from "../card-payment-form/card-payment-form.component"; 
import OrderConfirmation from "../order-confirmation/order-confirmation.component";

const CheckoutSteps = ({checkOutStep}) =>{
  const amount = useSelector(selectCartTotal);
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
      // console.log(body);
    });
  }, [amount]);

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
              <BillingShippingForm/>
          )}
          {stripePromise && clientSecret && (
            <Elements stripe={stripePromise} options={options}>
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