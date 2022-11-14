

const FormInput = ({
  label, 
  description=null, 
  disabled=false,
  ...otherProps 
}) => {
  return (
    <div className='form-input-container'>
      <input 
        disabled={disabled} 
        className={disabled? 'is-disabled' : ''}
        {...otherProps}
      />
      {label && (
        <label className={`${otherProps.value.length ? 'shrink' : ''}`}>
          {label}
        </label>
      )}
      {description && (
        <small className='form-input-description'>
          {description}
        </small>
      )}
    </div>
    
  );
}

export default FormInput;