const FormSelect = ({
  label, 
  description=null, 
  name, 
  optionsArr, 
  onChangeHandler, 
  selectedValue, 
  disabled=false,
  ...otherProps }) => {

  return (
    <div className="select-input-container">
      <select 
        onChange={onChangeHandler} 
        disabled={disabled} 
        className={disabled? 'is-disabled' : ''}
        name={name}
        {...otherProps} 
      >
        <option value=""></option>
        {optionsArr && optionsArr.length && 
          optionsArr.map(option => (
            <option 
              key={option.value+Math.floor(Math.random() * 10000)} 
              value={option.value}>{option.label}
            </option>
          )
        )}
      </select>

      <label className={`${selectedValue ? 'select-label shrink' : 'select-label'}`}>
        {label}
      </label>

      {description && (
        <small className='form-select-description'>
          {description}
        </small>
      )}
    </div>
  );
}

export default FormSelect;