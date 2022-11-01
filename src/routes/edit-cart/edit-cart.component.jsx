import { useSelector } from 'react-redux'
import { useNavigate } from "react-router-dom";
import { selectCartItems, selectCartTotal } from '../../store/cart/cart.selector';

import Footer from '../../components/footer/footer.component';
import CheckoutItem from '../../components/checkout-item/checkout-item.component';
import { Button} from '../../components/button/button.component';

import './edit-cart.styles.scss'

const EditCart = () => {
  const navigate = useNavigate();
  const cartItems = useSelector(selectCartItems);
  const cartTotal = useSelector(selectCartTotal);
  const goToHome = () => navigate('/')
  return (
    <>
      <div className='edit-cart-container'>
        {
          cartItems.length ? ( 
            <>
              <h1>Edit Shopping Cart</h1>
              { cartItems.map((cartItem) => (
                <CheckoutItem key={cartItem.id+Math.floor(Math.random() * 10000)} cartItem={cartItem}/>
              )) }
              <span className='total'>Total: ${cartTotal}</span>
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

export default EditCart;