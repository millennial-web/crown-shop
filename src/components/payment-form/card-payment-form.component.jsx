import { useState } from "react";
import { useSelector } from "react-redux";
import { CardElement, useStripe, useElements } from "@stripe/react-stripe-js";

import { 
  selectCartTotal, 
  // selectCartBillingInfo,
  // selectCartShippingInfo,
  // selectCartShippingSAB,
} from "../../store/cart/cart.selector";
// import { selectCurrentUser } from "../../store/user/user.selector";

// import FormSelect from '../../components/form-select/form-select.component';
// import FormInput from '../form-input/form-input.component';

import { Button } from "../button/button.component";

const CardPaymentForm = () =>{
  const stripe = useStripe();
  const elements = useElements();

  const [isProcessingPayment, setIsProcessingPayment] = useState(false);
  const [paymentErrorMessage, setPaymentErrorMessage] = useState(null);
  
  const amount = useSelector(selectCartTotal);
  // const currentUser = useSelector(selectCurrentUser);

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

    //make the request to the backend to initiate the paymentInten API with the amount
    const response = await fetch('/.netlify/functions/create-payment-intent', {
      method:'post',
      headers: {
        'Content-type':'application/json'
      },
      body: JSON.stringify({
        amount: amount * 100
      })
    }).then(res => res.json());

    //get the clientSecret handshake token to use when we confirm payment later
    const clientSecret = response.paymentIntent.client_secret;
    console.log(response);

    // const paymentResult = await stripe.confirmCardPayment(clientSecret, {
    //   payment_method: {
    //     card: elements.getElement(CardElement), 
    //     billing_details: {
    //       name: currentUser ? currentUser.displayName : 'Guest',
    //     }
    //   }
    // });

    const result = await stripe.confirmPayment({
      //`Elements` instance that was used to create the Payment Element
      clientSecret,
      elements,
      confirmParams: {
        return_url: "https://localhost:3000/checkout/complete",
      },
    });

    setIsProcessingPayment(false);

    if (result.error) {
      // Show error to your customer (for example, payment details incomplete)
      console.log(result.error.message);
    } else {
      // Your customer will be redirected to your `return_url`. For some payment
      // methods like iDEAL, your customer will be redirected to an intermediate
      // site first to authorize the payment, then redirected to the `return_url`.
    }

    

    // if(paymentResult.error){
    //   // console.log("Payment Error:", paymentResult.error);
    //   setPaymentErrorMessage(paymentResult.error.message);
    // }else{
    //   if(paymentResult.paymentIntent.status === 'succeeded'){
    //     // console.log(paymentResult);
    //     alert('Payment Successful');
    //   }
    // }
  }

  // const cartBillingInfo = useSelector(selectCartBillingInfo);
  
  return (
    <>
      {paymentErrorMessage && 
        <div className="payment-error-message">
          {paymentErrorMessage}
        </div>
      }
      <div className="cc-form-container">
        <CardElement/>
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