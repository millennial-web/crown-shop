import { useState, useEffect } from "react";
import { PaymentElement, useStripe, useElements } from "@stripe/react-stripe-js";

import OrderConfirmation from '../order-confirmation/order-confirmation.component';

import { 
  // selectCartBillingInfo,
} from "../../store/cart/cart.selector";

import { Button } from "../button/button.component";

const CardPaymentForm = () =>{
  const stripe = useStripe();
  const elements = useElements();

  const [isProcessingPayment, setIsProcessingPayment] = useState(false);
  const [paymentErrorMessage, setPaymentErrorMessage] = useState(null);
  const [showOrderConfirm, setShowOrderConfirm] = useState(false);
  
  // const cartBillingInfo = useSelector(selectCartBillingInfo);
  
  const paymentHandler = async (e) => {
    e.preventDefault();
    
    //clear any previous validation errors
    setPaymentErrorMessage(null);
    //if stripe or elements has not yet loaded, return
    if(!stripe || !elements){
      return;
    }
    //start loader
    setIsProcessingPayment(true);

    const paymentResult = await stripe.confirmPayment({
      elements, 
      confirmParams: {
        return_url: `${window.location.origin}/checkout`,
      },
    });
    
    if(paymentResult.error){
      // console.log("Payment Error:", paymentResult.error);
      setPaymentErrorMessage(paymentResult.error.message);
    }else{
      if(paymentResult.paymentIntent.status === 'succeeded'){
        // console.log(paymentResult);
        alert('Payment Successful');
      }
    }

    setIsProcessingPayment(false);
  }

  //check if user was redirected after payment and show order confirmation instead of card payment form
  useEffect(() => {
    const clientSecret = new URLSearchParams(window.location.search).get("payment_intent_client_secret");
    if (!clientSecret) {
      return;
    }
    setShowOrderConfirm(true);
  }, []);

  return (
    <>
      
      
        { showOrderConfirm && 
          <OrderConfirmation />
        }

        { !showOrderConfirm && (
          <>
            <div className="cc-form-container">
              {paymentErrorMessage && (
                <div className="payment-error-message">
                  {paymentErrorMessage}
                </div>
              )}
              { stripe && elements && (
                <PaymentElement />
              )}
            </div>
            <div className="btns-container">
              <Button 
                isLoading={isProcessingPayment || !stripe || !elements} 
                className="main"
                onClick={paymentHandler}
              >Pay Now</Button> 
            </div>
          </>
        )}
    </>
  )
}

export default CardPaymentForm;