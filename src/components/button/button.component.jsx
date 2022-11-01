
import Spinner from '../spinner/spinner.component';

export const Button = ({children, buttonType, isLoading, className, ...otherProps }) =>{
  return (
    <button  className={className? className : 'default'} disabled={isLoading} {...otherProps}> 
      {isLoading? <Spinner/> : children} 
    </button>
  )
}

export default Button