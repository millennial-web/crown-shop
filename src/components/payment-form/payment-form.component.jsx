import { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Elements } from '@stripe/react-stripe-js';
import { loadStripe } from "@stripe/stripe-js";

import { 
  selectCartBillingInfo,
  selectCartShippingInfo,
  selectCartShippingSAB,
} from "../../store/cart/cart.selector";

import { 
  setCartBillingInfo, 
  setCartShippingInfo,
  setCartShippingSAB
} from '../../store/cart/cart.action';

import CardPaymentForm from "./card-payment-form.component"; 


import FormSelect from '../../components/form-select/form-select.component';
import FormInput from '../form-input/form-input.component';
import { Button } from "../button/button.component";

import statesList from './states-list';

const countryOptions = [
  {value:'US', label:'United States'},
  {value:'CA', label:'Canada'}
]


const PaymentForm = () =>{
  const dispatch = useDispatch();
  // const navigate = useNavigate();
  const shippingSameAsBilling = useSelector(selectCartShippingSAB);
  const cartBillingInfo = useSelector(selectCartBillingInfo);
  const cartShippingInfo = useSelector(selectCartShippingInfo);

  const [billingStateOptions, setbillingStateOptions] = useState([]);
  const [shippingStateOptions, setshippingStateOptions] = useState([]);
  const [checkOutStep, setcheckOutStep] = useState('Billing Information');

  const [stripePromise, setStripePromise] = useState(null);
  const [clientSecret, setClientSecret] = useState(null);
  //load stripe
  useEffect(() => {
    setStripePromise( loadStripe( process.env.REACT_APP_STRIPE_PUBLISHABLE_KEY ) );
  }, []);

  //make the request to the backend to create paymentIntent instance
  useEffect(() => {
    fetch('/.netlify/functions/create-payment-intent', {
      method:'post',
      headers: {
        'Content-type':'application/json'
      },
      body: JSON.stringify({})
    }).then( async (response) => {
      //get the clientSecret handshake token to use when we confirm payment later
      const body = await response.json();
      setClientSecret(body.clientSecret);
    });
  }, []);

  // useEffect(() => {
  //   if(!cartBillingInfo || !cartShippingInfo){
  //     return false;
  //   }
  //   if(cartBillingInfo.country !==''){
  //     setbillingStateOptions(statesList[cartBillingInfo.country]);
  //   }
  //   if(cartShippingInfo.country !==''){
  //     setshippingStateOptions(statesList[cartShippingInfo.country]);
  //   }
  // },[cartBillingInfo]);

  

  const billingFieldsChangeHandler = (e) => {
    const {name, value} = e.target;
    updateCartBillingInfo(name, value);
  };

  const updateCartBillingInfo = (name,value) => dispatch( setCartBillingInfo({
    ...cartBillingInfo,
    [name]: value
  }) );

  const shippingFieldsChangeHandler = (e) => dispatch( setCartShippingInfo({
    ...cartShippingInfo,
    [e.target.name]: e.target.value
  }) );

  const shippingSABChangeHandler = (e) => {
    if(e.target.checked){
      //overwrite the cartShippingInfo with the current cartBillingInfo
      dispatch( setCartShippingInfo({
        ...cartBillingInfo,
      }) );
    }
    return dispatch( setCartShippingSAB(e.target.checked) );
  }

  const payWithCardHandler = () => {
    setcheckOutStep('Card Payment Details');
  }

  return (
    <div className="payment-form-container">
      <div className="form-wrapper"> 
        <h1 className="payment-form-header ">
          {checkOutStep}
        </h1>
        <div className="form-content">
          {checkOutStep === 'Billing Information' && (
            <>
              <div className="billing-info-fields">
                <div className="half-form-input-container">
                  <FormSelect 
                    label="Country" 
                    optionsArr={countryOptions} 
                    onChangeHandler={billingFieldsChangeHandler} 
                    selectedValue={cartBillingInfo.country}
                    name="country"
                    value={cartBillingInfo.country}
                  />
                </div>

                <div className="half-form-input-container">
                  <FormInput
                    label="Email"
                    type="email" 
                    required 
                    onChange={billingFieldsChangeHandler} 
                    name="email" 
                    value={cartBillingInfo.email}
                    description="*You will receive a copy of your invoice here"
                  />  
                </div>

                <div className="half-form-input-container">
                  <FormInput
                    label="First Name"
                    type="text" 
                    required 
                    onChange={billingFieldsChangeHandler} 
                    name="firstName" 
                    value={cartBillingInfo.firstName}
                  />
                </div>

                <div className="half-form-input-container">
                  <FormInput
                    label="Last Name(s)"
                    type="text" 
                    required 
                    onChange={billingFieldsChangeHandler} 
                    name="lastName" 
                    value={cartBillingInfo.lastName}
                  />
                </div>

                <div className="half-form-input-container">
                  <FormInput
                    label="Address"
                    type="text" 
                    required 
                    onChange={billingFieldsChangeHandler} 
                    name="address" 
                    value={cartBillingInfo.address}
                  />
                </div>
                
                <div className="half-form-input-container">
                  <FormInput
                    label="Address 2"
                    type="text"
                    onChange={billingFieldsChangeHandler} 
                    name="address2" 
                    value={cartBillingInfo.address2}
                  />
                </div>

                <div className="half-form-input-container">
                  <FormInput
                    label="City"
                    type="text"
                    onChange={billingFieldsChangeHandler} 
                    name="city" 
                    value={cartBillingInfo.city}
                  />
                </div>

                <div className="half-form-input-container">
                  <FormSelect 
                    label="State"
                    optionsArr={billingStateOptions} 
                    onChange={billingFieldsChangeHandler} 
                    selectedValue={cartBillingInfo.state}
                    name="state"
                    value={cartBillingInfo.state}
                  />
                </div>

                <div className="half-form-input-container">
                  <FormInput
                    label="Postal Code"
                    type="text"
                    onChange={billingFieldsChangeHandler} 
                    name="postalCode" 
                    value={cartBillingInfo.postalCode}
                  />
                </div>

                <div className="half-form-input-container">
                  <FormInput
                    label="Phone"
                    type="text"
                    onChange={billingFieldsChangeHandler} 
                    name="tel" 
                    value={cartBillingInfo.tel}
                  />
                </div> 

                <div className="form-checkbox">
                  <input 
                    type="checkbox" 
                    onChange={shippingSABChangeHandler} 
                    name="shippingSameAsBilling"
                    id="shippingSameAsBilling"
                    checked={shippingSameAsBilling}
                  />  
                  <label htmlFor="shippingSameAsBilling">Shipping is same as billing</label>
                </div>
              </div>

              {!shippingSameAsBilling && (
                <div className="shipping-info-form">
                  <h1 className="payment-form-header ">
                    Shipping Information
                  </h1>

                  <div className="half-form-input-container">
                    <FormSelect 
                      label="Country" 
                      optionsArr={countryOptions} 
                      onChangeHandler={shippingFieldsChangeHandler} 
                      selectedValue={cartShippingInfo.country}
                      name="country"
                      value={cartShippingInfo.country}
                    />
                  </div>

                  <div className="half-form-input-container">
                    <FormInput
                      label="Email"
                      type="email" 
                      required 
                      onChange={shippingFieldsChangeHandler} 
                      name="email" 
                      value={cartShippingInfo.email}
                      description="*You will receive a copy of your invoice here"
                    />  
                  </div>


                  <div className="half-form-input-container">
                    <FormInput
                      label="First Name"
                      type="text" 
                      required 
                      onChange={shippingFieldsChangeHandler} 
                      name="firstName" 
                      value={cartShippingInfo.firstName}
                    />
                  </div>

                  <div className="half-form-input-container">
                    <FormInput
                      label="Last Name(s)"
                      type="text" 
                      required 
                      onChange={shippingFieldsChangeHandler} 
                      name="lastName" 
                      value={cartShippingInfo.lastName}
                    />
                  </div>

                  <div className="half-form-input-container">
                    <FormInput
                      label="Address"
                      type="text" 
                      required 
                      onChange={shippingFieldsChangeHandler} 
                      name="address" 
                      value={cartShippingInfo.address}
                    />
                  </div>
                  
                  <div className="half-form-input-container">
                    <FormInput
                      label="Address 2"
                      type="text"
                      onChange={shippingFieldsChangeHandler} 
                      name="address2" 
                      value={cartShippingInfo.address2}
                    />
                  </div>

                  <div className="half-form-input-container">
                    <FormInput
                      label="City"
                      type="text"
                      onChange={shippingFieldsChangeHandler} 
                      name="city" 
                      value={cartShippingInfo.city}
                    />
                  </div>

                  <div className="half-form-input-container">
                    <FormSelect 
                      label="State"
                      optionsArr={shippingStateOptions} 
                      onChange={shippingFieldsChangeHandler} 
                      selectedValue={cartShippingInfo.state}
                      name="state"
                      value={cartShippingInfo.state}
                    />
                  </div>

                  <div className="half-form-input-container">
                    <FormInput
                      label="Postal Code"
                      type="text"
                      onChange={shippingFieldsChangeHandler} 
                      name="postalCode" 
                      value={cartShippingInfo.postalCode}
                    />
                  </div>

                  <div className="half-form-input-container">
                    <FormInput
                      label="Phone"
                      type="text"
                      onChange={shippingFieldsChangeHandler} 
                      name="tel" 
                      value={cartShippingInfo.tel}
                    />
                  </div> 
                </div>
              )}

              <div className="btns-container">
                {/* <Button 
                  isLoading={isValidating} 
                  className="inverted"
                  onClick={billingSubmitHandler}  
                >Amazon Pay</Button>
                <Button 
                  isLoading={isValidating} 
                  className="inverted"
                  onClick={billingSubmitHandler}  
                >PayPal</Button> */}

                <Button 
                  isLoading={false} 
                  className="main"
                  onClick={payWithCardHandler}  
                >Pay With Card</Button>
              </div>
            </> 
          )}

          {checkOutStep === 'Card Payment Details' && stripePromise && clientSecret && (
            <Elements stripe={stripePromise} options={{clientSecret}}>
              <CardPaymentForm/>
            </Elements>
          )}

        </div>
      </div>
    </div>
  )
}

export default PaymentForm;