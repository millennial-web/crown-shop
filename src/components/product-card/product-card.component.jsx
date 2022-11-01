import { useNavigate } from "react-router-dom";
import { getTitleURL } from '../../utils/misc/strings.utils';

import { Button} from '../button/button.component';

const ProductCard = ({category, product}) => {
  const navigate = useNavigate();
  const {id, name, price, imageUrl} = product;
  const goToProductDetail = () => navigate('/product/'+category+'/'+getTitleURL(name))
  return (
    <div className='product-card-container' key={id}>
      <img src={imageUrl} alt={`${name}`} onClick={goToProductDetail}/>
      <div className='footer'>
        <span className='name'>{name}</span>
        <span className='price'>{price}</span>
      </div>
      <Button className="main nav-link" onClick={goToProductDetail}>View Product</Button>
    </div>
  );
}

export default ProductCard