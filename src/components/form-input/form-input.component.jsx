import './form-input.styles.scss'

const FormInput = ({label, ...otherProps }) => {
  return (
    <div className='form-input-container'>
      <input {...otherProps}/>
      {label && (
          <label className={`${otherProps.value.length ? 'shrink' : ''}`}>
            {label}
          </label>
        )
      }
    </div>
    
  );
}

export default FormInput;