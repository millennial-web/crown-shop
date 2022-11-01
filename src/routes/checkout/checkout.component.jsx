import { useSelector } from 'react-redux'
import { useNavigate } from "react-router-dom";

import { selectCartItems, selectCartTotal } from '../../store/cart/cart.selector';

import Footer from '../../components/footer/footer.component';
import CheckoutItem from '../../components/checkout-item/checkout-item.component';
import PaymentForm from '../../components/payment-form/payment-form.component';
import { Button} from '../../components/button/button.component';

import './checkout.styles.scss'

const Checkout = () => {
  const navigate = useNavigate();
  const cartItems = useSelector(selectCartItems);
  const cartTotal = useSelector(selectCartTotal);
  const goToHome = () => navigate('/')
  return (
    <>
        <div className='checkout-container'>
        {
          cartItems.length ? ( 
            <>
              <h1>Checkout</h1>
              { cartItems.map((cartItem) => (
                <CheckoutItem key={cartItem.id+Math.floor(Math.random() * 10000)} cartItem={cartItem}/>
              )) }
              <span className='total'>Total: ${cartTotal}</span>
              <PaymentForm/>
            </>
            ) : (
            <>
              <h1>
                Your cart is empty
              </h1>
              <Button className="main" onClick={goToHome}>
                Continue Shopping
              </Button>
            </>
          )
        }
      </div>
      <Footer/>
    </>
  );
};

export default Checkout;