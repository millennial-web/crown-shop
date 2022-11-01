import {useNavigate} from 'react-router-dom';

const CategoryItem = ({category}) => {
  const {imageUrl, title, route} = category;
  const navigate = useNavigate();
  const onNavigateHandler = () => navigate(route);
  
  return (
    <div className='directory-item-container' onClick={onNavigateHandler}>
      <div className='background-img' style={{
        backgroundImage : `url(${imageUrl})`
      }}></div>
      <div className='content'>
        <h2>{title}</h2>
        <p>Shop Now</p>
      </div>
    </div>
  )
}

export default CategoryItem