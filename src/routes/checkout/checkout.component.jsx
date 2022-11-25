import { useState } from "react";
import { useSelector } from 'react-redux'
import { useNavigate } from "react-router-dom"

import { 
  selectCartItems,
} from '../../store/cart/cart.selector';

import OrderDetails from '../../components/order-details/order-details.component';
import Footer from '../../components/footer/footer.component';
import CheckoutSteps from '../../components/checkout-steps/checkout-steps.component';
import { Button} from '../../components/button/button.component';

import './checkout.styles.scss'

const checkoutTitles = [
  "Billing Information", 
  "Payment Details"
]

const Checkout = () => {
  const navigate = useNavigate();
  const cartItems = useSelector(selectCartItems);

  const goToHome = () => navigate('/')

  const goToNextStep = () => {
    setcheckOutStep(checkOutStep + 1);
    window.scrollTo(0, 0);
  }

  const goToPrevStep = () => {
    setcheckOutStep(checkOutStep > 0 ? checkOutStep -1 : 0);
    window.scrollTo(0, 0);
  }
  
  const [checkOutStep, setcheckOutStep] = useState(0);

  return (
    <>
      {cartItems.length ? ( 
          <div className='checkout-container'>
            <CheckoutSteps checkOutStep={checkoutTitles[checkOutStep]}/>
            <OrderDetails 
              cartItems={cartItems} 
              clickContinueHandler={goToNextStep}
              clickBackHandler={goToPrevStep}
              checkOutStep={checkOutStep}
              totalSteps={checkoutTitles.length}
            />
          </div>
          ) : (
          <>
            <div className='checkout-container empty'>
              <h1>
                Your cart is empty
              </h1>
              <Button className="default" onClick={goToHome}>
                Continue Shopping
              </Button>
            </div>
          </>
        )
      }
      <Footer/>
    </>
  );
};

export default Checkout;