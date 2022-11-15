import { useState } from "react";
import { useSelector } from "react-redux";
import { PaymentElement, useStripe, useElements } from "@stripe/react-stripe-js";

import { 
  selectCartTotal, 
  selectCartBillingInfo,
  // selectCartShippingInfo,
  // selectCartShippingSAB,
} from "../../store/cart/cart.selector";
// import { selectCurrentUser } from "../../store/user/user.selector";

// import FormSelect from '../../components/form-select/form-select.component';
// import FormInput from '../form-input/form-input.component';

import { Button } from "../button/button.component";
import { useEffect } from "react";

const CardPaymentForm = () =>{
  const stripe = useStripe();
  const elements = useElements();

  const [isProcessingPayment, setIsProcessingPayment] = useState(false);
  const [paymentErrorMessage, setPaymentErrorMessage] = useState(null);
  const [clientSecret, setclientSecret] = useState(null);
  
  const amount = useSelector(selectCartTotal);
  // const currentUser = useSelector(selectCurrentUser);
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

    const paymentResult = await stripe.confirmCardPayment(clientSecret, {
      payment_method: {
        elements, 
        billing_details: {
          name: cartBillingInfo ? cartBillingInfo.firstName+' '+cartBillingInfo.lastName : 'Guest',
        },
        confirmParams: {
          return_url: `${window.location.origin}/order-confirmation`,
        },
      }
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
      {paymentErrorMessage && 
        <div className="payment-error-message">
          {paymentErrorMessage}
        </div>
      }
      <div className="cc-form-container">
        
      </div>
      <div className="btns-container">
        <Button 
          isLoading={isProcessingPayment} 
          className="main"
          onClick={paymentHandler}
        >Pay Now</Button> 
      </div>
    </>
  )
}

export default CardPaymentForm;