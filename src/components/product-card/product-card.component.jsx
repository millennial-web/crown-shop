import { useDispatch, useSelector } from 'react-redux';
import { selectCartItems } from '../../store/cart/cart.selector';
import { addItemToCart } from '../../store/cart/cart.action';
import { useNavigate } from "react-router-dom";
import { getTitleURL } from '../../utils/misc/strings.utils';

import './product-card.styles.scss';

import { Button, BUTTON_TYPE_CLASSES} from '../button/button.component';

const ProductCard = ({category, product}) => {
  const navigate = useNavigate();
  const {id, name, price, imageUrl} = product;
  const dispatch = useDispatch();
  const cartItems = useSelector(selectCartItems);
  const addProductToCart = () => dispatch (addItemToCart(cartItems, product) );
  const goToProductDetail = () => navigate('/product/'+category+'/'+getTitleURL(name))
  return (
    <div className='product-card-container' key={id}>
      <img src={imageUrl} alt={`${name}`} onClick={goToProductDetail}/>
      <div className='footer'>
        <span className='name'>{name}</span>
        <span className='price'>{price}</span>
      </div>
      <Button buttonType={BUTTON_TYPE_CLASSES.google} className='nav-link' onClick={goToProductDetail}>View Details</Button>
      <Button buttonType={BUTTON_TYPE_CLASSES.inverted} onClick={addProductToCart}>Add to Cart</Button>
    </div>
  );
}

export default ProductCard