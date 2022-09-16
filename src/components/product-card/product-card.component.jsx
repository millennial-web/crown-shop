import { useDispatch, useSelector } from 'react-redux';

import { selectCartItems } from '../../store/cart/cart.selector';
import { addItemToCart } from '../../store/cart/cart.action';


import {
  StProductCardContainer
} from './product-card.styles';

import { Button, BUTTON_TYPE_CLASSES} from '../button/button.component';

const ProductCard = ({product}) => {
  const {id, name, price, imageUrl} = product;
  const dispatch = useDispatch();
  const cartItems = useSelector(selectCartItems);


  const addProductToCart = () => dispatch (addItemToCart(cartItems, product) );
  
  return (
    <StProductCardContainer key={id}>
      <img src={imageUrl} alt={`${name}`}/>
      <div className='footer'>
        <span className='name'>{name}</span>
        <span className='price'>{price}</span>
      </div>
      <Button buttonType={BUTTON_TYPE_CLASSES.inverted} onClick={addProductToCart}>Add to Cart</Button>
    </StProductCardContainer>
  );
}

export default ProductCard