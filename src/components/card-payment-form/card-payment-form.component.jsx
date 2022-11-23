import { useState } from "react";
import { PaymentElement, useStripe, useElements } from "@stripe/react-stripe-js";
import { useSelector } from "react-redux";

import { 
  selectCartBillingInfo,
} from "../../store/cart/cart.selector";

import { Button } from "../button/button.component";

const CardPaymentForm = () =>{
  const stripe = useStripe();
  const elements = useElements();

  const [isProcessingPayment, setIsProcessingPayment] = useState(false);
  const [paymentErrorMessage, setPaymentErrorMessage] = useState(null);
  
  const cartBillingInfo = useSelector(selectCartBillingInfo);
  
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
        receipt_email: cartBillingInfo.email,
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

  return (
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
  )
}

export default CardPaymentForm;