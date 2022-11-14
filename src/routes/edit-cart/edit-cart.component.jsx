import { useSelector } from 'react-redux'
import { useNavigate } from "react-router-dom";
import { selectCartItems, selectCartTotal } from '../../store/cart/cart.selector';

import Footer from '../../components/footer/footer.component';
import EditCartItem from '../../components/edit-cart-item/edit-cart-item.component';
import { Button} from '../../components/button/button.component';

import './edit-cart.styles.scss'

const EditCart = () => {
  const navigate = useNavigate()
  const cartItems = useSelector(selectCartItems)
  const cartTotal = useSelector(selectCartTotal)
  const goToHome = () => navigate('/')
  const goToCheckoutHandler = () => { navigate('/checkout'); }
  return (
    <>
      <div className='edit-cart-container'>
        { cartItems.length ? ( 
            <>
              <h1>Edit Shopping Cart</h1>
              { cartItems.map((cartItem) => (
                <EditCartItem key={cartItem.id+Math.floor(Math.random() * 10000)} cartItem={cartItem}/>
              )) }
              <span className='total'>Total: ${cartTotal}</span>
            </>
            ) : (
            <>
              <h1>
                Your cart is empty
              </h1>
            </>
          )
        }
        <div className="edit-cart-footer">
          <Button className={cartItems.length ? 'hide' : 'main'} onClick={goToHome}>Continue Shopping</Button>
          <Button className={cartItems.length ? 'main' : 'hide'} onClick={goToCheckoutHandler}>Checkout</Button>
        </div>
      </div>
      <Footer/>
    </>
  );
};

export default EditCart;