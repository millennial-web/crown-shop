import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useStripe } from "@stripe/react-stripe-js";

import Button from '../../components/button/button.component';

import './order-confirmation.styles.scss'

const OrderConfirmation = () => {
  const navigate = useNavigate()
  const stripe = useStripe()
  const goToHome = () => navigate('/')

  const [message, setMessage] = useState('');
  const [Instructions, setInstructions] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    setIsLoading(true);

    const clientSecret = new URLSearchParams(window.location.search).get(
      "payment_intent_client_secret"
    );

    if (!stripe || !clientSecret) {
      setIsLoading(false);
      return;
    }

    stripe.retrievePaymentIntent(clientSecret).then(({ paymentIntent }) => {
      // console.log('paymentIntent', paymentIntent);
      switch (paymentIntent.status) {
        case "succeeded":
          setMessage("Thank you for your payment!");
          setInstructions("You will receive an email receipt shortly.");
          break;
        case "processing":
          setMessage("Your payment is processing.");
          setInstructions("");
          break;
        case "requires_payment_method":
          setMessage("Your payment was not successful, please try again.");
          setInstructions("");
          break;
        default:
          setMessage("Something went wrong.");
          setInstructions("");
          break;
      }
    });
    
    setIsLoading(false);
  }, [stripe]);

  return (
    <>
      <div className='order-confirmation-container'>
        {!isLoading && (
          <>
            <h1>{message}</h1>
            <h2>{Instructions}</h2>
            <div className="order-confirmation-footer">
              <Button className='main' onClick={goToHome}>Home Page</Button>
            </div>
          </>
        )}
      </div>
    </>
  );
};

export default OrderConfirmation;